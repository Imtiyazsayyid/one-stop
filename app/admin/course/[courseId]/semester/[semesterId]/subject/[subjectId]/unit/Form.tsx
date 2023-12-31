"use client";

import { unitSchema } from "@/app/validationSchemas";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UnitMaterialBlock from "./UnitMaterialBlock";

interface Props {
  subjectId: number;
  id?: number;
  name?: string;
  number?: number;
  description?: string;
  unitMaterialsProp?: UnitMaterial[];
}

interface UnitMaterial {
  id: number;
  name: string;
  type: string;
  link: string;
}

const Form = ({
  id,
  name,
  number,
  description,
  subjectId,
  unitMaterialsProp,
}: Props) => {
  useEffect(() => {
    setUnitDetails({
      name: name || "",
      number: number || null,
      description: description || "",
    });

    if (unitMaterialsProp) {
      setUnitMaterials(unitMaterialsProp);
    }
  }, [name, number, description, unitMaterialsProp]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    number: "",
  });

  const [unitDetails, setUnitDetails] = useState({
    number: null as number | null,
    name: "",
    description: "",
  });

  const [unitMaterials, setUnitMaterials] = useState<UnitMaterial[]>([]);

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      number: "",
    }));

    const validation = unitSchema.safeParse(unitDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;
      console.log(errorArray);

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.post("/api/admin/unit", {
      ...unitDetails,
      subjectId,
      unitMaterials,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.back();
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      name: "",
      number: "",
    }));

    const validation = unitSchema.safeParse(unitDetails);

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

    const res = await axios.put(`/api/admin/unit/${id}`, {
      ...unitDetails,
      subjectId,
      unitMaterials,
    });

    if (!res.data.status) {
      toast.error(res.data.error);
      return;
    }

    toast.success("Saved Successfully");
    router.back();
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* unit name */}
        <Flex direction={"column"} className="w-1/2">
          <Text className="text-xs text-slate-400">Unit Number</Text>
          <Text className="text-xs text-red-400">{errors.number}</Text>
          <TextField.Root>
            <TextField.Input
              value={unitDetails.number?.toString() || "0"}
              type="number"
              size={"2"}
              onChange={(e) =>
                setUnitDetails({
                  ...unitDetails,
                  number: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Unit Abbreviation */}
        <Flex direction={"column"} className="w-1/2">
          <Text className="text-xs text-slate-400">Unit Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={unitDetails.name}
              onChange={(e) =>
                setUnitDetails({
                  ...unitDetails,
                  name: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex className="w-full" align={"end"} gap={"4"}>
        <Flex direction={"column"} className="w-full">
          <Text className="text-xs text-slate-400">Unit Description</Text>

          <TextArea
            value={unitDetails.description}
            className="h-40"
            onChange={(e) =>
              setUnitDetails({
                ...unitDetails,
                description: e.target.value,
              })
            }
          />
        </Flex>
      </Flex>

      <Flex className="w-full" direction={"column"}>
        <Text className="text-xs text-slate-400">Unit Materials</Text>
        <Flex
          className="w-full border rounded-md shadow-sm p-2"
          direction={"column"}
        >
          {unitMaterials.map((unitMaterial) => (
            <UnitMaterialBlock
              id={unitMaterial.id}
              key={unitMaterial.id}
              unitMaterialProp={unitMaterial}
              saveUnitMaterial={(updatedUnitMaterial) => {
                setUnitMaterials(
                  unitMaterials.map((unitMaterial) => {
                    return unitMaterial.id === updatedUnitMaterial.id
                      ? updatedUnitMaterial
                      : unitMaterial;
                  })
                );
              }}
              deleteItem={(id) => {
                let deletedList = unitMaterials.filter(
                  (item) => item.id !== id
                );
                setUnitMaterials(deletedList);
              }}
            />
          ))}
          <Flex className="w-full p-5">
            <Button
              variant="soft"
              className="w-full"
              onClick={() =>
                setUnitMaterials([
                  ...unitMaterials,
                  {
                    id: unitMaterials.length + 1,
                    name: "",
                    type: "",
                    link: "",
                  },
                ])
              }
            >
              <PlusIcon /> Add
            </Button>
          </Flex>
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
