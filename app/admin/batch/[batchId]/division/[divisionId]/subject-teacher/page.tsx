"use client";
import HeadingCard from "@/app/admin/components/HeadingCard";
import {
  DetailedDivisionSubjectTeacher,
  DetailedSubject,
  DetailedTeacher,
} from "@/app/admin/interfaces";
import usePagination from "@/app/hooks/usePagination";
import {
  Division,
  DivisionTeacherSubjectMapper,
  Semester,
} from "@prisma/client";
import { Button, Card, Flex, Select, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import Pagination from "@/app/admin/components/Pagination";
import toast from "react-hot-toast";
import SearchBar from "@/app/components/SearchBar";
import ClearFiltersButton from "@/app/admin/components/ClearFiltersButton";
import Loader from "@/app/components/Loader";

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

  const [isLoading, setLoading] = useState(false);
  const [division, setDivision] = useState<Division>();
  const [subjects, setSubjects] = useState<DetailedSubject[]>([]);
  const [teachers, setTeachers] = useState<DetailedTeacher[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    semesterId: "",
  });

  const resetFilters = () => {
    setFilters({
      semesterId: "",
    });
  };
  const {
    currentPage,
    currentItems: currentSubjects,
    setCurrentPage,
    totalPages,
  } = usePagination(subjects, 10);

  const getSubjectTeacher = async () => {
    setLoading(true);
    const res = await axios.get("/api/admin/teacher-subject-division", {
      params: {
        divisionId: params.divisionId,
      },
    });

    setLoading(false);
    setSubjectTeachers(res.data.data);
  };

  const getDivision = async () => {
    const res = await axios.get("/api/admin/division/" + params.divisionId);
    setDivision(res.data.data);
  };

  const getAllSubjectsAndSemesters = async () => {
    const batchRes = await axios.get("/api/admin/batch/" + params.batchId);
    const semesterIds = batchRes.data.data.semesters.map(
      (sem: any) => sem.semesterId
    );
    const subjectRes = await axios.get("/api/admin/subject-by-semesters", {
      params: {
        semesterIds: JSON.stringify(semesterIds),
        searchText,
        ...filters,
      },
    });

    const semesterRes = await axios.get("/api/admin/semester", {
      params: {
        courseId: batchRes.data.data.courseId,
      },
    });

    setSemesters(semesterRes.data.data);
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
    getAllSubjectsAndSemesters();
    getAllTeachers();
    getDivision();
  }, [searchText, filters]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard
        title={`Division ${division?.name + " - " || ""} Subject Teachers`}
      />
      <Card className="h-full">
        <Flex
          direction={"column"}
          justify={"between"}
          className="w-full h-full"
          gap={"2"}
        >
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Subject"
            />
            <Flex gap={"2"}>
              <Select.Root
                value={filters.semesterId?.toString()}
                onValueChange={(val) =>
                  setFilters({ ...filters, semesterId: val })
                }
              >
                <Select.Trigger
                  variant="soft"
                  className="w-48"
                  placeholder="Pick Semester"
                />
                <Select.Content position="popper">
                  {semesters.map((sem) => (
                    <Select.Item value={sem.id.toString()} key={sem.id}>
                      Semester {sem.semNumber}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <ClearFiltersButton
                filters={filters}
                resetFilters={resetFilters}
              />
            </Flex>
          </Flex>
          <Loader isLoading={isLoading} />
          {!isLoading && (
            <>
              <Table.Root variant="surface" className="h-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="w-1/2">
                      Subject
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="w-1/4"></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="w-1/4">
                      Teacher
                    </Table.ColumnHeaderCell>
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
                              teacher.user.firstName +
                              " " +
                              teacher.user.lastName,
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
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SubjectTeacherPage;
