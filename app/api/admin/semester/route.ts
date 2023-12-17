import { semesterSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const semesters = await prisma.semester.findMany();
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
