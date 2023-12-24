"use client";

import { semesterSchema } from "@/app/validationSchemas";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  id?: number;
  semNumber?: number;
  duration?: number;
  courseId: number;
}

const Form = ({ id, duration, semNumber, courseId }: Props) => {
  useEffect(() => {
    setSemesterDetails({
      semNumber: semNumber || 1,
      duration: duration || 0,
    });
  }, [semNumber, duration]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    semNumber: "",
    duration: "",
  });

  const [semesterDetails, setSemesterDetails] = useState({
    semNumber: 1,
    duration: 0,
  });

  const handleSave = async () => {
    setErrors(() => ({
      semNumber: "",
      duration: "",
    }));

    const validation = semesterSchema.safeParse(semesterDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;
      console.log({ errorArray });

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.post("/api/admin/semester", {
      ...semesterDetails,
      courseId,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.push(`/admin/course/${courseId}/semester`);
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      semNumber: "",
      duration: "",
    }));

    const validation = semesterSchema.safeParse(semesterDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.put(`/api/admin/semester/${id}`, {
      ...semesterDetails,
      courseId,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.push(`/admin/course/${courseId}/semester`);
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* semester name */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Semester Number</Text>
          <Text className="text-xs text-red-400">{errors.semNumber}</Text>
          <TextField.Root>
            <TextField.Input
              defaultValue={semesterDetails.semNumber}
              size={"2"}
              type="number"
              onChange={(e) =>
                setSemesterDetails({
                  ...semesterDetails,
                  semNumber: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Semester Duration */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Duration (Months)</Text>
          <Text className="text-xs text-red-400">{errors.duration}</Text>
          <TextField.Root>
            <TextField.Input
              defaultValue={semesterDetails.duration}
              type="number"
              onChange={(e) =>
                setSemesterDetails({
                  ...semesterDetails,
                  duration: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex justify={"center"} mt={"9"}>
        <Flex className="w-1/3 px-10" mb={"9"} gap={"2"} justify={"center"}>
          {!id && (
            <Button onClick={() => handleSave()} className="w-1/2">
              Submit
            </Button>
          )}
          {id && (
            <Button onClick={() => handleUpdate()} className="w-1/2">
              Save Changes
            </Button>
          )}
          <Button onClick={() => router.back()} className="w-1/2" color="red">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
