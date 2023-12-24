import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const semesterIds = getSearchParam(request, "semesterIds");

  if (!semesterIds) {
    return NextResponse.json({ error: "Send Semester Ids", status: false });
  }

  const semesterIdsArray = JSON.parse(semesterIds);

  try {
    let where = {};

    const subjects = await prisma.subject.findMany({
      include: {
        semester: true,
      },
      where: {
        semesterId: {
          in: semesterIdsArray,
        },
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
