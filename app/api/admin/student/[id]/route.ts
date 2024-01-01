import { DetailedDivision } from "@/app/admin/interfaces";
import { studentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await prisma.student.findUnique({
      include: {
        user: true,
        course: true,
        division: true,
        batch: true,
        studentCertificates: true,
        studentDocuments: true,
      },
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: student, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Course",
      status: false,
    });
  }
}

const getRollNumber = async (
  division: DetailedDivision,
  oldStudentDetails: Student,
  newStudentDetails: any
) => {
  if (
    oldStudentDetails.courseId === newStudentDetails.courseId &&
    oldStudentDetails.batchId === newStudentDetails.batchId &&
    oldStudentDetails.divisionId === newStudentDetails.divisionId
  ) {
    return oldStudentDetails.rollNumber;
  }

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json({
        error: "Send User ID",
        status: false,
      });
    }

    const validation = studentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid Details",
        status: false,
      });
    }

    const updatedUser = await prisma.user.update({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        gender: body.gender,
        userTypeId: body.userTypeId,
        profileImg: body.profileImg,
      },
      where: {
        id: parseInt(body.userId),
      },
    });

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

    const oldStudentDetails = await prisma.student.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!oldStudentDetails) {
      return NextResponse.json({
        error: "No Such Student Exists",
        status: false,
      });
    }

    const updatedStudent = await prisma.student.update({
      data: {
        rollNumber: await getRollNumber(division, oldStudentDetails, body),
        courseId: body.courseId,
        batchId: body.batchId,
        divisionId: body.divisionId,
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: updatedStudent, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Course",
      status: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedCourse = await prisma.student.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: deletedCourse, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Deleting Course",
      status: false,
    });
  }
}
