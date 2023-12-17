"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import { Semester } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../../Form";

interface Props {
  params: {
    id: string;
  };
}

const EditSemesterPage = ({ params }: Props) => {
  const [semester, setSemester] = useState<Semester>();

  const getSemester = async () => {
    try {
      const res = await axios.get(`/api/admin/semester/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setSemester(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSemester();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={`Edit Semester - Semester ${semester?.semNumber || ""}`}
      ></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={semester?.id}
          courseId={semester?.courseId!}
          semNumber={semester?.semNumber}
          duration={semester?.duration}
        />
      </Card>
    </Flex>
  );
};

export default EditSemesterPage;
