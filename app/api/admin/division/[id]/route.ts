import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const division = await prisma.division.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      data: division,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const newDivision = await prisma.division.update({
      data: {
        name: body.name,
        batchId: parseInt(body.batchId),
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      data: newDivision,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedDivision = await prisma.division.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      data: deletedDivision,
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
