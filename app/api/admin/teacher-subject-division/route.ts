import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const divisionId = getSearchParam(request, "divisionId");

  if (!divisionId) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  try {
    let where = {};

    const teachers = await prisma.divisionTeacherSubjectMapper.findMany({
      include: {
        subject: {
          include: {
            semester: true,
          },
        },
        teacher: {
          include: {
            user: true,
          },
        },
      },
      where: {
        divisionId: parseInt(divisionId),
      },
    });
    return NextResponse.json({ data: teachers, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Subjects",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    let where = {};

    const body = await request.json();

    const existingDivisionSubjectTeacher =
      await prisma.divisionTeacherSubjectMapper.findFirst({
        where: {
          divisionId: parseInt(body.divisionId),
          subjectId: parseInt(body.subjectId),
        },
      });

    if (existingDivisionSubjectTeacher) {
      await prisma.divisionTeacherSubjectMapper.updateMany({
        data: {
          teacherId: parseInt(body.teacherId),
        },
        where: {
          divisionId: parseInt(body.divisionId),
          subjectId: parseInt(body.subjectId),
        },
      });
    } else {
      await prisma.divisionTeacherSubjectMapper.create({
        data: {
          divisionId: parseInt(body.divisionId),
          teacherId: parseInt(body.teacherId),
          subjectId: parseInt(body.subjectId),
        },
      });
    }

    return NextResponse.json({ data: "Success", status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Subjects",
      status: false,
    });
  }
}
