"use client";
import SearchBar from "@/app/components/SearchBar";
import usePagination from "@/app/hooks/usePagination";
import { Button, Flex, Select, Table } from "@radix-ui/themes";
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
import ClearFiltersButton from "../components/ClearFiltersButton";
import { Course } from "@prisma/client";
import { DateRangePicker } from "rsuite";
import { DateRange } from "react-date-range";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const BatchPage = () => {
  const [batches, setBatches] = useState<DetailedBatch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const getAllBatches = async () => {
    const res = await axios.get("/api/admin/batch", {
      params: {
        ...filters,
        dateRange: JSON.stringify(filters.dateRange),
      },
    });
    if (res.data.status) {
      setBatches(res.data.data);
    } else {
      toast.error("Server Error");
    }
  };

  const getAllCourses = async () => {
    const res = await axios.get("/api/admin/course");
    if (res.data.status) {
      setCourses(res.data.data);
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

  const [filters, setFilters] = useState({
    courseId: "",
    dateRange: [] as Date[] | null,
  });

  const resetFilters = () => {
    setFilters({
      courseId: "",
      dateRange: [],
    });
  };

  const customRenderValue = (value: Date[], formatString: string) => {
    if (value && value.length === 2) {
      return `${moment(value[0]).format("DD MMM, YYYY")} to ${moment(
        value[1]
      ).format("DD MMM, YYYY")}`;
    }
    return "";
  };

  useEffect(() => {
    getAllBatches();
    getAllCourses();
  }, [filters]);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Batches" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <Flex gap={"2"}>
              <DateRangePicker
                value={filters.dateRange as [Date, Date]}
                format="dd MMM, yyyy"
                onChange={(val) => setFilters({ ...filters, dateRange: val })}
                placeholder="Select Date Range"
                className="w-72"
                renderValue={customRenderValue}
                showOneCalendar
              />
              <Select.Root
                onValueChange={(val) =>
                  setFilters({ ...filters, courseId: val })
                }
                value={filters.courseId}
              >
                <Select.Trigger
                  className="w-96 focus:outline-none hover:outline-none"
                  placeholder="Select Course"
                  color="violet"
                  variant="soft"
                />
                <Select.Content position="popper">
                  {courses?.map((course) => (
                    <Select.Item value={course.id.toString()} key={course.id}>
                      {course.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <ClearFiltersButton
                filters={filters}
                resetFilters={resetFilters}
              />
              <AddNewButton link="/admin/batch/new" />
            </Flex>
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Course</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Divisions</Table.ColumnHeaderCell>
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
                  <Table.Cell>
                    <Flex className="p-1 shadow-md border w-fit rounded-full">
                      <Button
                        variant="soft"
                        onClick={() =>
                          router.push(`/admin/batch/${batch.id}/division`)
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

export default BatchPage;
