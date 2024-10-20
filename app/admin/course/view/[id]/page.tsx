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
import { DetailedCourse } from "@/app/admin/interfaces";
import SemesterContainer from "./SemesterContainer";
import { courseSchema } from "@/app/validationSchemas";

interface Props {
  params: {
    id: string;
  };
}

const EditCoursePage = ({ params }: Props) => {
  const [course, setCourse] = useState<DetailedCourse>();

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
      <Card className="h-full p-10 flex-col pt-20 overflow-hidden overflow-y-scroll">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Course Name</Text>
              <Text>{course?.name || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">
                Course Abbreviation
              </Text>
              <Text>{course?.abbr || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Course Duration</Text>
              <Text>{course?.duration || "-"} years</Text>
            </Flex>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Course Description</Text>
            <div>
              <FormattedHTML value={course?.description || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Program Outcome</Text>
            <div>
              <FormattedHTML value={course?.programOutcome || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Departmental Strength
            </Text>
            <div>
              <FormattedHTML value={course?.departmentalStrength || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">About our Facility</Text>
            <div>
              <FormattedHTML value={course?.aboutFacility || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Eligibility</Text>
            <div>
              <FormattedHTML value={course?.eligibilty || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Significance</Text>
            <div>
              <FormattedHTML value={course?.significance || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Mission</Text>
            <div>
              <FormattedHTML value={course?.mission || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Vision</Text>
            <div>
              <FormattedHTML value={course?.vision || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Technical Activities</Text>
            <div>
              <FormattedHTML value={course?.technicalActivities || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          {course?.semesters && course?.semesters.length > 0 && (
            <Flex direction={"column"} className="w-2/3" gap={"2"}>
              <Text className="text-slate-500 text-xs">Semesters</Text>
              <Flex
                className="p-2 w-[60rem] bg-slate-100 rounded-lg"
                gap={"2"}
                direction={"column"}
              >
                {course?.semesters.map((sem) => (
                  <SemesterContainer semester={sem} key={sem.id} />
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditCoursePage;
