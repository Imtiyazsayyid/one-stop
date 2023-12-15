import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isAdmin from "../helpers/authentication";

export async function GET(request: NextRequest) {
  let where: any = {};

  const searchText = request.nextUrl.searchParams.get("searchText");
  const status = request.nextUrl.searchParams.get("status");
  const boardId = request.nextUrl.searchParams.get("boardId");
  const subjectId = request.nextUrl.searchParams.get("subjectId");
  const gradeId = request.nextUrl.searchParams.get("gradeId");
  // pagination

  const pageNumber = request.nextUrl.searchParams.get("pageNumber");
  const numberOfItems = request.nextUrl.searchParams.get("numberOfItems");
  let pagination = {};

  if (pageNumber && numberOfItems) {
    pagination = {
      skip: parseInt(pageNumber) * parseInt(numberOfItems),
      take: 7,
    };
  }

  if (searchText) {
    where = {
      name: {
        contains: searchText,
      },
    };
  }

  if (subjectId) {
    where = {
      ...where,
      id: parseInt(subjectId),
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

  const subjects = await prisma.subject.findMany({
    where,
    include: {
      board: true,
      grade: true,
    },
    ...pagination,
  });

  let subjectCount = await prisma.subject.count({
    where,
  });

  return NextResponse.json({
    data: subjects,
    status: true,
    count: subjectCount,
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const body = await request.json();

  if (!body.subjectName && !body.subjectShortForm) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  const newSubject = await prisma.subject.create({
    data: {
      name: body.subjectName,
      key: body.subjectShortForm,
      status: body.subjectStatus,
      img: body.subjectImage,
      grade_id: parseInt(body.gradeId),
      board_id: parseInt(body.boardId),
    },
  });

  return NextResponse.json({ data: newSubject, status: true });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const body = await request.json();

  if (
    !body.subjectName &&
    !body.subjectShortForm &&
    !body.subjectStatus &&
    !body.subjectId &&
    !body.subjectImage &&
    !body.gradeId &&
    !body.boardId
  ) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  const updatedSubject = await prisma.subject.update({
    data: {
      name: body.subjectName,
      key: body.subjectShortForm,
      status: body.subjectStatus,
      img: body.subjectImage,
      grade_id: parseInt(body.gradeId),
      board_id: parseInt(body.boardId),
    },
    where: {
      id: parseInt(body.subjectId),
    },
  });

  return NextResponse.json({ data: updatedSubject, status: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "You are not Admin", status: false });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Send All Details", status: false });
  }

  const deletedSubject = await prisma.subject.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ data: deletedSubject, status: true });
}
