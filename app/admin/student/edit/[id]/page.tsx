"use client";

import { Flex, Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import HeadingCard from "../../../components/HeadingCard";
import Card from "../../../components/Card";
import Form from "../../Form";
import axios from "axios";
import { Student } from "@prisma/client";
import toast from "react-hot-toast";
import { DetailedStudent } from "@/app/admin/interfaces";

interface Props {
  params: {
    id: string;
  };
}

const EditStudentPage = ({ params }: Props) => {
  const [student, setStudent] = useState<DetailedStudent>();

  const getStudent = async () => {
    try {
      const res = await axios.get(`/api/admin/student/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setStudent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={`Edit Student - ${
          (student && student?.user.firstName + " " + student?.user.lastName) ||
          ""
        } `}
      ></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={student?.id}
          userId={student?.userId}
          gender={student?.user.gender || ""}
          firstName={student?.user.firstName}
          lastName={student?.user.lastName}
          email={student?.user.email}
          password={student?.user.password}
          profileImg={student?.user.profileImg || ""}
          courseId={student?.courseId}
          batchId={student?.batchId}
          divisionId={student?.divisionId}
        />
      </Card>
    </Flex>
  );
};

export default EditStudentPage;
