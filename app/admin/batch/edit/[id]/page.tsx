"use client";

import { Flex, Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import HeadingCard from "../../../components/HeadingCard";
import Card from "../../../components/Card";
import Form from "../../Form";
import axios from "axios";
import { Batch } from "@prisma/client";
import toast from "react-hot-toast";
import moment from "moment";
import { DetailedBatch } from "@/app/admin/interfaces";

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
        title={`Edit Batch - ${batch?.course?.name} (${
          moment(batch?.fromDate).format("YYYY") +
            " - " +
            moment(batch?.toDate).format("YY") || ""
        })`}
      ></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          id={batch?.id}
          fromDate={batch?.fromDate.toString() || ""}
          toDate={batch?.toDate.toString() || ""}
          courseId={batch?.courseId}
          semestersProp={batch?.semesters.map(
            (semester) => semester.semesterId
          )}
        />
      </Card>
    </Flex>
  );
};

export default EditBatchPage;
