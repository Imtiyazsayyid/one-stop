import { teacherSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teacher = await prisma.teacher.findUnique({
      include: {
        user: true,
        role: true,
      },
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: teacher, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Course",
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

    if (!body.userId) {
      return NextResponse.json({
        error: "Send User ID",
        status: false,
      });
    }

    const validation = teacherSchema.safeParse(body);
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

    const updatedTeacher = await prisma.teacher.update({
      data: {
        roleId: body.roleId,
        qualification: body.qualification,
        experience: body.experience,
        about: body.about,
        awardsAndRecognition: body.awardsAndRecognition,
        guestSpeakerAndResourcePerson: body.guestSpeakerAndResourcePerson,
        participationInCWTP: body.participationInCWTP,
        researchPublications: body.researchPublications,
        certificationCourses: body.certificationCourses,
        booksOrChapter: body.booksOrChapter,
        professionalMemberships: body.professionalMemberships,
      },
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: updatedTeacher, status: true });
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
    const deletedCourse = await prisma.teacher.delete({
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
