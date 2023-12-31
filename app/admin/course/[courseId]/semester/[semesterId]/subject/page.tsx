"use client";
import AddNewButton from "@/app/admin/components/AddNewButton";
import Card from "@/app/admin/components/Card";
import ClearFiltersButton from "@/app/admin/components/ClearFiltersButton";
import HeadingCard from "@/app/admin/components/HeadingCard";
import Pagination from "@/app/admin/components/Pagination";
import TableActions from "@/app/admin/components/TableActions";
import SearchBar from "@/app/components/SearchBar";
import usePagination from "@/app/hooks/usePagination";
import { Subject, SubjectType } from "@prisma/client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Table } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    courseId: string;
    semesterId: string;
  };
}

interface Filters {
  subjectType: SubjectType | "";
}

const SubjectPage = ({ params }: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Filters>({
    subjectType: "",
  });
  const router = useRouter();

  const {
    currentPage,
    currentItems: currentSubjects,
    setCurrentPage,
    totalPages,
  } = usePagination(subjects, 8);

  const getAllSubjects = async () => {
    const res = await axios.get("/api/admin/subject", {
      params: {
        semesterId: params.semesterId,
        searchText,
        ...filters,
      },
    });
    if (res.data.status) {
      setSubjects(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  const resetFilters = () => {
    setFilters({
      subjectType: "",
    });
  };

  const subjectTypeMapper = {
    core_subject: "Core Subject",
    ability_enhancement_skill_course: "Ability Enhancement Skill Course",
    core_subject_practical: "Core Subject Practical",
    ability_enhancement_skill_practical: "Ability Enhancement Skill Practical",
  };

  useEffect(() => {
    getAllSubjects();
  }, [searchText, filters]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Subjects" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Subject"
            />
            <Flex gap={"2"}>
              <Select.Root
                value={filters.subjectType}
                onValueChange={(val) =>
                  setFilters({
                    ...filters,
                    subjectType: val as SubjectType,
                  })
                }
              >
                <Select.Trigger
                  className="w-72 focus:outline-none hover:outline-none"
                  placeholder="Select Subject Type"
                  color="violet"
                  variant="soft"
                />
                <Select.Content position="popper">
                  <Select.Item value="core_subject">Core Subject</Select.Item>
                  <Select.Item value="core_subject_practical">
                    Core Subject Practical
                  </Select.Item>
                  <Select.Item value="ability_enhancement_skill_course">
                    Ability Enhancement Skill Course
                  </Select.Item>
                  <Select.Item value="ability_enhancement_skill_practical">
                    Ability Enhancement Skill Practical
                  </Select.Item>
                </Select.Content>
              </Select.Root>
              <ClearFiltersButton
                filters={filters}
                resetFilters={resetFilters}
              />
              <AddNewButton
                link={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/new`}
              />
            </Flex>
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
                <Table.ColumnHeaderCell>Units</Table.ColumnHeaderCell>
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
                  <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        onClick={() =>
                          router.push(
                            `/admin/course/${params.courseId}/semester/${params.semesterId}/subject/${subject.id}/unit`
                          )
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
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SubjectPage;
