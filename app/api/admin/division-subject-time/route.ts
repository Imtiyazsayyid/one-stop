import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const date = getSearchParam(request, "date");
    const divisionId = getSearchParam(request, "divisionId");

    if (!date || !divisionId) {
      return NextResponse.json({
        error: "Send all details.",
        status: false,
      });
    }

    const dateObject = moment(new Date(date));

    let dayOfWeek = moment(dateObject).format("dddd");

    if (!dayOfWeek)
      return NextResponse.json({
        error: "Invalid Date.",
        status: false,
      });

    const subjectsByDay = await prisma.divisionSubjectTime.findMany({
      include: {
        subject: true,
      },
      where: {
        dayOfWeek: dayOfWeek as "Monday", // sort type script issue
        divisionId: parseInt(divisionId),
      },
    });

    return NextResponse.json({
      data: subjectsByDay,
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
