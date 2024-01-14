"use client";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import TimeTableBuilder from "@/app/admin/components/TimeTableBuilder";
import { DetailedBatch, DetailedDivision } from "@/app/admin/interfaces";
import { Batch, Course } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    divisionId: string;
    batchId: string;
  };
}

const DivisionTimeTablePage = ({ params }: Props) => {
  const [batch, setBatch] = useState<DetailedBatch>();
  const [division, setDivision] = useState<DetailedDivision>();

  const getBatch = async () => {
    const res = await axios.get("/api/admin/batch/" + params.batchId);
    setBatch(res.data.data);
  };

  const getDivision = async () => {
    const res = await axios.get("/api/admin/division/" + params.divisionId);
    setDivision(res.data.data);
  };

  useEffect(() => {
    getBatch();
    getDivision();
  }, []);

  if (!batch) return;

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={`${batch.course.abbr} (${moment(batch.fromDate).format(
          "YYYY"
        )} - ${moment(batch.toDate).format("YY")}) Division ${
          division?.name || ""
        } Time Table`}
      ></HeadingCard>
      <Card className="h-full p-10 pt-20 pb-40 overflow-hidden overflow-y-scroll bg-slate-200">
        <Flex className="w-full h-full" pt={"9"}>
          <TimeTableBuilder
            divisionId={parseInt(params.divisionId)}
            courseId={batch.courseId}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default DivisionTimeTablePage;
