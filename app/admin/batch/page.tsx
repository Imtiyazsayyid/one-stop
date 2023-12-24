"use client";
import SearchBar from "@/app/components/SearchBar";
import usePagination from "@/app/hooks/usePagination";
import { Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddNewButton from "../components/AddNewButton";
import Card from "../components/Card";
import HeadingCard from "../components/HeadingCard";
import Pagination from "../components/Pagination";
import TableActions from "../components/TableActions";
import { DetailedBatch } from "../interfaces";

const BatchPage = () => {
  const [batches, setBatches] = useState<DetailedBatch[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const getAllBatches = async () => {
    const res = await axios.get("/api/admin/batch", {
      params: {
        searchText,
      },
    });
    if (res.data.status) {
      setBatches(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  const {
    currentPage,
    currentItems: currentBatches,
    setCurrentPage,
    totalPages,
  } = usePagination(batches, 5);

  useEffect(() => {
    getAllBatches();
  }, [searchText]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Batches" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Batch"
            />
            <AddNewButton link="/admin/batch/new" />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Course</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {batches?.map((batch, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{batch.course.name}</Table.Cell>
                  <Table.Cell>
                    {moment(batch.fromDate).format("MMM YYYY")} -{" "}
                    {moment(batch.toDate).format("MMM YYYY")}
                  </Table.Cell>

                  <Table.Cell>
                    <TableActions
                      editLink={`/admin/batch/edit/${batch.id}`}
                      viewLink={`/admin/batch/view/${batch.id}`}
                      deleteLink={`/api/admin/batch/${batch.id}`}
                      fetchData={getAllBatches}
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

export default BatchPage;
