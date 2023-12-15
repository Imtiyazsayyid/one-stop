import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import HeadingCard from "../components/HeadingCard";
import Card from "../components/Card";

const CoursePage = () => {
  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Courses" />
      <Card>Hello</Card>
    </Flex>
  );
};

export default CoursePage;
