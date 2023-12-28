import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  batchId: number;
  fetchData: () => void;
}

const NewForm = ({ batchId, fetchData }: Props) => {
  const [divisionDetails, setDivisionDetails] = useState({
    name: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await axios.post("/api/admin/division", {
      ...divisionDetails,
      batchId,
    });

    if (res.data.status) {
      toast.success("Division Saved");
      fetchData();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">
          <PlusIcon />
          Add New
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Division Name
            </Text>
            <TextField.Input
              placeholder="Eg. A"
              onChange={(e) =>
                setDivisionDetails({ ...divisionDetails, name: e.target.value })
              }
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewForm;
