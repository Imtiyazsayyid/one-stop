// import { batchSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batch = await prisma.batch.findUnique({
      include: {
        course: true,
        semesters: true,
      },
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: batch, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Batch",
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

    const updatedBatch = await prisma.batch.update({
      data: {
        fromDate: moment(body.fromDate).toISOString(),
        toDate: moment(body.toDate).toISOString(),
        courseId: parseInt(body.courseId),
      },
      where: {
        id: parseInt(params.id),
      },
    });

    const deletedOldBatchSemesters =
      await prisma.batchSemesterMapper.deleteMany({
        where: {
          batchId: updatedBatch.id,
        },
      });

    const newBatchSemesters = await prisma.batchSemesterMapper.createMany({
      data: body.semesters.map((semester: number[]) => ({
        batchId: updatedBatch.id,
        semesterId: semester,
      })),
    });

    return NextResponse.json({ data: updatedBatch, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Batch",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedOldBatchSemesters =
      await prisma.batchSemesterMapper.deleteMany({
        where: {
          batchId: parseInt(params.id),
        },
      });

    const deletedBatch = await prisma.batch.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedBatch, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Batch",
      status: false,
    });
  }
}
