"use client";
import GoBack from "@/app/components/GoBack";
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
      gap={"5"}
      pl={"5"}
    >
      <GoBack />
      <Heading size={"4"} weight={"bold"}>
        {title || ""}
      </Heading>
    </Flex>
  );
};

export default HeadingCard;
