"use client";
import { Button, Flex, Table } from "@radix-ui/themes";
import AddNewButton from "../components/AddNewButton";
import Card from "../components/Card";
import HeadingCard from "../components/HeadingCard";
import TableActions from "../components/TableActions";
import { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>();
  const router = useRouter();

  const getAllCourses = async () => {
    const res = await axios.get("/api/admin/course");
    if (res.data.status) {
      setCourses(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Courses" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <AddNewButton link="/admin/course/new" />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Abbreviation</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Semesters</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {courses?.map((course, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{course.name}</Table.Cell>
                  <Table.Cell>{course.abbr}</Table.Cell>
                  <Table.Cell>{course.duration} years</Table.Cell>
                  <Table.Cell>
                    <TableActions
                      editLink={`/admin/course/edit/${course.id}`}
                      viewLink={`/admin/course/view/${course.id}`}
                      deleteLink={`/api/admin/course/${course.id}`}
                      fetchData={getAllCourses}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        onClick={() =>
                          router.push(`/admin/course/${course.id}/semester`)
                        }
                        radius="full"
                        color="green"
                      >
                        <ArrowRightIcon />
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Card>
    </Flex>
  );
};

export default CoursePage;
