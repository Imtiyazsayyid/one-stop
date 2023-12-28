"use client";
import Card from "@/app/admin/components/Card";
import HeadingCard from "@/app/admin/components/HeadingCard";
import Pagination from "@/app/admin/components/Pagination";
import TableActions from "@/app/admin/components/TableActions";
import usePagination from "@/app/hooks/usePagination";
import { Division } from "@prisma/client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewForm from "./NewForm";
import EditForm from "./EditForm";

interface Props {
  params: {
    batchId: string;
  };
}

const DivisionPage = ({ params }: Props) => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const {
    currentPage,
    currentItems: currentDivisions,
    setCurrentPage,
    totalPages,
  } = usePagination(divisions, 8);

  const getAllDivisions = async () => {
    const res = await axios.get("/api/admin/division", {
      params: {
        batchId: params.batchId,
        searchText,
      },
    });
    if (res.data.status) {
      setDivisions(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getAllDivisions();
  }, [searchText]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Divisions" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <NewForm
              batchId={parseInt(params.batchId)}
              fetchData={getAllDivisions}
            />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  Subjects And Teachers
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {currentDivisions?.map((division, index) => (
                <Table.Row key={index} align={"center"}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>Division {division.name}</Table.Cell>
                  <Table.Cell>
                    <TableActions
                      editModal={
                        <EditForm
                          divisionName={division.name}
                          divisionId={division.id}
                          batchId={parseInt(params.batchId)}
                          fetchData={getAllDivisions}
                        />
                      }
                      deleteLink={`/api/admin/division/${division.id}`}
                      fetchData={getAllDivisions}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        onClick={() =>
                          router.push(
                            `/admin/batch/${params.batchId}/division/${division.id}/subject-teacher`
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

export default DivisionPage;
