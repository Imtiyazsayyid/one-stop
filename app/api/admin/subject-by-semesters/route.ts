import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const semesterIds = getSearchParam(request, "semesterIds");
  const searchText = getSearchParam(request, "searchText");
  const semesterId = getSearchParam(request, "semesterId");

  if (!semesterIds) {
    return NextResponse.json({ error: "Send Semester Ids", status: false });
  }

  const semesterIdsArray = JSON.parse(semesterIds);

  try {
    let where = {};

    if (searchText) {
      where = {
        ...where,
        name: {
          contains: searchText,
        },
      };
    }

    if (semesterId) {
      where = {
        ...where,
        semesterId: parseInt(semesterId),
      };
    }

    let subjects = await prisma.subject.findMany({
      include: {
        semester: true,
        divisionTeacherMap: true,
      },
      where: {
        semesterId: {
          in: semesterIdsArray,
        },
        ...where,
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
