import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const batchId = getSearchParam(request, "batchId");
  const subjectId = getSearchParam(request, "subjectId");

  if (!batchId) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  try {
    let where = {};

    const teachers = await prisma.batchTeacherSubjectMapper.findMany({
      where: {
        batchId: parseInt(batchId),
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
