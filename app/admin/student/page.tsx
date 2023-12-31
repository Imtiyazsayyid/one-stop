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
import { DetailedStudent } from "../interfaces";

const StudentPage = () => {
  const [students, setStudents] = useState<DetailedStudent[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const getAllStudents = async () => {
    const res = await axios.get("/api/admin/student", {
      params: {
        searchText,
      },
    });
    if (res.data.status) {
      setStudents(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  const {
    currentPage,
    currentItems: currentStudents,
    setCurrentPage,
    totalPages,
  } = usePagination(students, 5);

  useEffect(() => {
    getAllStudents();
  }, [searchText]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Students" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Student"
            />
            <AddNewButton link="/admin/student/new" />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Profile</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                {/* <Table.ColumnHeaderCell>Semesters</Table.ColumnHeaderCell> */}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {students?.map((student, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Avatar
                      fallback={"?"}
                      src={student.user.profileImg || ""}
                      radius="full"
                      className="shadow-md border"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {student.user.firstName + " " + student.user.lastName}
                  </Table.Cell>
                  <Table.Cell>{student.user.email}</Table.Cell>
                  <Table.Cell>
                    <TableActions
                      editLink={`/admin/student/edit/${student.id}`}
                      viewLink={`/admin/student/view/${student.id}`}
                      deleteLink={`/api/admin/student/${student.id}`}
                      fetchData={getAllStudents}
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
        </Flex>
      </Card>
    </Flex>
  );
};

export default StudentPage;
