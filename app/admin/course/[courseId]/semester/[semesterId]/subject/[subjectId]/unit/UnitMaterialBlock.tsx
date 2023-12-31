"use client";

import Preview from "@/app/admin/components/Preview";
import { UnitMaterialType } from "@prisma/client";
import { CaretDownIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UnitMaterial {
  id: number;
  name: string;
  type: string;
  link: string;
}

interface Props {
  id: number;
  deleteItem: (id: number) => void;
  saveUnitMaterial: (unitMaterial: UnitMaterial) => void;
  unitMaterialProp: UnitMaterial;
}

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

const UnitMaterialBlock = ({
  id,
  deleteItem,
  saveUnitMaterial,
  unitMaterialProp,
}: Props) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setUnitMaterial({
      name: unitMaterialProp.name,
      link: unitMaterialProp.link,
      type: unitMaterialProp.type,
    });
  }, [unitMaterialProp]);

  const [unitMaterial, setUnitMaterial] = useState({
    name: "",
    type: "",
    link: "",
  });

  const handleYoutubeEmbeddedLink = (link: string) => {
    if (link.includes("youtube")) {
      let startIndex = link.indexOf("?v=");
      if (startIndex == -1) return link;
      let videoId = link.substring(startIndex + 3);
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      return embedLink;
    }
    return link;
  };

  const handleDelete = () => {
    deleteItem(id);
  };

  const handleSave = (data: { name: string; type: string; link: string }) => {
    saveUnitMaterial({
      id: id,
      ...data,
    });
  };

  return (
    <>
      <Flex className="w-full" align={"center"}>
        <Flex className="h-full w-1/3 rounded-lg p-5" direction={"column"}>
          <Text className="text-xs text-slate-400">Name</Text>

          <TextField.Root>
            <TextField.Input
              size={"2"}
              value={unitMaterial.name}
              onChange={(e) => {
                setUnitMaterial({ ...unitMaterial, name: e.target.value });
                handleSave({ ...unitMaterial, name: e.target.value });
              }}
            />
          </TextField.Root>
        </Flex>
        <Flex className="h-full w-1/3 rounded-lg p-5" direction={"column"}>
          <Text className="text-xs text-slate-400">Type</Text>

          <Select.Root
            onValueChange={(val) => {
              setUnitMaterial({ ...unitMaterial, type: val });
              handleSave({ ...unitMaterial, type: val });
            }}
            value={unitMaterial.type}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Item value={"img"}>Image</Select.Item>
              <Select.Item value={"video"}>Video</Select.Item>
              <Select.Item value={"pdf"}>PDF</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex className="h-full w-1/3 rounded-lg p-5" direction={"column"}>
          <Text className="text-xs text-slate-400">Material Link</Text>
          <Flex align={"center"} gap={"2"}>
            <TextField.Root>
              <TextField.Input
                size={"2"}
                value={unitMaterial.link}
                onChange={(e) => {
                  setUnitMaterial({
                    ...unitMaterial,
                    link: handleYoutubeEmbeddedLink(e.target.value),
                  });
                  handleSave({
                    ...unitMaterial,
                    link: handleYoutubeEmbeddedLink(e.target.value),
                  });
                }}
              />
            </TextField.Root>
            <Text className="text-xs text-slate-500">or</Text>

            <CldUploadWidget
              options={{
                sources: ["local"],
                multiple: false,
                cropping: true,
                styles: {
                  palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#0433ff",
                    action: "#339933",
                    inProgress: "#0433ff",
                    complete: "#339933",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd",
                  },
                  fonts: {
                    default: null,
                    "sans-serif": {
                      url: null,
                      active: true,
                    },
                  },
                },
              }}
              uploadPreset="oekh1dfb"
              onUpload={(result) => {
                console.log({ result });
                if (result.event !== "success") return;
                const info = result.info as CloudinaryResult;
                if (info.url) {
                  setUnitMaterial({ ...unitMaterial, link: info.url });
                  handleSave({ ...unitMaterial, link: info.url });
                  toast.success("Material Added.");
                }
              }}
            >
              {({ open }) => {
                if (!open) return <></>;
                return (
                  <Button
                    onClick={() => {
                      open();
                    }}
                  >
                    Upload Material
                  </Button>
                );
              }}
            </CldUploadWidget>
          </Flex>
        </Flex>
        <Flex className="pr-8" mt={"4"} gap={"2"}>
          <Button
            variant="soft"
            radius="full"
            onClick={() => setActive(!isActive)}
          >
            <CaretDownIcon />
          </Button>
          <Button
            variant="soft"
            color="red"
            radius="full"
            onClick={handleDelete}
          >
            <TrashIcon />
          </Button>
        </Flex>
      </Flex>
      {isActive && (
        <Flex className="px-5">
          <Preview
            type={unitMaterial.type as UnitMaterialType}
            link={unitMaterial.link}
          />
        </Flex>
      )}
    </>
  );
};

export default UnitMaterialBlock;
