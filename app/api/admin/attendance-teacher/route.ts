import prisma from "@/prisma/client";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fromTime = body.fromTime;
    const date = body.date;
    const studentId = parseInt(body.studentId);

    if (!studentId || !date || !studentId) return NextResponse.json({ error: "Send All Details", status: false });

    const student = await prisma.student.findUnique({
      include: {
        division: true,
      },
      where: {
        id: studentId,
      },
    });

    if (!student) return NextResponse.json({ error: "Student Not Found.", status: false });

    var currentDayOfWeek = moment(new Date(date)).format("dddd"); // e.g., "Monday", "Tuesday", etc.
    var currentTime = moment(fromTime, "HH:mm"); // e.g., "10:30 AM"

    const divisionSubjectTime = await prisma.divisionSubjectTime.findMany({
      where: {
        divisionId: student.divisionId,
        dayOfWeek: currentDayOfWeek as "Monday",
      },
    });

    const dst = divisionSubjectTime.find((item) => {
      let fromMoment = moment(item.from, "HH:mm");
      let toMoment = moment(item.to, "HH:mm");

      // Check if the current time is between "from" and "to" times
      if (currentTime.isBetween(fromMoment, toMoment, null, "[)")) {
        return item;
      }
    });

    if (!dst) return NextResponse.json({ error: "Could not find subject at said time", status: false });

    const attendance = await prisma.attendance.create({
      data: {
        studentId: student.id,
        subjectId: dst?.subjectId,
        dateAndTime: moment(new Date(date)).toISOString(),
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
