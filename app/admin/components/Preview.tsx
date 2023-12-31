import PdfViewer from "@/app/components/PdfViewer";
import { UnitMaterialType } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  link: string;
  type: UnitMaterialType;
}

const Preview = ({ link, type }: Props) => {
  return (
    <Flex className="w-full pb-10" gap={"4"} direction={"column"}>
      <Text className="text-xs text-slate-400">Preview</Text>
      {(!link || !type) && <Text>Fill Details to See Preview.</Text>}
      <Flex className="w-full">
        {type === "video" &&
          link !== "" &&
          ((link.includes("youtube") && (
            <iframe className="w-2/3 h-96 rounded-3xl" src={link}></iframe>
          )) || (
            <video controls src={link} className="rounded-3xl h-96"></video>
          ))}
        {type === "img" && link !== "" && (
          <img src={link} className="rounded-3xl h-96"></img>
        )}
        {type === "pdf" && link !== "" && <PdfViewer fileUrl={link} />}
      </Flex>
    </Flex>
  );
};

export default Preview;
