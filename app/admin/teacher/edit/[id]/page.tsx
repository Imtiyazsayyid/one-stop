"use client";

import { Flex, Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import HeadingCard from "../../../components/HeadingCard";
import Card from "../../../components/Card";
import Form from "../../Form";
import axios from "axios";
import { Teacher } from "@prisma/client";
import toast from "react-hot-toast";
import { DetailedTeacher } from "@/app/admin/interfaces";

interface Props {
  params: {
    id: string;
  };
}

const EditTeacherPage = ({ params }: Props) => {
  const [teacher, setTeacher] = useState<DetailedTeacher>();

  const getTeacher = async () => {
    try {
      const res = await axios.get(`/api/admin/teacher/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setTeacher(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacher();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={`Edit Teacher - ${
          (teacher && teacher?.user.firstName + " " + teacher?.user.lastName) ||
          ""
        } `}
      ></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={teacher?.id}
          userId={teacher?.userId}
          roleId={teacher?.roleId}
          gender={teacher?.user.gender || ""}
          firstName={teacher?.user.firstName}
          lastName={teacher?.user.lastName}
          email={teacher?.user.email}
          password={teacher?.user.password}
          profileImg={teacher?.user.profileImg || ""}
          about={teacher?.about || ""}
          awardsAndRecognition={teacher?.awardsAndRecognition || ""}
          booksOrChapter={teacher?.booksOrChapter || ""}
          certificationCourses={teacher?.certificationCourses || ""}
          experience={teacher?.experience || undefined}
          guestSpeakerAndResourcePerson={
            teacher?.guestSpeakerAndResourcePerson || ""
          }
          participationInCWTP={teacher?.participationInCWTP || ""}
          professionalMemberships={teacher?.professionalMemberships || ""}
          qualification={teacher?.qualification || ""}
          researchPublications={teacher?.researchPublications || ""}
        />
      </Card>
    </Flex>
  );
};

export default EditTeacherPage;
