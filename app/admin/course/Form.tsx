"use client";

import { courseSchema } from "@/app/validationSchemas";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  id?: number;
  name?: string;
  abbr?: string;
  duration?: number;
  description?: string;
  course_outcome?: string;
}

const Form = ({
  id,
  abbr,
  course_outcome,
  description,
  duration,
  name,
}: Props) => {
  useEffect(() => {
    setCourseDetails({
      name: name || "",
      abbr: abbr || "",
      duration: duration || 0,
      description: description || "",
      course_outcome: course_outcome || "",
    });
  }, [name, abbr, duration, description, course_outcome]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    abbr: "",
    duration: "",
  });

  const [courseDetails, setCourseDetails] = useState({
    name: "",
    abbr: "",
    duration: 0,
    description: "",
    course_outcome: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      duration: "",
    }));

    const validation = courseSchema.safeParse(courseDetails);

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

    const res = await axios.post("/api/admin/course", courseDetails);

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/course");
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      duration: "",
    }));

    const validation = courseSchema.safeParse(courseDetails);

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

    const res = await axios.put(`/api/admin/course/${id}`, courseDetails);

    if (!res.data.status) {
      toast.error("Failed To Save Changes");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/course");
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* course name */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={courseDetails.name}
              size={"2"}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, name: e.target.value })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Course Abbreviation */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Abbreviation</Text>
          <Text className="text-xs text-red-400">{errors.abbr}</Text>
          <TextField.Root>
            <TextField.Input
              value={courseDetails.abbr}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, abbr: e.target.value })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Course Duration */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Duration (Years)</Text>
          <Text className="text-xs text-red-400">{errors.duration}</Text>
          <TextField.Root>
            <TextField.Input
              value={courseDetails.duration}
              type="number"
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  duration: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex gap={"4"}>
        <Flex className="w-1/2" direction={"column"}>
          <Text className="text-xs text-slate-400">Course Outcome</Text>
          <SimpleMDE
            onChange={(value) =>
              setCourseDetails({ ...courseDetails, course_outcome: value })
            }
            value={courseDetails.course_outcome}
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"}>
          <Text className="text-xs text-slate-400">Description</Text>
          <SimpleMDE
            onChange={(value) =>
              setCourseDetails({ ...courseDetails, description: value })
            }
            value={courseDetails.description}
          />
        </Flex>
      </Flex>

      <Flex justify={"center"} mt={"9"}>
        <Flex className="w-1/3" mb={"9"} gap={"2"}>
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
