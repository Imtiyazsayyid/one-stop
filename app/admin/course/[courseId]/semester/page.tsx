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
import { useRouter } from "next/navigation";
import usePagination from "@/app/hooks/usePagination";
import Pagination from "@/app/admin/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import Loader from "@/app/components/Loader";

interface Props {
  params: {
    courseId: string;
  };
}

const SemesterPage = ({ params }: Props) => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const {
    currentPage,
    currentItems: currentSemesters,
    setCurrentPage,
    totalPages,
  } = usePagination(semesters, 8);

  const getAllSemesters = async () => {
    setLoading(true);
    const res = await axios.get("/api/admin/semester", {
      params: {
        courseId: params.courseId,
        searchText,
      },
    });
    if (res.data.status) {
      setSemesters(res.data.data);
    } else {
      toast.error("Server Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllSemesters();
  }, [searchText]);

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
          <Loader isLoading={isLoading} />
          {!isLoading && (
            <>
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
                  {currentSemesters?.map((semester, index) => (
                    <Table.Row key={index} align={"center"}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>Semester {semester.semNumber}</Table.Cell>
                      <Table.Cell>{semester.duration} Months</Table.Cell>
                      <Table.Cell>
                        <TableActions
                          editLink={`/admin/course/${params.courseId}/semester/edit/${semester.id}`}
                          deleteLink={`/api/admin/semester/${semester.id}`}
                          fetchData={getAllSemesters}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Flex className="p-1 shadow-md border w-fit rounded-full">
                          <Button
                            variant="soft"
                            onClick={() =>
                              router.push(
                                `/admin/course/${params.courseId}/semester/${semester.id}/subject`
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
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SemesterPage;
