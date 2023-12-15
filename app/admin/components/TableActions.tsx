"use client";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  editLink?: string;
  viewLink?: string;
  deleteLink?: string;
}

const TableActions = ({ editLink, viewLink, deleteLink }: Props) => {
  const router = useRouter();

  return (
    <Flex gap={"2"}>
      {editLink && (
        <Button variant="soft" onClick={() => router.push(editLink)}>
          <Pencil2Icon />
        </Button>
      )}
      {viewLink && (
        <Button
          variant="soft"
          color="blue"
          onClick={() => router.push(viewLink)}
        >
          <EyeOpenIcon />
        </Button>
      )}

      {deleteLink && (
        <Button
          variant="soft"
          color="red"
          onClick={() => router.push(deleteLink)}
        >
          <TrashIcon />
        </Button>
      )}
    </Flex>
  );
};

export default TableActions;
