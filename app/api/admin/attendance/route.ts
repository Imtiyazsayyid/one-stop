import getSearchParam from "@/app/admin/helpers/searchParams";
import { semesterSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const divisionId = getSearchParam(request, "divisionId");
    const date = getSearchParam(request, "date");

    if (!date)
      return NextResponse.json({
        error: "Send Date",
        status: false,
      });

    const dateObject = moment(new Date(date));

    if (!dateObject) {
      return NextResponse.json({
        error: "Invalid Date",
        status: false,
      });
    }

    const startDate = dateObject.toISOString().split("T")[0] + "T00:00:00.000Z";
    const endDate = dateObject.toISOString().split("T")[0] + "T23:59:59.999Z";

    // const divisionId = 2;

    if (!divisionId) {
      return NextResponse.json({
        error: "Send Division Id",
        status: false,
      });
    }

    const students = await prisma.student.findMany({
      include: {
        user: true,
        attendance: {
          where: {
            dateAndTime: {
              gte: startDate,
              lte: endDate,
            },
          },
          orderBy: {
            dateAndTime: "asc",
          },
        },
      },
      where: {
        divisionId: parseInt(divisionId),
      },
    });

    return NextResponse.json({ data: students, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Attendance",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.rollNumber) return NextResponse.json({ error: "Please Send Roll Number", status: false });

    const rollNumber = body.rollNumber;

    const student = await prisma.student.findFirst({
      include: {
        division: true,
      },
      where: {
        rollNumber: rollNumber,
      },
    });

    if (!student) return NextResponse.json({ error: "Student Not Found.", status: false });

    // const checkAttendance = await prisma.attendance.findFirst({
    //   where: {
    //     studentId: student.id,
    //     dateAndTime: {
    //       gte: moment()
    //     }
    //   }
    // })

    var currentDayOfWeek = moment().format("dddd"); // e.g., "Monday", "Tuesday", etc.
    var currentTime = moment(); // e.g., "10:30 AM"

    const divisionSubjectTime = await prisma.divisionSubjectTime.findMany({
      where: {
        divisionId: student.divisionId,
        dayOfWeek: currentDayOfWeek as "Monday",
      },
    });

    const dst = divisionSubjectTime.find((item) => {
      var fromMoment = moment(item.from, "HH:mm");
      var toMoment = moment(item.to, "HH:mm");

      // Check if the current time is between "from" and "to" times
      if (currentTime.isBetween(fromMoment, toMoment)) {
        return item;
      }
    });

    if (!dst) return NextResponse.json({ error: "Could not find subject at said time", status: false });

    const attendance = await prisma.attendance.create({
      data: {
        studentId: student.id,
        subjectId: dst?.subjectId,
      },
    });

    return NextResponse.json({ data: attendance, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Batch",
      status: false,
    });
  }
}
