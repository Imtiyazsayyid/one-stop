"use client";

import { Attendance, Batch, Course, Division, DivisionSubjectTime, Student, Subject } from "@prisma/client";
import { Flex, Text, Select, Table, TextField, Heading, Badge, Checkbox, Button, Avatar } from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DetailedDivisionSubjectTime, DetailedStudent } from "../interfaces";
import toast from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const AttendancePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);

  const [filters, setFilters] = useState({
    courseId: null as number | null,
    batchId: null as number | null,
    divisionId: null as number | null,
    date: moment(),
  });

  const getAllCourses = async () => {
    try {
      const res = await axios.get("/api/admin/course");
      setCourses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBatches = async (courseId: number | string) => {
    try {
      const res = await axios.get("/api/admin/batch", {
        params: {
          courseId,
        },
      });
      setBatches(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDivisions = async (batchId: number | string) => {
    try {
      const res = await axios.get("/api/admin/division", {
        params: {
          batchId,
        },
      });
      setDivisions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filters.courseId) {
      getAllBatches(filters.courseId);
    }
  }, [filters.courseId]);

  useEffect(() => {
    if (filters.batchId) {
      getAllDivisions(filters.batchId);
    }
  }, [filters.batchId]);

  useEffect(() => {
    getAllCourses();
  }, []);

  // --------------------------- Attendace Logic ----------------------------------

  const [todaysSubjects, setTodaysSubjects] = useState<DetailedDivisionSubjectTime[]>([]);
  const [students, setStudents] = useState<DetailedStudent[]>([]);
  const getTodaysSubjects = async () => {
    const res = await axios.get("/api/admin/division-subject-time", {
      params: {
        date: filters.date,
        divisionId: filters.divisionId,
      },
    });

    setTodaysSubjects(res.data.data);
  };

  const getStudentsWithAttendance = async () => {
    const res = await axios.get("/api/admin/attendance", {
      params: {
        date: filters.date,
        divisionId: filters.divisionId,
      },
    });
    setStudents(res.data.data);
  };

  const addEmptyValuesToAttendance = (attendance: any) => {
    const attendanceWithNull = [];
    let isFound = false;
    for (let subject of todaysSubjects) {
      for (let att of attendance) {
        if (att.subjectId === subject.subjectId) {
          attendanceWithNull.push(att);
          isFound = true;
          break;
        }
      }

      if (!isFound) {
        attendanceWithNull.push(null);
      }
      isFound = false;
    }

    return attendanceWithNull;
  };

  useEffect(() => {
    setTodaysSubjects([]);
    setStudents([]);
    if (filters.divisionId) {
      getTodaysSubjects();
      getStudentsWithAttendance();

      // Call getStudentsWithAttendance every 5 seconds
      const intervalId = setInterval(() => {
        getStudentsWithAttendance();
      }, 500);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [filters]);

  const markAttendance = async (studentId: number, fromTime: string) => {
    const res = await axios.post("/api/admin/attendance-teacher", { studentId, fromTime, date: filters.date });
    if (!res.data.status) {
      toast.error("Failed To Mark Attendance.");
      return;
    }
    toast.success("Marked Attendance.");
    getStudentsWithAttendance();
  };

  const removeAttendance = async (id: number) => {
    const res = await axios.delete("/api/admin/attendance-teacher/" + id);
    if (!res.data.status) {
      toast.error("Failed To Remove Attendance.");
    }
    toast.success("Removed Attendance.");
    getStudentsWithAttendance();
  };

  return (
    <Flex className="h-full w-full" direction={"column"} gap={"2"}>
      {/* <Flex className="h-20 bg-white rounded-lg border w-full">{filters.date.toLocaleString()}</Flex> */}
      <Flex className="h-full bg-white rounded-lg border w-full p-5" direction={"column"} gap={"2"}>
        <Flex className="h-fit w-full rounded-xl shadow-md p-5 border">
          <Flex className="w-full" gap={"4"} align={"end"}>
            {/* course */}
            <Flex className="w-1/4" gap={"2"} align={"end"}>
              <Flex direction={"column"} className="w-full" gap={"1"}>
                <Text className="text-xs text-slate-400">Course</Text>
                <Select.Root
                  value={filters.courseId?.toString() || undefined}
                  onValueChange={(val) =>
                    setFilters({
                      ...filters,
                      courseId: parseInt(val),
                    })
                  }
                >
                  <Select.Trigger />
                  <Select.Content position="popper">
                    {courses.map((course) => (
                      <Select.Item value={course.id.toString()} key={course.id}>
                        {course.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>

            {/* Batch */}
            <Flex className="w-1/4" gap={"2"} align={"end"}>
              <Flex direction={"column"} className="w-full" gap={"1"}>
                <Text className="text-xs text-slate-400">Batch</Text>

                <Text className="text-xs text-[var(--violet-11)]">Select Course To Choose Batch</Text>
                <Select.Root
                  disabled={!filters.courseId}
                  value={filters.batchId?.toString() || undefined}
                  onValueChange={(val) =>
                    setFilters({
                      ...filters,
                      batchId: parseInt(val),
                    })
                  }
                >
                  <Select.Trigger />
                  <Select.Content position="popper">
                    {batches.map((batch) => (
                      <Select.Item value={batch.id.toString()} key={batch.id}>
                        {moment(batch.fromDate).format("MMM YYYY")} - {moment(batch.toDate).format("YY")}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>

            {/* Division */}
            <Flex direction={"column"} className="w-1/4" gap={"1"}>
              <Flex direction={"column"} className="w-full" gap={"1"}>
                <Text className="text-xs text-slate-400">Division</Text>
                {!filters.batchId && (
                  <Text className="text-xs text-[var(--violet-11)]">Select Batch To Choose Division</Text>
                )}
                <Select.Root
                  disabled={!filters.batchId}
                  value={filters.divisionId?.toString() || undefined}
                  onValueChange={(val) => {
                    setFilters({
                      ...filters,
                      divisionId: parseInt(val),
                    });
                  }}
                >
                  <Select.Trigger />
                  <Select.Content position="popper">
                    {divisions.map((division) => (
                      <Select.Item value={division.id.toString()} key={division.id}>
                        Division {division.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>

            <Flex className="w-1/4">
              <TextField.Root className="w-full pr-2">
                <TextField.Input
                  placeholder="Search the docs…"
                  type="date"
                  className="w-full"
                  value={filters.date.format("YYYY-MM-DD")}
                  max={moment().add(2, "days").toISOString().split("T")[0]}
                  onChange={(e) => {
                    if (e.target.value && moment(e.target.value)) {
                      setFilters({ ...filters, date: moment(e.target.value) });
                    }
                  }}
                />
              </TextField.Root>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="border p-5 rounded-lg shadow-lg" justify={"between"} align={"center"}>
          <Button
            variant="soft"
            onClick={() => {
              setFilters({ ...filters, date: filters.date.subtract(1, "day") });
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Flex direction={"column"} align={"center"}>
            <Heading>{filters.date && moment(filters.date).format("dddd")}</Heading>
            <Text className="text-xs text-slate-500">
              {filters.date && moment(filters.date).format("DD MMM, YYYY")}
            </Text>
          </Flex>
          <Button
            variant="soft"
            onClick={() => {
              if (filters.date.isBefore(moment())) {
                setFilters({ ...filters, date: filters.date.add(1, "day") });
              }
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
        {todaysSubjects.length > 0 && (
          <Flex className="h-full border rounded-xl">
            <Table.Root variant="surface" className="w-full">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className="w-40">Roll Number</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="w-20"></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="w-72">Name</Table.ColumnHeaderCell>
                  {todaysSubjects?.map((sub) => (
                    <Table.ColumnHeaderCell key={sub.id}>{sub.subject.abbr}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {students?.map((student, index) => (
                  <Table.Row key={student.id} align={"center"}>
                    <Table.Cell>{student.rollNumber}</Table.Cell>
                    <Table.RowHeaderCell>
                      <Avatar size={"3"} fallback={"?"} src={student.user.profileImg || ""} />
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {student.user.firstName} {student.user.lastName}
                    </Table.Cell>
                    {addEmptyValuesToAttendance(student.attendance).map((att, index) => (
                      <Table.Cell key={index}>
                        <Flex gap={"2"} align="center">
                          <Checkbox
                            defaultChecked={att ? true : false}
                            checked={att ? true : false}
                            onCheckedChange={(val) => {
                              if (val) {
                                markAttendance(student.id, todaysSubjects[index].from);
                              } else {
                                att && removeAttendance(att.id);
                              }
                            }}
                          />
                          <Badge color={att ? "grass" : "red"}>{att ? "P" : "A"}</Badge>
                        </Flex>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default AttendancePage;
