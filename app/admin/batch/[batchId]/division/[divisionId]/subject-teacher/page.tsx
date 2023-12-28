"use client";
import HeadingCard from "@/app/admin/components/HeadingCard";
import {
  DetailedDivisionSubjectTeacher,
  DetailedSubject,
  DetailedTeacher,
} from "@/app/admin/interfaces";
import usePagination from "@/app/hooks/usePagination";
import { DivisionTeacherSubjectMapper } from "@prisma/client";
import { Card, Flex, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import Pagination from "@/app/admin/components/Pagination";
import toast from "react-hot-toast";

interface Props {
  params: {
    divisionId: string;
    batchId: string;
  };
}

const SubjectTeacherPage = ({ params }: Props) => {
  const [subjectTeachers, setSubjectTeachers] = useState<
    DetailedDivisionSubjectTeacher[]
  >([]);

  const [subjects, setSubjects] = useState<DetailedSubject[]>([]);
  const [teachers, setTeachers] = useState<DetailedTeacher[]>([]);

  const {
    currentPage,
    currentItems: currentSubjects,
    setCurrentPage,
    totalPages,
  } = usePagination(subjects, 10);

  const getSubjectTeacher = async () => {
    const res = await axios.get("/api/admin/teacher-subject-division", {
      params: {
        divisionId: params.divisionId,
      },
    });

    setSubjectTeachers(res.data.data);
  };

  const getAllSubjects = async () => {
    const batchRes = await axios.get("/api/admin/batch/" + params.batchId);
    const semesterIds = batchRes.data.data.semesters.map(
      (sem: any) => sem.semesterId
    );
    const subjectRes = await axios.get("/api/admin/subject-by-semesters", {
      params: {
        semesterIds: JSON.stringify(semesterIds),
      },
    });

    setSubjects(subjectRes.data.data);
  };

  const getTeacherForSubject = (subjectId: number) => {
    for (let subjectTeacher of subjectTeachers) {
      if (subjectId === subjectTeacher.subjectId)
        return subjectTeacher.teacherId;
    }
    return null;
  };

  const getAllTeachers = async () => {
    const res = await axios.get("/api/admin/teacher");
    setTeachers(res.data.data);
  };

  const saveSubjectTeacher = async (
    subjectId: number,
    teacherId: number | null
  ) => {
    const res = await axios.post("/api/admin/teacher-subject-division", {
      divisionId: parseInt(params.divisionId),
      subjectId,
      teacherId,
    });

    if (res.data.status) {
      toast.success(
        teacherId ? "Subject Teacher Saved." : "Teacher Removed From Subject"
      );
    } else {
      toast.error("Error Saving Subject Teacher.");
    }
  };

  useEffect(() => {
    getSubjectTeacher();
    getAllSubjects();
    getAllTeachers();
  }, []);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Division Name Subject Teachers" />
      <Card className="h-full">
        <Table.Root variant="surface" className="h-[92%]">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Subject</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Teacher</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {currentSubjects.map((subject, index) => (
              <Table.Row key={index} align={"center"}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{subject.name}</Table.Cell>
                <Table.Cell>
                  <Text className="text-xs text-slate-400">
                    Semester {subject.semester.semNumber}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <SelectPicker
                    size="md"
                    data={teachers.map((teacher) => ({
                      label:
                        teacher.user.firstName + " " + teacher.user.lastName,
                      value: teacher.id,
                    }))}
                    style={{ width: 224 }}
                    value={getTeacherForSubject(subject.id)}
                    onChange={async (val) => {
                      saveSubjectTeacher(subject.id, val);
                      await getSubjectTeacher();
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </Card>
    </Flex>
  );
};

export default SubjectTeacherPage;
