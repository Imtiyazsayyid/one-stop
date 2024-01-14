"use client";

import { DashIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Table, TextField } from "@radix-ui/themes";
import { DateRangePicker, TagPicker } from "rsuite";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Semester, Subject } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  divisionId: number;
  courseId: number;
}

const TimeTableBuilder = ({ divisionId, courseId }: Props) => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentSemesterId, setCurrentSemesterId] = useState<number>();
  const router = useRouter();
  const [subjectsByTime, setSubjectsByTime] = useState([
    {
      id: 1,
      timing: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  ]);

  const getCurrentTimeTable = async () => {
    const res = await axios.get("/api/admin/timetable", {
      params: {
        divisionId,
      },
    });

    setSubjectsByTime(res.data.data);
    getSelectedDaysOfWeek(res.data.data);
  };

  const getAllSemesters = async () => {
    const res = await axios.get("/api/admin/semester", {
      params: {
        courseId,
      },
    });

    setSemesters(res.data.data);
    setCurrentSemesterId(res.data.data[0].id);
    getSubjects(res.data.data[0].id);
  };

  const getSubjects = async (semesterId: number) => {
    const res = await axios.get("/api/admin/subject", {
      params: {
        semesterId: semesterId,
      },
    });

    setSubjects(res.data.data);
  };

  const resetSubjectsByTime = () => {
    setSubjectsByTime([
      {
        id: 1,
        timing: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    ]);
  };

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getSelectedDaysOfWeek = (subjectsByTime: any[]) => {
    let selectedDays = [];
    if (subjectsByTime.length > 0) {
      subjectsByTime[0].monday && selectedDays.push("Monday");
      subjectsByTime[0].tuesday && selectedDays.push("Tuesday");
      subjectsByTime[0].wednesday && selectedDays.push("Wednesday");
      subjectsByTime[0].thursday && selectedDays.push("Thursday");
      subjectsByTime[0].friday && selectedDays.push("Friday");
      subjectsByTime[0].saturday && selectedDays.push("Saturday");
      subjectsByTime[0].sunday && selectedDays.push("Sunday");
    } else {
      selectedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    }
    setSelectedDaysOfWeek(selectedDays);
  };

  const [selectedDaysOfTheWeek, setSelectedDaysOfWeek] = useState<String[]>([]);

  const addNewSubjectsByTime = () => {
    setSubjectsByTime([
      ...subjectsByTime,
      {
        id:
          subjectsByTime.length > 0
            ? subjectsByTime[subjectsByTime.length - 1].id + 1
            : 1,
        timing: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    ]);
  };

  const removeSubjectByTime = (id: number) => {
    const updatedSubjectsByTime = subjectsByTime.filter((sub) => sub.id !== id);
    setSubjectsByTime(updatedSubjectsByTime);
  };

  const addSelectedDay = (newSelectedDaysOfTheWeek: string[]) => {
    const sortedSelectedDays = daysOfTheWeek.filter((day) =>
      newSelectedDaysOfTheWeek.includes(day)
    );

    const updatedSortedSelectedDays = subjectsByTime.map((sub) => ({
      ...sub,
      id: sub.id,
      monday: sortedSelectedDays.includes("Monday") ? sub.monday : "",
      tuesday: sortedSelectedDays.includes("Tuesday") ? sub.tuesday : "",
      wednesday: sortedSelectedDays.includes("Wednesday") ? sub.wednesday : "",
      thursday: sortedSelectedDays.includes("Thursday") ? sub.thursday : "",
      friday: sortedSelectedDays.includes("Friday") ? sub.friday : "",
      saturday: sortedSelectedDays.includes("Saturday") ? sub.saturday : "",
      sunday: sortedSelectedDays.includes("Sunday") ? sub.sunday : "",
    }));

    setSelectedDaysOfWeek(sortedSelectedDays);
    setSubjectsByTime(updatedSortedSelectedDays);
  };

  const handleTimeChangeForSubject = (id: number, timing: string) => {
    const updatedSubjectsByTime = subjectsByTime.map((sub) =>
      sub.id === id
        ? {
            ...sub,
            timing,
          }
        : sub
    );
    setSubjectsByTime(updatedSubjectsByTime);
  };

  const handleSubjectChangeByDay = (id: number, day: string, value: string) => {
    const updatedSubjectsByTime = subjectsByTime.map((sub) =>
      sub.id === id
        ? {
            ...sub,
            [day.toLowerCase()]: value,
          }
        : sub
    );
    setSubjectsByTime(updatedSubjectsByTime);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/admin/timetable", {
        subjectsByTime: subjectsByTime.map((sub) => ({ ...sub, divisionId })),
        divisionId,
      });

      if (res.data.status) {
        toast.success("Time Table Saved Successfully");
        router.back();
      }
    } catch (error) {
      toast.error("Some Error has occured.");
    }
  };

  function printData() {
    var divToPrint = document.getElementById("printTable");
    let newWin = window.open("");
    newWin?.document.write(divToPrint?.outerHTML || "");
    newWin?.document.close();
    newWin?.print();
    //newWin.close();
  }

  useEffect(() => {
    getAllSemesters();
    getCurrentTimeTable();
  }, []);

  return (
    <Flex
      className="border w-full h-fit rounded-3xl shadow-lg bg-white"
      align={"center"}
      direction={"column"}
      p={"6"}
    >
      <Flex
        py={"4"}
        justify={"end"}
        align={"center"}
        className="w-full"
        gap={"3"}
      >
        <TagPicker
          value={selectedDaysOfTheWeek}
          onChange={(val) => addSelectedDay(val)}
          data={daysOfTheWeek.map((day) => ({ label: day, value: day }))}
          className="w-full"
        />
        <Select.Root
          onValueChange={(val) => {
            setCurrentSemesterId(parseInt(val));
            getSubjects(parseInt(val));
            resetSubjectsByTime();
          }}
          value={currentSemesterId?.toString()}
        >
          <Select.Trigger variant="soft" className="h-full w-52" />
          <Select.Content position="popper">
            {semesters?.map((sem, index) => (
              <Select.Item key={index} value={sem.id.toString()}>
                Semester {sem.semNumber}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Button onClick={addNewSubjectsByTime}>
          <PlusIcon />
          Add New Time Slot
        </Button>
      </Flex>
      <Table.Root
        variant="surface"
        className="w-full rounded-none"
        id="printTable"
      >
        <Table.Header className="rounded-none ">
          <Table.Row align={"center"}>
            <Table.ColumnHeaderCell
              className="border"
              style={{ minWidth: "200px" }}
              align="center"
            >
              Timing
            </Table.ColumnHeaderCell>
            {selectedDaysOfTheWeek.map((day, index) => (
              <Table.ColumnHeaderCell
                key={index}
                className={"border"}
                style={{ width: `calc(100%/${selectedDaysOfTheWeek.length})` }}
                align="center"
              >
                {day}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell className="border" align="center">
              Delete
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {subjectsByTime.map((sub, index) => (
            <Table.Row key={index}>
              <Table.RowHeaderCell className="border" p={"2"} align="center">
                <DateRangePicker
                  size="sm"
                  className="w-full"
                  ranges={[]}
                  cleanable={false}
                  format="HH:mm"
                  placeholder="HH:MM-HH:MM"
                  character="-"
                  value={
                    sub.timing.split("-").map((time) => {
                      const [hours, minutes] = time.split(":");
                      const date = new Date();
                      date.setHours(parseInt(hours, 10));
                      date.setMinutes(parseInt(minutes, 10));
                      return date;
                    }) as [Date, Date]
                  }
                  onChange={(val) => {
                    if (val && val[0] && val[1]) {
                      const timeRange = val
                        .map((date) => {
                          const hours = date
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          return `${hours}:${minutes}`;
                        })
                        .join("-");
                      handleTimeChangeForSubject(sub.id, timeRange);
                    }
                  }}
                />
                {/* <TextField.Root className="h-full">
                  <TextField.Input
                    placeholder=""
                    className="outline-none"
                    radius="large"
                    variant="soft"
                    color="blue"
                    value={sub.timing}
                    onChange={(e) =>
                      handleTimeChangeForSubject(sub.id, e.target.value)
                    }
                  />
                </TextField.Root> */}

                {/* {sub.timing} */}
              </Table.RowHeaderCell>
              {selectedDaysOfTheWeek.includes("Monday") && (
                <Table.Cell
                  className="border"
                  align="center"
                  justify={"center"}
                  p={"2"}
                >
                  <Select.Root
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.monday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Monday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}
              {selectedDaysOfTheWeek.includes("Tuesday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.tuesday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Tuesday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}
              {selectedDaysOfTheWeek.includes("Wednesday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.wednesday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Wednesday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}
              {selectedDaysOfTheWeek.includes("Thursday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.thursday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Thursday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}
              {selectedDaysOfTheWeek.includes("Friday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.friday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Friday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}
              {selectedDaysOfTheWeek.includes("Saturday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.saturday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Saturday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}

              {selectedDaysOfTheWeek.includes("Sunday") && (
                <Table.Cell align="center" className="border" p={"2"}>
                  <Select.Root
                    defaultValue="apple"
                    value={subjectsByTime
                      .find((subject) => subject.id === sub.id)
                      ?.sunday.toString()}
                    onValueChange={(val) =>
                      handleSubjectChangeByDay(sub.id, "Sunday", val)
                    }
                  >
                    <Select.Trigger variant="soft" className="w-full h-full" />
                    <Select.Content position="popper">
                      {subjects.map((subject, index) => (
                        <Select.Item key={index} value={subject.id.toString()}>
                          {subject.abbr}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}

              <Table.Cell
                className="border"
                align="center"
                justify={"center"}
                p={"2"}
              >
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => removeSubjectByTime(sub.id)}
                >
                  <TrashIcon />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify={"center"} pt={"9"} gap={"2"} className="w-full">
        <Button color="red" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="w-1/4" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Flex>
    </Flex>
  );
};

export default TimeTableBuilder;
