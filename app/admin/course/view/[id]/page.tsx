"use client";

import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import HeadingCard from "../../../components/HeadingCard";
import Card from "../../../components/Card";
import Form from "../../Form";
import axios from "axios";
import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import FormattedHTML from "@/app/components/FormattedHTML";
import Seperator from "@/app/components/Seperator";

interface Props {
  params: {
    id: string;
  };
}

const EditCoursePage = ({ params }: Props) => {
  const [course, setCourse] = useState<Course>();

  const getCourse = async () => {
    try {
      const res = await axios.get(`/api/admin/course/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard title={course?.name || ""}></HeadingCard>
      <Card className="h-full p-10 flex-col pt-20">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"}>
              <Text className="text-slate-500 text-xs">Course Name</Text>
              <Text>{course?.name}</Text>
            </Flex>

            <Flex direction={"column"}>
              <Text className="text-slate-500 text-xs">
                Course Abbreviation
              </Text>
              <Text>{course?.abbr}</Text>
            </Flex>

            <Flex direction={"column"}>
              <Text className="text-slate-500 text-xs">Course Duration</Text>
              <Text>{course?.duration} years</Text>
            </Flex>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10">
            <Text className="text-slate-500 text-xs">Course Description</Text>
            <div>
              <FormattedHTML value={course?.description || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10">
            <Text className="text-slate-500 text-xs">Course Outcome</Text>
            <div>
              <FormattedHTML value={course?.course_outcome || ""} />
            </div>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditCoursePage;
