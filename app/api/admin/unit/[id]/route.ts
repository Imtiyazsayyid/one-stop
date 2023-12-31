import { unitSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const unit = await prisma.unit.findUnique({
      include: {
        unitMaterial: true,
      },
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: unit, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Unit",
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

    const validation = unitSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const deletedUnitMaterial = await prisma.unitMaterial.deleteMany({
      where: {
        unitId: parseInt(params.id),
      },
    });

    const updatedUnit = await prisma.unit.update({
      data: {
        name: body.name,
        number: body.number,
        subjectId: body.subjectId,
        description: body.description,
      },
      where: {
        id: parseInt(params.id),
      },
    });

    const unitMaterials = body.unitMaterials;

    for (let unitMaterial of unitMaterials) {
      const newUnitMaterial = await prisma.unitMaterial.create({
        data: {
          unitId: updatedUnit.id,
          name: unitMaterial.name,
          type: unitMaterial.type,
          link: unitMaterial.link,
        },
      });
    }

    return NextResponse.json({ data: updatedUnit, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Unit",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUnitMaterial = await prisma.unitMaterial.deleteMany({
      where: {
        unitId: parseInt(params.id),
      },
    });

    const deletedUnit = await prisma.unit.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedUnit, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Unit",
      status: false,
    });
  }
}
