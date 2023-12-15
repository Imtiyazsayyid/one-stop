"use client";
import { Box, Flex, Heading, Separator, Tabs, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Seperator from "./Seperator";
import {
  Board,
  Grade,
  LectureGroup,
  Student,
  StudentLectureGroupMapper,
  Subject,
  Teacher,
} from "@prisma/client";
import axios from "axios";
import LectureGroupCard from "./LectureGroupCard";

type DetailedLectureGroupMapper = LectureGroup & {
  subject: Subject;
  teacher: Teacher;
};

type StudentLectureGroup = StudentLectureGroupMapper & {
  lecture_group: DetailedLectureGroupMapper;
};

type FullStudentDetails = Student & {
  board: Board;
  grade: Grade;
  lectureGroups: StudentLectureGroup[];
  subjects: Subject[];
};

const StudentHomePage = () => {
  const { status, data } = useSession();
  const [fullStudentDetails, setFullStudentDetails] =
    useState<FullStudentDetails>();

  const getLectureGroups = async () => {
    const res = await axios.get("/api/student", {
      params: {
        id: data?.user.id,
      },
    });

    console.log(res.data.data[0]);

    setFullStudentDetails(res.data.data[0]);
  };

  useEffect(() => {
    getLectureGroups();
  }, [data?.user]);

  return (
    <Flex className="h-screen" direction={"column"}>
      {/* Welcome Section */}
      <Flex
        direction={"column"}
        className="h-96"
        align={"center"}
        justify={"center"}
      >
        <Heading mb={"2"}>Hello {data?.user.name},</Heading>
        <Text className="text-xs text-slate-400">
          Nice to have you back. Get ready and start you lessons now!
        </Text>
      </Flex>

      {/* <Seperator className="mb-20" /> */}
      {/* Start Studying */}

      <Tabs.Root defaultValue="lecture-groups">
        <Tabs.List>
          <Tabs.Trigger value="lecture-groups">My Lecture Groups</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="lecture-groups">
            <Flex
              className="bg-slate-100 h-72 p-4 overflow-hidden overflow-x-scroll"
              gap={"2"}
            >
              {fullStudentDetails?.lectureGroups.map(({ lecture_group }) => {
                return (
                  <LectureGroupCard
                    lectureGroupId={lecture_group.id}
                    subjectId={lecture_group.subject_id}
                    lectureGroupName={lecture_group.name}
                    subjectImg={lecture_group.subject.img}
                    subjectName={lecture_group.subject.name}
                    lectureGroupTeacher={lecture_group.teacher.name}
                    key={lecture_group.id}
                  />
                );
              })}
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
};

export default StudentHomePage;
