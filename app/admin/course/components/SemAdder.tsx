"use client";

import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Checkbox, Flex, Heading } from "@radix-ui/themes";
import React, { useState } from "react";
import SemAdderBlock from "./SemAdderBlock";

const SemAdder = () => {
  const [semesters, setSemesters] = useState([
    { subjects: ["Hello", "Hello"] },
  ]);

  const deleteSemester = (index: number) => {
    setSemesters((semesters) => {
      const newSemesters = [...semesters];
      newSemesters.splice(index, 1);
      return newSemesters;
    });
  };

  const addSemester = (index: number) => {
    setSemesters((semesters) => {
      const newSemesters = [...semesters];
      newSemesters.splice(index + 1, 0, { subjects: ["Hello", "Hello"] });
      return newSemesters;
    });
  };

  return (
    <Flex
      className="w-full border p-2 bg-slate-50 rounded-lg"
      direction={"column"}
      gap={"2"}
    >
      {semesters.map((semester, index) => (
        <SemAdderBlock
          addSemester={addSemester}
          deleteSemester={deleteSemester}
          key={index}
          index={index}
          semester={semester}
          semesters={semesters}
        />
      ))}
    </Flex>
  );
};

export default SemAdder;
