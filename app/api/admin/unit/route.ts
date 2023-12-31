import getSearchParam from "@/app/admin/helpers/searchParams";
import { unitSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchText = getSearchParam(request, "searchText");
  const subjectId = getSearchParam(request, "subjectId");

  if (!subjectId) {
    return NextResponse.json({
      error: "Send Subject Id",
      status: false,
    });
  }

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

    const units = await prisma.unit.findMany({
      where: {
        subjectId: parseInt(subjectId),
        ...where,
      },
    });
    return NextResponse.json({ data: units, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Units",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = unitSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const newUnit = await prisma.unit.create({
      data: {
        name: body.name,
        number: body.number,
        subjectId: body.subjectId,
        description: body.description,
      },
    });

    const unitMaterials = body.unitMaterials;

    for (let unitMaterial of unitMaterials) {
      const newUnitMaterial = await prisma.unitMaterial.create({
        data: {
          unitId: newUnit.id,
          name: unitMaterial.name,
          type: unitMaterial.type,
          link: unitMaterial.link,
        },
      });
    }

    return NextResponse.json({ data: newUnit, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Unit",
      status: false,
    });
  }
}
