"use client";

import { subjectSchema } from "@/app/validationSchemas";
import { SubjectType } from "@prisma/client";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: number;
  name?: string;
  abbr?: string;
  code?: string;
  credits?: number;
  duration?: number;
  courseId: number;
  semesterId: number;
  subjectType?: SubjectType | undefined | null;
}

const Form = ({
  id,
  name,
  abbr,
  code,
  semesterId,
  courseId,
  credits,
  subjectType,
}: Props) => {
  useEffect(() => {
    setSubjectDetails({
      name: name || "",
      abbr: abbr || "",
      code: code || "",
      credits: credits || 0,
      subjectType: subjectType,
    });
  }, [name, abbr, code]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    abbr: "",
    code: "",
    credits: "",
    subjectType: "",
  });

  const [subjectDetails, setSubjectDetails] = useState({
    name: "",
    abbr: "",
    code: "",
    credits: 0,
    subjectType: subjectType,
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      code: "",
      credits: "",
      subjectType: "",
    }));

    const validation = subjectSchema.safeParse(subjectDetails);

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

    const res = await axios.post("/api/admin/subject", {
      ...subjectDetails,
      semesterId,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.push(`/admin/course/${courseId}/semester/${semesterId}/subject`);
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      code: "",
      credits: "",
      subjectType: "",
    }));

    const validation = subjectSchema.safeParse(subjectDetails);

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

    const res = await axios.put(`/api/admin/subject/${id}`, {
      ...subjectDetails,
      semesterId,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.push(`/admin/course/${courseId}/semester/${semesterId}/subject`);
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* subject name */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Subject Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={subjectDetails.name}
              size={"2"}
              onChange={(e) =>
                setSubjectDetails({
                  ...subjectDetails,
                  name: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Subject Abbreviation */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Abbreviation</Text>
          <Text className="text-xs text-red-400">{errors.abbr}</Text>
          <TextField.Root>
            <TextField.Input
              value={subjectDetails.abbr}
              onChange={(e) =>
                setSubjectDetails({
                  ...subjectDetails,
                  abbr: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Subject Code */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Subject Code</Text>
          <Text className="text-xs text-red-400">{errors.code}</Text>
          <TextField.Root>
            <TextField.Input
              value={subjectDetails.code}
              onChange={(e) =>
                setSubjectDetails({
                  ...subjectDetails,
                  code: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex className="w-full" align={"end"} gap={"4"}>
        {/* Subject Credits */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Subject Credits</Text>
          <Text className="text-xs text-red-400">{errors.credits}</Text>
          <TextField.Root>
            <TextField.Input
              value={subjectDetails.credits}
              type="number"
              onChange={(e) =>
                setSubjectDetails({
                  ...subjectDetails,
                  credits: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Subject Type */}
        <Flex direction={"column"} className="w-1/3">
          <Text className="text-xs text-slate-400">Subject Type</Text>
          <Text className="text-xs text-red-400">{errors.subjectType}</Text>
          <Select.Root
            value={subjectDetails.subjectType || undefined}
            defaultValue={"core_subject"}
            onValueChange={(val) =>
              setSubjectDetails({
                ...subjectDetails,
                subjectType: val as SubjectType,
              })
            }
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Item value="core_subject">Core Subject</Select.Item>
              <Select.Item value="core_subject_practical">
                Core Subject Practical
              </Select.Item>
              <Select.Item value="ability_enhancement_skill_course">
                Ability Enhancement Skill Course
              </Select.Item>
              <Select.Item value="ability_enhancement_skill_practical">
                Ability Enhancement Skill Practical
              </Select.Item>
            </Select.Content>
          </Select.Root>
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
