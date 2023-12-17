"use client";

import { Flex, Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import HeadingCard from "../../../components/HeadingCard";
import Card from "../../../components/Card";
import Form from "../../Form";
import axios from "axios";
import { Course } from "@prisma/client";
import toast from "react-hot-toast";

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
      <HeadingCard title={`Edit Course - ${course?.name || ""} `}></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={course?.id}
          abbr={course?.abbr}
          programOutcome={course?.programOutcome || ""}
          description={course?.description || ""}
          name={course?.name}
          duration={course?.duration}
          aboutFacility={course?.aboutFacility || ""}
          departmentalStrength={course?.departmentalStrength || ""}
          eligibilty={course?.eligibilty || ""}
          mission={course?.mission || ""}
          significance={course?.significance || ""}
          technicalActivities={course?.technicalActivities || ""}
          vision={course?.vision || ""}
        />
      </Card>
    </Flex>
  );
};

export default EditCoursePage;
