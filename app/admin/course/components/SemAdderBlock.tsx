import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Checkbox, Flex, Heading } from "@radix-ui/themes";
import React from "react";

interface semester {
  subjects: string[];
}

interface Props {
  semesters: semester[];
  semester: semester;
  index: number;
  deleteSemester: (index: number) => void;
  addSemester: (index: number) => void;
}

const SemAdderBlock = ({
  index,
  deleteSemester,
  addSemester,
  semester,
  semesters,
}: Props) => {
  return (
    <Flex
      className="h-20 shadow-sm border w-full rounded-lg bg-white p-4 px-6"
      justify={"between"}
      align={"center"}
    >
      <Flex gap="4" align={"center"}>
        <Checkbox variant="soft" />
        {/* defaultChecked */}
        <Heading size={"3"}>Semester {index + 1}</Heading>
      </Flex>
      <Flex gap={"2"}>
        {semesters.length > 1 && (
          <DeleteConfirmation confirmDelete={() => deleteSemester(index)} />
        )}

        <Button radius="full" variant="soft" onClick={() => addSemester(index)}>
          <PlusCircledIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SemAdderBlock;
