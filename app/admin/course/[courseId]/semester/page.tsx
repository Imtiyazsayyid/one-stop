"use client";
import { Button, Flex, Table } from "@radix-ui/themes";
import AddNewButton from "@/app/admin/components/AddNewButton";
import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import TableActions from "@/app/admin/components/TableActions";
import { useEffect, useState } from "react";
import { Semester } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  params: {
    courseId: string;
  };
}

const SemesterPage = ({ params }: Props) => {
  const [semesters, setSemesters] = useState<Semester[]>();

  const getAllSemesters = async () => {
    const res = await axios.get("/api/admin/semester", {
      params: {
        courseId: params.courseId,
      },
    });
    if (res.data.status) {
      setSemesters(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getAllSemesters();
  }, []);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Semesters" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <AddNewButton
              link={`/admin/course/${params.courseId}/semester/new`}
            />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Subjects</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {semesters?.map((semester, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>Semester {semester.semNumber}</Table.Cell>
                  <Table.Cell>{semester.duration} Months</Table.Cell>
                  <Table.Cell>
                    <TableActions
                      editLink={`/admin/course/${params.courseId}/semester/edit/${semester.id}`}
                      viewLink={`/admin/course/${params.courseId}/semester/view/${semester.id}`}
                      deleteLink={`/api/admin/semester/${semester.id}`}
                      fetchData={getAllSemesters}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        // onClick={() =>
                        //   router.push(`/admin/course/${course.id}/semester`)
                        // }
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

export default SemesterPage;
