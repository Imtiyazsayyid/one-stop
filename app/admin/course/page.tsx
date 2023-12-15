import { Button, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import HeadingCard from "../components/HeadingCard";
import Card from "../components/Card";
import TableActions from "../components/TableActions";
import { PlusIcon } from "@radix-ui/react-icons";
import AddNewButton from "../components/AddNewButton";

const CoursePage = () => {
  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <HeadingCard title="Courses" />
      <Card className="h-full">
        <Flex direction={"column"} className="w-full h-full" gap={"2"}>
          <Flex justify={"end"}>
            <AddNewButton link="/admin/course/new" />
          </Flex>
          <Table.Root variant="surface" className="w-full h-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                <Table.Cell>danilo@example.com</Table.Cell>
                <Table.Cell>
                  <TableActions
                    editLink="/admin/course/edit"
                    viewLink="/admin/course/view"
                    deleteLink="/api/admin/course/%{id}"
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Flex>
      </Card>
    </Flex>
  );
};

export default CoursePage;
