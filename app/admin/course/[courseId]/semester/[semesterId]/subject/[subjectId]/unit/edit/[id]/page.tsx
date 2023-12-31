"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import { Unit } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../../Form";
import { DetailedUnit } from "@/app/admin/interfaces";

interface Props {
  params: {
    courseId: string;
    semesterId: string;
    subjectId: string;
    id: string;
  };
}

const EditUnitPage = ({ params }: Props) => {
  const [unit, setUnit] = useState<DetailedUnit>();

  const getUnit = async () => {
    try {
      const res = await axios.get(`/api/admin/unit/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }

      setUnit(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnit();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard title={`Edit Unit - ${unit?.name || ""}`}></HeadingCard>
      <Card className="p-10 flex-col overflow-hidden overflow-y-scroll">
        <Form
          subjectId={parseInt(params.subjectId)}
          id={parseInt(params.id)}
          name={unit?.name}
          description={unit?.description || ""}
          number={unit?.number}
          unitMaterialsProp={unit?.unitMaterial.map((unitMaterial, index) => ({
            id: index + 1,
            name: unitMaterial.name,
            type: unitMaterial.type,
            link: unitMaterial.link,
          }))}
        />
      </Card>
    </Flex>
  );
};

export default EditUnitPage;
