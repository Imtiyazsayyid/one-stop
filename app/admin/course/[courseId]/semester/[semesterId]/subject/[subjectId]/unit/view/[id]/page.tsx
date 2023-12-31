"use client";

import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import { DetailedUnit } from "@/app/admin/interfaces";
import { UnitMaterial } from "@prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}

const ViewUnitPage = ({ params }: Props) => {
  const [unit, setUnit] = useState<DetailedUnit>();
  const [imgUnitMaterial, setImgUnitMaterial] = useState<UnitMaterial[]>([]);
  const [videoUnitMaterial, setVideoUnitMaterial] = useState<UnitMaterial[]>(
    []
  );
  const [pdfUnitMaterial, setPdfUnitMaterial] = useState<UnitMaterial[]>([]);

  const organizeMaterial = (data: UnitMaterial[]) => {
    if (!data || data.length == 0) return;
    let imgUnitMaterialArr = [];
    let videoUnitMaterialArr = [];
    let pdfUnitMaterialArr = [];

    for (let item of data) {
      if (item.type == "img") {
        imgUnitMaterialArr.push(item);
      }
      if (item.type == "video") {
        videoUnitMaterialArr.push(item);
      }
      if (item.type == "pdf") {
        pdfUnitMaterialArr.push(item);
      }
    }

    setImgUnitMaterial(imgUnitMaterialArr);
    setVideoUnitMaterial(videoUnitMaterialArr);
    setPdfUnitMaterial(pdfUnitMaterialArr);
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const getUnit = async () => {
    try {
      const res = await axios.get(`/api/admin/unit/${params.id}`);
      if (!res.data.status) {
        toast.error(res.data.error);
        return;
      }
      setUnit(res.data.data);
      if (res.data.data.unitMaterial) {
        organizeMaterial(res.data.data.unitMaterial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnit();
  }, []);

  return (
    <Flex direction={"column"} className="w-full" gap={"2"}>
      <HeadingCard
        title={"Unit " + unit?.number + " - " + unit?.name || ""}
      ></HeadingCard>
      <Card className="h-full p-10 flex-col pt-20 pb-40 overflow-hidden overflow-y-scroll">
        <Flex direction={"column"} gap={"5"} align={"center"}>
          <Heading align={"center"}>
            Unit {unit?.number} - {unit?.name}
          </Heading>
          <Flex justify={"center"} mb={"9"} className="w-full">
            <Text className="text-center text-xs text-slate-500 w-2/3">
              {unit?.description}
            </Text>
          </Flex>
          {imgUnitMaterial.length > 0 && (
            <Flex
              className="w-4/5 h-72"
              direction={"column"}
              gap={"5"}
              align={"center"}
              mb={"5"}
            >
              <Heading size="3">Images</Heading>
              <Flex
                className="border h-full max-w-[1000px] p-3 overflow-hidden overflow-x-scroll rounded-lg bg-slate-50"
                gap={"2"}
              >
                {imgUnitMaterial.map((img) => (
                  <Flex
                    className="h-full min-w-[400px] w-[400px] rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => openLink(img.link)}
                    key={img.id}
                  >
                    <img
                      src={img.link}
                      className="w-full h-full object-cover"
                    />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}

          {videoUnitMaterial.length > 0 && (
            <Flex
              className="w-4/5 h-72"
              direction={"column"}
              align={"center"}
              gap={"5"}
              mb={"5"}
            >
              <Heading size="3">Videos</Heading>
              <Flex
                className="border h-full max-w-[1000px] p-3 overflow-hidden overflow-x-scroll rounded-lg bg-slate-50"
                gap={"2"}
              >
                {videoUnitMaterial.map((video) => (
                  <Flex
                    className="h-full min-w-[400px] w-[400px] rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => openLink(video.link)}
                    key={video.id}
                  >
                    {video.link.includes("youtube") ? (
                      <iframe
                        className="w-full h-full object-cover"
                        src={video.link}
                      ></iframe>
                    ) : (
                      <video
                        src={video.link}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
          {pdfUnitMaterial.length > 0 && (
            <Flex
              className="w-4/5 h-72"
              direction={"column"}
              gap={"5"}
              align={"center"}
            >
              <Heading size="3">PDFs</Heading>
              <Flex
                className="border h-full max-w-[1000px] p-3 overflow-hidden overflow-x-scroll rounded-lg bg-slate-50"
                gap={"2"}
              >
                {pdfUnitMaterial.map((pdf) => (
                  <Flex
                    className="h-full min-w-[300px] w-[300px] rounded-lg shadow-lg overflow-hidden border cursor-pointer"
                    direction={"column"}
                    onClick={() => openLink(pdf.link)}
                    key={pdf.id}
                  >
                    <img
                      src="https://play-lh.googleusercontent.com/LvJB3SJdelN1ZerrndNgRcDTcgKO49d1A63C5hNJP06rMvsGkei-lwV52eYZJmMknCwW"
                      className="w-full h-4/5 object-cover object-center"
                    />
                    <Flex className="h-1/5" justify={"center"} align={"center"}>
                      <Text className="text-center">{pdf.name}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default ViewUnitPage;
