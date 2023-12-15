"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  link: string;
}

const AddNewButton = ({ link }: Props) => {
  const router = useRouter();

  return (
    <Button variant="soft" onClick={() => router.push(link)}>
      <PlusIcon />
      Add New
    </Button>
  );
};

export default AddNewButton;
