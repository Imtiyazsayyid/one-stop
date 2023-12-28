import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const batchId = getSearchParam(request, "batchId");

    if (!batchId) {
      return NextResponse.json({
        error: "Send Batch ID",
        status: false,
      });
    }

    const divisions = await prisma.division.findMany({
      where: {
        batchId: parseInt(batchId),
      },
    });

    return NextResponse.json({
      data: divisions,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newDivision = await prisma.division.create({
      data: {
        name: body.name,
        batchId: parseInt(body.batchId),
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
