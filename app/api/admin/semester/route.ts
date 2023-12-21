import getSearchParam from "@/app/admin/helpers/searchParams";
import { semesterSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const courseId = getSearchParam(request, "courseId");
  const searchText = getSearchParam(request, "searchText");

  if (!courseId) {
    return NextResponse.json({
      error: "Please Send Course ID",
      status: false,
    });
  }

  try {
    let where = {};

    const semesters = await prisma.semester.findMany({
      where: {
        courseId: parseInt(courseId),
      },
      orderBy: {
        semNumber: "asc",
      },
    });
    return NextResponse.json({ data: semesters, status: true });
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

    const validation = semesterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const semester = await prisma.semester.findFirst({
      where: {
        semNumber: body.semNumber,
        courseId: body.courseId,
      },
    });

    if (semester) {
      return NextResponse.json({
        error: "Semester Already Exists",
        status: false,
      });
    }

    const newSemester = await prisma.semester.create({
      data: {
        semNumber: body.semNumber,
        courseId: body.courseId,
        duration: body.duration,
      },
    });

    return NextResponse.json({ data: newSemester, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Semester",
      status: false,
    });
  }
}
