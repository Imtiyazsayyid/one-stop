import { courseSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json({ data: courses, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Courses",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = courseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const newCourse = await prisma.course.create({
      data: {
        name: body.name,
        abbr: body.abbr,
        duration: body.duration,
        description: body.description,
        course_outcome: body.course_outcome,
      },
    });

    return NextResponse.json({ data: newCourse, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Course",
      status: false,
    });
  }
}
