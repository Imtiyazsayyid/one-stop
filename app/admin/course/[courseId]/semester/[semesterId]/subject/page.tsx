"use client";
import AddNewButton from "@/app/admin/components/AddNewButton";
import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import Pagination from "@/app/admin/components/Pagination";
import TableActions from "@/app/admin/components/TableActions";
import usePagination from "@/app/hooks/usePagination";
import { Subject } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    courseId: string;
    semesterId: string;
  };
}

const SubjectPage = ({ params }: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const {
    currentPage,
    currentItems: currentSubjects,
    setCurrentPage,
    totalPages,
  } = usePagination(subjects, 5);

  const getAllSubjects = async () => {
    const res = await axios.get("/api/admin/subject", {
      params: {
        semesterId: params.semesterId,
      },
    });
    if (res.data.status) {
      setSubjects(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  const subjectTypeMapper = {
    core_subject: "Core Subject",
    ability_enhancement_skill_course: "Ability Enhancement Skill Course",
    core_subject_practical: "Core Subject Practical",
    ability_enhancement_skill_practical: "Ability Enhancement Skill Practical",
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Subjects" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <AddNewButton
              link={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/new`}
            />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Abbreviation</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Subject Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {currentSubjects?.map((subject, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{subject.name}</Table.Cell>
                  <Table.Cell>{subject.abbr}</Table.Cell>
                  <Table.Cell>{subject.code}</Table.Cell>
                  <Table.Cell>
                    {subjectTypeMapper[subject?.subjectType || "core_subject"]}
                  </Table.Cell>
                  <Table.Cell>
                    <TableActions
                      editLink={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/edit/${subject.id}`}
                      viewLink={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/view/${subject.id}`}
                      deleteLink={`/api/admin/subject/${subject.id}`}
                      fetchData={getAllSubjects}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default SubjectPage;
