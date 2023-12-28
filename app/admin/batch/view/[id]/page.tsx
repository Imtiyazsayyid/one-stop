"use client";

import { DetailedBatch } from "@/app/admin/interfaces";
import Seperator from "@/app/components/Seperator";
import { Flex, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../../components/Card";
import HeadingCard from "../../../components/HeadingCard";

interface Props {
  params: {
    id: string;
  };
}

const EditBatchPage = ({ params }: Props) => {
  const [batch, setBatch] = useState<DetailedBatch>();

  const getBatch = async () => {
    try {
      const res = await axios.get(`/api/admin/batch/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setBatch(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBatch();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={
          `${batch?.course?.name || ""} (${
            moment(batch?.fromDate).format("YYYY") +
              " - " +
              moment(batch?.toDate).format("YY") || ""
          })` || ""
        }
      ></HeadingCard>

      <Card className="h-full p-10 flex-col pt-20 overflow-hidden overflow-y-scroll">
        <Flex className="p-10" direction={"column"} gap={"9"} align={"center"}>
          <Flex justify={"between"} className="px-10 w-2/3">
            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">Course Name</Text>
              <Text>{batch?.course?.name || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">From Date</Text>
              <Text>{moment(batch?.fromDate).format("MMM YYYY") || "-"}</Text>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <Text className="text-slate-500 text-xs">To Date</Text>
              <Text>{moment(batch?.toDate).format("MMM YYYY") || "-"}</Text>
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

export default EditBatchPage;
