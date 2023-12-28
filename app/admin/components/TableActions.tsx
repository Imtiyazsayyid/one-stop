"use client";
import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import {
  ArrowRightIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

interface Props {
  editLink?: string;
  viewLink?: string;
  deleteLink?: string;
  editModal?: ReactNode;
  fetchData: () => {};
}

const TableActions = ({
  editLink,
  viewLink,
  deleteLink,
  fetchData,
  editModal,
}: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (deleteLink) {
        const res = await axios.delete(deleteLink);
        if (!res.data.status) {
          toast.error(res.data.error);
        }
        toast.success("Deleted Successfully");

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      gap={"2"}
      className="shadow-sm w-fit p-2 rounded-full border"
      justify={"center"}
    >
      {viewLink && (
        <Button
          variant="soft"
          color="blue"
          onClick={() => router.push(viewLink)}
          radius="full"
        >
          <EyeOpenIcon />
        </Button>
      )}
      {editLink && (
        <Button
          variant="soft"
          onClick={() => router.push(editLink)}
          radius="full"
        >
          <Pencil2Icon />
        </Button>
      )}
      {editModal}
      {deleteLink && <DeleteConfirmation confirmDelete={handleDelete} />}
    </Flex>
  );
};

export default TableActions;
