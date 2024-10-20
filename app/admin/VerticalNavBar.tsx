"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaBookOpenReader } from "react-icons/fa6";
import { PiMedalFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { HiSquare2Stack } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { FaUserGraduate } from "react-icons/fa6";
import { LuSheet } from "react-icons/lu";

const Links = [
  {
    label: "Home",
    link: "/admin",
    icon: <IoHome className="text-xl " />,
  },
  {
    label: "Courses",
    link: "/admin/course",
    icon: <RiGraduationCapFill className="text-xl " />,
  },
  {
    label: "Teachers",
    link: "/admin/teacher",
    icon: <PiChalkboardTeacherFill className="text-xl " />,
  },
  {
    label: "Students",
    link: "/admin/student",
    icon: <FaUserGraduate className="text-lg" />,
  },
  {
    label: "Batches",
    link: "/admin/batch",
    icon: <HiSquare2Stack className="text-xl " />,
  },
  {
    label: "Attendance",
    link: "/admin/attendance",
    icon: <LuSheet className="text-lg " />,
  },
];

const VerticalNavBar = () => {
  const [isActive, setActive] = useState(true);

  if (!isActive)
    return (
      <Flex
        className="fixed top-5 left-[-25px] bg-[var(--violet-a11)] w-10 h-[4.5rem] rounded-lg shadow-md cursor-pointer"
        onClick={() => setActive(true)}
      ></Flex>
    );
  const handleClick = (link: string) => {
    router.push(link);
  };

  const currentPathName = usePathname();

  const router = useRouter();
  return (
    <Flex className="w-[350px]">
      <Cross1Icon className="relative left-[91%] top-5 cursor-pointer" onClick={() => setActive(false)} />
      <Flex className=" bg-white border shadow-lg rounded-lg w-full p-5" direction={"column"}>
        <Heading className="pt-6 pr-5 pl-5 " mt={"2"} mb={"6"}>
          Vidyalankar School of Information Technology
        </Heading>
        {Links.map(({ link, label, icon }) => (
          <Flex
            key={link}
            onClick={() => handleClick(link)}
            className={`h-16 rounded-none hover:shadow-md pl-5 hover:rounded-xl cursor-pointer ${
              link === currentPathName && "bg-[var(--violet-a11)] text-white rounded-xl"
            }`}
            align={"center"}
          >
            <Flex className="w-5 mr-3">{icon}</Flex>
            <Text>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default VerticalNavBar;
