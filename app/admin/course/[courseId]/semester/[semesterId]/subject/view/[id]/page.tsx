"use client";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import FormattedHTML from "@/app/components/FormattedHTML";
import Seperator from "@/app/components/Seperator";
import { Subject } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}

const EditSubjectPage = ({ params }: Props) => {
  const [subject, setSubject] = useState<Subject>();

  const getSubject = async () => {
    try {
      const res = await axios.get(`/api/admin/subject/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setSubject(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const subjectTypeMapper = {
    core_subject: "Core Subject",
    ability_enhancement_skill_course: "Ability Enhancement Skill Course",
    core_subject_practical: "Core Subject Practical",
    ability_enhancement_skill_practical: "Ability Enhancement Skill Practical",
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard title={subject?.name || ""}></HeadingCard>
      <Card className="h-full p-10 flex-col pt-20">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex className="px-10 w-2/3">
            <Flex direction={"column"} className="w-1/3">
              <Text className="text-slate-500 text-xs">Subject Name</Text>
              <Text className="pr-24">{subject?.name}</Text>
            </Flex>

            <Flex direction={"column"} className="w-1/3">
              <Text className="text-slate-500 text-xs">
                Subject Abbreviation
              </Text>
              <Text>{subject?.abbr}</Text>
            </Flex>

            <Flex direction={"column"} className="w-1/3">
              <Text className="text-slate-500 text-xs">Subject Code</Text>
              <Text>{subject?.code}</Text>
            </Flex>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex className="px-10 w-2/3">
            <Flex direction={"column"} className="w-1/3">
              <Text className="text-slate-500 text-xs">Subject Credits</Text>
              <Text>{subject?.credits}</Text>
            </Flex>

            <Flex direction={"column"} className="w-1/3">
              <Text className="text-slate-500 text-xs">Subject Type</Text>
              <Text>
                {subjectTypeMapper[subject?.subjectType || "core_subject"]}
              </Text>
            </Flex>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditSubjectPage;
