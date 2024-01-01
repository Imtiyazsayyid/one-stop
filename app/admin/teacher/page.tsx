"use client";
import SearchBar from "@/app/components/SearchBar";
import usePagination from "@/app/hooks/usePagination";
import { Avatar, Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddNewButton from "../components/AddNewButton";
import Card from "../components/Card";
import HeadingCard from "../components/HeadingCard";
import Pagination from "../components/Pagination";
import TableActions from "../components/TableActions";
import { DetailedTeacher } from "../interfaces";
import Loader from "@/app/components/Loader";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState<DetailedTeacher[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const getAllTeachers = async () => {
    setLoading(true);
    const res = await axios.get("/api/admin/teacher", {
      params: {
        searchText,
      },
    });
    if (res.data.status) {
      setTeachers(res.data.data);
    } else {
      toast.error("Server Error");
    }
    setLoading(false);
  };

  const {
    currentPage,
    currentItems: currentTeachers,
    setCurrentPage,
    totalPages,
  } = usePagination(teachers, 5);

  useEffect(() => {
    getAllTeachers();
  }, [searchText]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Teachers" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Teacher"
            />
            <AddNewButton link="/admin/teacher/new" />
          </Flex>
          <Loader isLoading={isLoading} />
          {!isLoading && (
            <>
              <Table.Root variant="surface" className="w-full h-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Profile</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Experience</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                    {/* <Table.ColumnHeaderCell>Semesters</Table.ColumnHeaderCell> */}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {teachers?.map((teacher, index) => (
                    <Table.Row key={index} align={"center"}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <Avatar
                          fallback={"?"}
                          src={teacher.user.profileImg || ""}
                          radius="full"
                          className="shadow-md border"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        {teacher.user.firstName + " " + teacher.user.lastName}
                      </Table.Cell>
                      <Table.Cell>{teacher.user.email}</Table.Cell>
                      <Table.Cell>{teacher.role.name}</Table.Cell>
                      <Table.Cell>
                        {teacher.experience
                          ? teacher.experience + " years"
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        <TableActions
                          editLink={`/admin/teacher/edit/${teacher.id}`}
                          viewLink={`/admin/teacher/view/${teacher.id}`}
                          deleteLink={`/api/admin/teacher/${teacher.id}`}
                          fetchData={getAllTeachers}
                        />
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

export default TeacherPage;
