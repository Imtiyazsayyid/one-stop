import getSearchParam from "@/app/admin/helpers/searchParams";
import { teacherSchema } from "@/app/validationSchemas";
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

    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        role: true,
      },
      where: {
        ...where,
      },
    });
    return NextResponse.json({ data: teachers, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error In Getting Teachers",
      status: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = teacherSchema.safeParse(body);
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
      },
    });

    if (!newUser) {
      return NextResponse.json({
        error: "Failed To Create User",
        status: false,
      });
    }

    const newTeacher = await prisma.teacher.create({
      data: {
        userId: newUser.id,
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
    });

    if (!newTeacher) {
      return NextResponse.json({
        error: "Failed To Create Teacher",
        status: false,
      });
    }

    return NextResponse.json({ data: newTeacher, status: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error in Saving Teacher",
      status: false,
    });
  }
}
