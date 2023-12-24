import getSearchParam from "@/app/admin/helpers/searchParams";
import { semesterSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let where = {};

    const bacthes = await prisma.batch.findMany({
      include: {
        course: true,
      },
      orderBy: {
        fromDate: "asc",
      },
    });
    return NextResponse.json({ data: bacthes, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Semesters",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newBatch = await prisma.batch.create({
      data: {
        fromDate: moment(
          body.fromDate,
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
        ).toISOString(),
        toDate: moment(
          body.toDate,
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
        ).toISOString(),
        courseId: parseInt(body.courseId),
      },
    });

    const newBatchSemesters = await prisma.batchSemesterMapper.createMany({
      data: body.semesters.map((semester: number[]) => ({
        batchId: newBatch.id,
        semesterId: semester,
      })),
    });

    const newBatchSubjectTeacherMap =
      await prisma.batchTeacherSubjectMapper.createMany({
        data: body.subjectTeacherMap.map(
          (subjectTeacher: { subjectId: number; teacherId: number }) => ({
            ...subjectTeacher,
            batchId: newBatch.id,
          })
        ),
      });
    return NextResponse.json({ data: newBatch, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Batch",
      status: false,
    });
  }
}
