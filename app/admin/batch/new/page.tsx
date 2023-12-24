import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import HeadingCard from "../../components/HeadingCard";
import Card from "../../components/Card";
import Form from "../Form";

const NewCoursePage = () => {
  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard title="Add New Batch"></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form />
      </Card>
    </Flex>
  );
};

export default NewCoursePage;
