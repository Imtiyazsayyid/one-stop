import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedAttendance = await prisma.attendance.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      data: deletedAttendance,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Some Error Has Occured",
      status: false,
    });
  }
}
