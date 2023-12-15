import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  title: string;
}

const HeadingCard = ({ title }: Props) => {
  return (
    <Flex
      className="border rounded-lg bg-white shadow-sm w-full h-20"
      align={"center"}
      pl={"5"}
    >
      <Heading>{title}</Heading>
    </Flex>
  );
};

export default HeadingCard;
