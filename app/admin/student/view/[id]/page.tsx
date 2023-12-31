"use client";

import { DetailedTeacher } from "@/app/admin/interfaces";
import FormattedHTML from "@/app/components/FormattedHTML";
import Seperator from "@/app/components/Seperator";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../../components/Card";
import HeadingCard from "../../../components/HeadingCard";

interface Props {
  params: {
    id: string;
  };
}

const EditTeacherPage = ({ params }: Props) => {
  const [teacher, setTeacher] = useState<DetailedTeacher>();

  const getTeacher = async () => {
    try {
      const res = await axios.get(`/api/admin/teacher/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setTeacher(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacher();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={
          (teacher &&
            teacher.role.name +
              " - " +
              teacher?.user.firstName +
              " " +
              teacher?.user.lastName) ||
          ""
        }
      ></HeadingCard>
      <Card className="h-full p-10 flex-col pt-20 overflow-hidden overflow-y-scroll">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex justify={"center"} className="px-10 w-2/3">
            <Avatar
              fallback={"?"}
              src={teacher?.user.profileImg || ""}
              radius="full"
              size={"9"}
              mb={"9"}
            />
          </Flex>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Name</Text>
              <Text>
                {(teacher &&
                  teacher?.user.firstName + " " + teacher?.user.lastName) ||
                  "-"}
              </Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Email</Text>
              <Text>{teacher?.user.email || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">
                Teaching Experience
              </Text>
              <Text>{teacher?.experience || "-"} years</Text>
            </Flex>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">About Me</Text>
            <div>
              <FormattedHTML value={teacher?.about || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Qualification</Text>
            <div>
              <FormattedHTML value={teacher?.qualification || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Awards and Recognition
            </Text>
            <div>
              <FormattedHTML value={teacher?.awardsAndRecognition || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Guest Speaker and Resource Person
            </Text>
            <div>
              <FormattedHTML
                value={teacher?.guestSpeakerAndResourcePerson || ""}
              />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Participation in Conferences Workshops and Training Programs
            </Text>
            <div>
              <FormattedHTML value={teacher?.participationInCWTP || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Research Publications
            </Text>
            <div>
              <FormattedHTML value={teacher?.researchPublications || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Certification Courses
            </Text>
            <div>
              <FormattedHTML value={teacher?.certificationCourses || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">Books or Chapters</Text>
            <div>
              <FormattedHTML value={teacher?.booksOrChapter || ""} />
            </div>
          </Flex>

          <Flex className="w-2/3">
            <Seperator className="w-full" />
          </Flex>

          <Flex direction={"column"} className="w-2/3 px-10" gap={"2"}>
            <Text className="text-slate-500 text-xs">
              Professional Memberships
            </Text>
            <div>
              <FormattedHTML value={teacher?.professionalMemberships || ""} />
            </div>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditTeacherPage;
