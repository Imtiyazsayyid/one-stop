"use client";

import { DetailedStudent } from "@/app/admin/interfaces";
import FormattedHTML from "@/app/components/FormattedHTML";
import Seperator from "@/app/components/Seperator";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../../components/Card";
import HeadingCard from "../../../components/HeadingCard";
import moment from "moment";

interface Props {
  params: {
    id: string;
  };
}

const EditStudentPage = ({ params }: Props) => {
  const [student, setStudent] = useState<DetailedStudent>();

  const getStudent = async () => {
    try {
      const res = await axios.get(`/api/admin/student/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setStudent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={
          "Student - " +
          ((student &&
            student?.user.firstName + " " + student?.user.lastName) ||
            "")
        }
      ></HeadingCard>
      <Card className="h-full p-10 flex-col pt-20 overflow-hidden overflow-y-scroll">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex
            align={"center"}
            className="px-10 w-2/3"
            direction={"column"}
            mb={"5"}
            gap={"9"}
          >
            <Avatar
              fallback={"?"}
              src={student?.user.profileImg || ""}
              radius="full"
              size={"9"}
            />
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Roll Number</Text>
              <Text>{student?.rollNumber || "-"}</Text>
            </Flex>
          </Flex>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Name</Text>
              <Text>
                {(student &&
                  student?.user.firstName + " " + student?.user.lastName) ||
                  "-"}
              </Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Email</Text>
              <Text>{student?.user.email || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Gender</Text>
              <Text>
                {(student &&
                  student.user.gender[0].toUpperCase() +
                    student.user.gender.substring(1)) ||
                  "-"}
              </Text>
            </Flex>
          </Flex>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Course</Text>
              <Text>{student?.course.abbr || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Batch</Text>
              <Text>
                {moment(student?.batch.fromDate).format("MMM YYYY") +
                  " - " +
                  moment(student?.batch.toDate).format("YY") || "-"}
              </Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Division</Text>
              <Text>{student?.division.name || "-"}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditStudentPage;
