import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  divisionId: number;
  divisionName: string;
  batchId: number;
  fetchData: () => void;
}

const EditForm = ({ divisionId, divisionName, batchId, fetchData }: Props) => {
  const [divisionDetails, setDivisionDetails] = useState({
    name: divisionName,
  });
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await axios.put("/api/admin/division/" + divisionId, {
      ...divisionDetails,
      batchId,
    });

    if (res.data.status) {
      toast.success("Division Updated");
      fetchData();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" radius="full">
          <Pencil2Icon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Edit Division
            </Text>
            <TextField.Input
              placeholder="Eg. A"
              value={divisionDetails.name}
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

export default EditForm;
