"use client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  lectureGroupId: number;
  subjectId: number;
  subjectImg: string;
  subjectName: string;
  lectureGroupName: string;
  lectureGroupTeacher: string;
}

const LectureGroupCard = ({
  subjectImg,
  subjectName,
  lectureGroupName,
  lectureGroupTeacher,
  lectureGroupId,
  subjectId,
}: Props) => {
  const router = useRouter();

  return (
    <Flex
      className="h-full border rounded-lg shadow-md bg-white min-w-[350px] overflow-hidden cursor-pointer"
      direction={"column"}
      onClick={() =>
        router.push(
          `/student/lecture-group/${lectureGroupId}/subject/${subjectId}/chapters`
        )
      }
    >
      <Flex className="w-full h-1/2">
        <img src={subjectImg} alt="" className="w-full h-full object-cover" />
      </Flex>
      <Flex
        className="p-4 h-1/2"
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"2"}
      >
        <Heading size={"2"}>
          {subjectName} ({lectureGroupName})
        </Heading>
        <Text className="text-xs text-slate-500">By {lectureGroupTeacher}</Text>
      </Flex>
    </Flex>
  );
};

export default LectureGroupCard;
