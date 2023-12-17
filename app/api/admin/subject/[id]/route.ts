import { subjectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subject = await prisma.subject.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: subject, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Subject",
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

    const validation = subjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const updatedSubject = await prisma.subject.update({
      data: {
        name: body.name,
        abbr: body.abbr,
        code: body.code,
        credits: body.credits,
        subjectType: body.subjectType,
        semesterId: parseInt(body.semesterId),
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: updatedSubject, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Subject",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedSubject = await prisma.subject.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedSubject, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Subject",
      status: false,
    });
  }
}
