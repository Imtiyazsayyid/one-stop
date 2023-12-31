import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import Form from "../Form";

interface Props {
  params: {
    courseId: string;
    semesterId: string;
    subjectId: string;
  };
}

const NewCoursePage = ({ params }: Props) => {
  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard title="Add New Unit"></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form subjectId={parseInt(params.subjectId)} />
      </Card>
    </Flex>
  );
};

export default NewCoursePage;
