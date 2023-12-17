import { courseSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: course, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Course",
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

    const validation = courseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const updatedCourse = await prisma.course.update({
      data: {
        name: body.name,
        abbr: body.abbr,
        duration: body.duration,
        description: body.description,
        course_outcome: body.course_outcome,
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: updatedCourse, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Course",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedCourse = await prisma.course.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedCourse, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Course",
      status: false,
    });
  }
}
