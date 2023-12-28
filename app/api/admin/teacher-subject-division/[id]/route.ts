import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subjectTeacherMap =
      await prisma.divisionTeacherSubjectMapper.findMany({
        include: {
          subject: {
            include: {
              semester: true,
            },
          },
          teacher: {
            include: {
              user: true,
            },
          },
        },
        where: {
          divisionId: parseInt(params.id),
        },
      });
    return NextResponse.json({ data: subjectTeacherMap, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Subject",
      status: false,
    });
  }
}
