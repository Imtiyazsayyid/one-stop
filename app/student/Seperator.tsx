import { Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  className?: string;
}
const Seperator = ({ className }: Props) => {
  return (
    <Flex justify={"center"} className={className}>
      <Flex className="border-b-[1px] w-2/3"></Flex>
    </Flex>
  );
};

export default Seperator;
