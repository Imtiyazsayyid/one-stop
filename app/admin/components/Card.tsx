import { Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <Flex className={"border rounded-lg bg-white shadow-sm p-5 " + className}>
      {children}
    </Flex>
  );
};

export default Card;
