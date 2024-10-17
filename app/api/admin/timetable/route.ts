import getSearchParam from "@/app/admin/helpers/searchParams";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const divisionId = getSearchParam(request, "divisionId");

    if (!divisionId)
      return NextResponse.json({
        error: "Send Division ID",
        status: false,
      });

    const timeTable = await prisma.divisionSubjectTime.findMany({
      where: {
        divisionId: parseInt(divisionId),
      },
    });

    const sortedData = timeTable.sort((a, b) => {
      // Assuming 'from' and 'to' are strings in the format 'HH:mm'
      return a.from.localeCompare(b.from) || a.to.localeCompare(b.to);
    });

    const subjectsByTimeMap = new Map();

    // Iterate over the data and organize subjects by time
    sortedData.forEach((item) => {
      const key = `${item.from}-${item.to}`;

      if (!subjectsByTimeMap.has(key)) {
        subjectsByTimeMap.set(key, {
          id: subjectsByTimeMap.size + 1,
          timing: `${item.from}-${item.to}`,
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
        });
      }

      const dayOfWeek = item.dayOfWeek.toLowerCase();
      subjectsByTimeMap.get(key)[dayOfWeek] = item.subjectId;
    });

    // Convert the map values to an array
    const subjectsByTimeArray = Array.from(subjectsByTimeMap.values());

    return NextResponse.json({ status: true, data: subjectsByTimeArray });
  } catch (error) {
    return NextResponse.json({
      error: "Some Error has Occured",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const deletedAllOldEntries = await prisma.divisionSubjectTime.deleteMany({
      where: {
        divisionId: body.divisionId,
      },
    });

    let insertableArray: any[] = [];

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    for (let timeSlot of body.subjectsByTime) {
      let objArray = [];

      for (let day of daysOfWeek) {
        if (timeSlot[day]) {
          const [from, to] = timeSlot.timing.split("-");

          objArray.push({
            from,
            to,
            dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1), // Capitalize the day
            subjectId: parseInt(timeSlot[day]),
            divisionId: timeSlot.divisionId,
          });
        }
      }

      insertableArray = [...insertableArray, ...objArray];
    }

    console.log({ insertableArray });

    const newTimeTable = await prisma.divisionSubjectTime.createMany({
      data: insertableArray,
    });

    console.log({ newTimeTable });

    return NextResponse.json({ status: true, data: newTimeTable });
  } catch (error) {
    return NextResponse.json({
      error: "Some Error has Occured",
      status: false,
    });
  }
}
