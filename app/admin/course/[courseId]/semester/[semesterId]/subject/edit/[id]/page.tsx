"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import { Subject } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../../Form";

interface Props {
  params: {
    courseId: string;
    semesterId: string;
    id: string;
  };
}

const EditSubjectPage = ({ params }: Props) => {
  const [subject, setSubject] = useState<Subject>();

  const getSubject = async () => {
    try {
      const res = await axios.get(`/api/admin/subject/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setSubject(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={`Edit Subject - ${subject?.name || ""}`}
      ></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={subject?.id}
          courseId={parseInt(params.courseId)}
          semesterId={parseInt(params.semesterId)}
          credits={subject?.credits}
          name={subject?.name}
          abbr={subject?.abbr}
          code={subject?.code}
          subjectType={subject?.subjectType}
        />
      </Card>
    </Flex>
  );
};

export default EditSubjectPage;
