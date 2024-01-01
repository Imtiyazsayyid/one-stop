"use client";
import AddNewButton from "@/app/admin/components/AddNewButton";
import Card from "@/app/admin/components/Card";
import ClearFiltersButton from "@/app/admin/components/ClearFiltersButton";
import HeadingCard from "@/app/admin/components/HeadingCard";
import Pagination from "@/app/admin/components/Pagination";
import TableActions from "@/app/admin/components/TableActions";
import Loader from "@/app/components/Loader";
import SearchBar from "@/app/components/SearchBar";
import usePagination from "@/app/hooks/usePagination";
import { Unit } from "@prisma/client";
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
    subjectId: string;
  };
}

const UnitPage = ({ params }: Props) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const {
    currentPage,
    currentItems: currentUnits,
    setCurrentPage,
    totalPages,
  } = usePagination(units, 8);

  const getAllUnits = async () => {
    setLoading(true);
    const res = await axios.get("/api/admin/unit", {
      params: {
        subjectId: params.subjectId,
        searchText,
      },
    });
    if (res.data.status) {
      setUnits(res.data.data);
    } else {
      toast.error("Server Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUnits();
  }, [searchText]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Units" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"between"}>
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Find Unit"
            />
            <AddNewButton
              link={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/${params.subjectId}/unit/new`}
            />
          </Flex>
          {<Loader isLoading={isLoading} />}
          {!isLoading && (
            <>
              <Table.Root variant="surface" className="w-full h-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {currentUnits?.map((unit, index) => (
                    <Table.Row key={index} align={"center"}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>Unit {unit.number}</Table.Cell>
                      <Table.Cell>{unit.name}</Table.Cell>
                      <Table.Cell>
                        <TableActions
                          editLink={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/${params.subjectId}/unit/edit/${unit.id}`}
                          viewLink={`/admin/course/${params.courseId}/semester/${params.semesterId}/subject/${params.subjectId}/unit/view/${unit.id}`}
                          deleteLink={`/api/admin/unit/${unit.id}`}
                          fetchData={getAllUnits}
                        />
                      </Table.Cell>
                      {/* <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        onClick={() =>
                          router.push(
                            `/admin/course/${params.courseId}/semester/${params.semesterId}/subject/${params.subjectId}`
                          )
                        }
                        radius="full"
                        color="green"
                      >
                        <ArrowRightIcon />
                      </Button>
                    </Flex>
                  </Table.Cell> */}
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

export default UnitPage;
