"use client";
import { DetailedSemester } from "@/app/admin/interfaces";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  semester: DetailedSemester;
}

const SemesterContainer = ({ semester }: Props) => {
  const [isActive, setActive] = useState(false);
  const router = useRouter();

  return (
    <Flex className="bg-white rounded-lg shadow-sm w-full" direction={"column"}>
      <Flex justify={"between"} className="w-full p-4" align={"center"}>
        <Heading size={"2"}>Semester {semester.semNumber}</Heading>
        <Button
          variant="soft"
          radius="full"
          onClick={() => setActive(!isActive)}
        >
          <CaretDownIcon />
        </Button>
      </Flex>
      {isActive && (
        <Flex className="h-48 rounded-lg p-2" direction={"column"}>
          <Flex
            className="border h-full overflow-hidden overflow-x-scroll p-2 pb-4 bg-slate-50 rounded-lg"
            gap={"2"}
          >
            {semester.subjects.map((subject) => (
              <Flex
                className="min-w-[300px] border rounded-lg bg-white shadow-sm cursor-pointer"
                justify={"center"}
                align={"center"}
                onClick={() =>
                  router.push(
                    `/admin/course/${semester.courseId}/semester/${semester.id}/subject/view/${subject.id}`
                  )
                }
              >
                <Text align={"center"} className="px-10">
                  {subject.name}
                </Text>
              </Flex>
            ))}
            {semester.subjects.length === 0 && (
              <Flex align={"center"} justify={"center"} className="w-full">
                <Text align={"center"}>No Subjects Added Yet.</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default SemesterContainer;
