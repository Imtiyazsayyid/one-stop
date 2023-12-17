import { subjectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const semesterId = request.nextUrl.searchParams.get("semesterId");

  if (!semesterId) {
    return NextResponse.json({
      error: "Please Send Semester ID",
      status: false,
    });
  }

  try {
    const subjects = await prisma.subject.findMany({
      where: {
        semesterId: parseInt(semesterId),
      },
    });
    return NextResponse.json({ data: subjects, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Subjects",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = subjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const subject = await prisma.subject.findUnique({
      where: {
        code: body.code,
      },
    });

    if (subject) {
      return NextResponse.json({
        error: "Subject Code Already Exists.",
        status: false,
      });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name: body.name,
        abbr: body.abbr,
        code: body.code,
        semesterId: parseInt(body.semesterId),
      },
    });

    return NextResponse.json({ data: newSubject, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Subject",
      status: false,
    });
  }
}
