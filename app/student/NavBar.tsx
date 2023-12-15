"use client";
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiPirateHook } from "react-icons/gi";
import checkStudentAuth from "./helpers/check-auth";
import { signOut, useSession } from "next-auth/react";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { IoLogOutOutline } from "react-icons/io5";
import { Student } from "@prisma/client";
import axios from "axios";

const Links = [{ label: "Subjects", link: "/student/subjects" }];

const NavBar = () => {
  const [student, setStudent] = useState<Student>();

  const { status, data } = useSession();

  const getStudent = async () => {
    if (data?.user.id) {
      const res = await axios.get("/api/student", {
        params: {
          id: data?.user.id,
        },
      });

      setStudent(res.data.data[0]);
    }
  };

  useEffect(() => {
    getStudent();
  }, [data]);

  checkStudentAuth();
  return (
    <Flex className="border-b bg-white py-4">
      <Container>
        <Flex justify={"end"}>
          {/* <Flex className="w-1/5" align={"center"} justify={"center"}></Flex> */}
          {/* <Flex className="w-3/5" align={"center"} justify={"center"} gap={"9"}>
            {Links.map(({ label, link }) => (
              <Link
                href={link}
                className="hover:text-[var(--violet-a11)]"
                key={link}
              >
                {label}
              </Link>
            ))}
          </Flex> */}
          <Flex className="w-1/5" align={"center"} gap={"2"}>
            <Flex direction={"column"} justify={"end"} align={"end"}>
              <Heading size={"2"}>{student?.name}</Heading>
              <Text size="1" className="text-xs text-slate-500">
                Student
              </Text>
            </Flex>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex>
                  <Avatar
                    fallback={student?.name[0] || "?"}
                    radius="full"
                    className="cursor-pointer"
                  />
                </Flex>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Flex gap={"2"} align={"center"}>
                    <GearIcon /> Settings
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Flex gap={"2"} align={"center"}>
                    <PersonIcon /> Profile
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => signOut()}>
                  <Flex gap={"2"} align={"center"}>
                    <IoLogOutOutline /> Logout
                  </Flex>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default NavBar;
