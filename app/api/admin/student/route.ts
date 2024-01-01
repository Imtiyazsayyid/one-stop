import getSearchParam from "@/app/admin/helpers/searchParams";
import { DetailedDivision } from "@/app/admin/interfaces";
import { studentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchText = getSearchParam(request, "searchText");

  try {
    let where = {};

    if (searchText) {
      where = {
        ...where,
        user: {
          firstName: {
            contains: searchText,
          },
        },
      };
    }

    const students = await prisma.student.findMany({
      include: {
        user: true,
        division: true,
        batch: true,
        studentCertificates: true,
        studentDocuments: true,
      },
      where: {
        ...where,
      },
    });
    return NextResponse.json({ data: students, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Students",
      status: false,
    });
  }
}

const getRollNumber = async (division: DetailedDivision) => {
  const studentCount = division.students.length + 1;
  let numberString = studentCount.toString();
  let paddedNumberString = numberString.padStart(4, "0");

  let rollNumber = division.name + paddedNumberString;

  const existingStudent = await prisma.student.findFirst({
    where: {
      rollNumber,
    },
  });

  if (existingStudent) {
    const allStudents = await prisma.student.findMany({
      where: {
        divisionId: division.id,
      },
      orderBy: {
        rollNumber: "asc",
      },
    });

    let lastExistingRollNumber = allStudents[allStudents.length - 1].rollNumber;
    let numberPart: string | number = lastExistingRollNumber.substring(
      lastExistingRollNumber.length - 4
    );

    numberPart = parseInt(numberPart);
    numberPart = numberPart + 1;

    numberString = numberPart.toString();
    paddedNumberString = numberString.padStart(4, "0");

    rollNumber = division.name + paddedNumberString;
  }

  return rollNumber;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = studentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        gender: body.gender,
        userTypeId: body.userTypeId,
        profileImg: body.profileImg,
        address: body.address,
      },
    });

    if (!newUser) {
      return NextResponse.json({
        error: "Failed To Create User",
        status: false,
      });
    }

    const division = await prisma.division.findUnique({
      include: {
        students: true,
      },
      where: {
        id: parseInt(body.divisionId),
      },
    });

    if (!division) {
      return NextResponse.json({
        error: "Division Is Required For Student",
        status: false,
      });
    }

    const newStudent = await prisma.student.create({
      data: {
        rollNumber: await getRollNumber(division),
        userId: newUser.id,
        courseId: body.courseId,
        batchId: body.batchId,
        divisionId: body.divisionId,
      },
    });

    if (!newStudent) {
      return NextResponse.json({
        error: "Failed To Create Student",
        status: false,
      });
    }

    return NextResponse.json({ data: newStudent, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Student",
      status: false,
    });
  }
}
