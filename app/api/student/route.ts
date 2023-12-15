import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isAdmin from "../helpers/authentication";
import { transporter, mailOptions } from "@/app/email/email";
import WelcomNewStudent from "@/app/email/templates/WelcomNewStudent";

export async function GET(request: NextRequest) {
  let where: any = {};

  const searchText = request.nextUrl.searchParams.get("searchText");
  const status = request.nextUrl.searchParams.get("status");
  const boardId = request.nextUrl.searchParams.get("boardId");
  const gradeId = request.nextUrl.searchParams.get("gradeId");
  const id = request.nextUrl.searchParams.get("id");

  if (searchText) {
    where = {
      name: {
        contains: searchText,
      },
    };
  }

  if (id) {
    where = {
      ...where,
      id: parseInt(id),
    };
  }

  if (status && status != "all") {
    where = {
      ...where,
      status: status === "active" ? true : false,
    };
  }

  if (boardId && boardId != "all") {
    where = {
      ...where,
      board: {
        id: parseInt(boardId),
      },
    };
  }

  if (gradeId && gradeId != "all") {
    where = {
      ...where,
      grade: {
        id: parseInt(gradeId),
      },
    };
  }

  const pageNumber = request.nextUrl.searchParams.get("pageNumber");
  const numberOfItems = request.nextUrl.searchParams.get("numberOfItems");
  let pagination = {};

  if (pageNumber && numberOfItems) {
    pagination = {
      skip: parseInt(pageNumber) * parseInt(numberOfItems),
      take: parseInt(numberOfItems),
    };
  }

  const student = await prisma.student.findMany({
    include: {
      board: true,
      grade: true,
      subjects: true,
      lectureGroups: {
        include: {
          lecture_group: {
            include: {
              teacher: true,
              subject: {
                include: {
                  board: true,
                  grade: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      ...where,
    },
    ...pagination,
  });

  const studentCount = await prisma.student.count({
    where: {
      ...where,
    },
  });

  return NextResponse.json({
    data: student,
    status: true,
    count: studentCount,
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const body = await request.json();

  const newStudent = await prisma.student.create({
    data: {
      name: body.studentName,
      email: body.studentEmail,
      password: body.studentPassword,
      board_id: parseInt(body.studentBoardId),
      grade_id: parseInt(body.studentGradeId),
    },
  });

  for (let lectureGroup of body.studentLectureGroups) {
    const newStudentLectureGroupMap =
      await prisma.studentLectureGroupMapper.create({
        include: {
          lecture_group: true,
        },
        data: {
          student_id: newStudent.id,
          lecture_group_id: parseInt(lectureGroup.value),
        },
      });

    const studentSubjects = await prisma.studentSubjectMapper.create({
      include: {
        subject: true,
      },
      data: {
        student_id: newStudent.id,
        subject_id: newStudentLectureGroupMap.lecture_group.subject_id,
      },
    });
  }

  const studentLectureGroups = await prisma.studentLectureGroupMapper.findMany({
    include: {
      lecture_group: {
        include: {
          subject: true,
        },
      },
    },
    where: {
      student_id: newStudent.id,
    },
  });

  if (newStudent) {
    await transporter.sendMail({
      ...mailOptions,
      to: newStudent.email,
      subject: "Welcome Aboard Achievers Academy",
      html: WelcomNewStudent(
        newStudent.name,
        newStudent.email,
        newStudent.password,
        studentLectureGroups.map((lectureGroup) => ({
          name: lectureGroup.lecture_group.name,
          subject: lectureGroup.lecture_group.subject.name,
        }))
      ),
    });
  }

  return NextResponse.json({ data: newStudent, status: true });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const body = await request.json();

  const deletedStudentSubjects = await prisma.studentSubjectMapper.deleteMany({
    where: {
      student_id: parseInt(body.id),
    },
  });

  const deletedStudentLectureGroups =
    await prisma.studentLectureGroupMapper.deleteMany({
      where: {
        student_id: parseInt(body.id),
      },
    });

  const updatedStudent = await prisma.student.update({
    data: {
      name: body.studentName,
      email: body.studentEmail,
      password: body.studentPassword,
      board_id: parseInt(body.studentBoardId),
      grade_id: parseInt(body.studentGradeId),
    },
    where: {
      id: parseInt(body.id),
    },
  });

  for (let lectureGroup of body.studentLectureGroups) {
    const newStudentLectureGroupMap =
      await prisma.studentLectureGroupMapper.create({
        include: {
          lecture_group: true,
        },
        data: {
          student_id: updatedStudent.id,
          lecture_group_id: parseInt(lectureGroup.value),
        },
      });

    await prisma.studentSubjectMapper.create({
      data: {
        student_id: updatedStudent.id,
        subject_id: newStudentLectureGroupMap.lecture_group.subject_id,
      },
    });
  }

  return NextResponse.json({ data: updatedStudent, status: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  const deletedQuizAttempts = await prisma.quizAttempts.deleteMany({
    where: {
      student_id: parseInt(id),
    },
  });

  const deletedCompleteTopics = await prisma.completedTopics.deleteMany({
    where: {
      student_id: parseInt(id),
    },
  });

  const deletedStudentSubjects = await prisma.studentSubjectMapper.deleteMany({
    where: {
      student_id: parseInt(id),
    },
  });

  const deletedStudentLectureGroups =
    await prisma.studentLectureGroupMapper.deleteMany({
      where: {
        student_id: parseInt(id),
      },
    });

  const deletedStudent = await prisma.student.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ data: deletedStudent, status: true });
}
