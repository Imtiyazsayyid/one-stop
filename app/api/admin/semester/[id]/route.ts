import { semesterSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const semester = await prisma.semester.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: semester, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Semester",
      status: false,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedSemester = await prisma.semester.update({
      data: {
        semNumber: body.semNumber,
        courseId: body.courseId,
        duration: body.duration,
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: updatedSemester, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Semester",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedSemester = await prisma.semester.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedSemester, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Semester",
      status: false,
    });
  }
}
