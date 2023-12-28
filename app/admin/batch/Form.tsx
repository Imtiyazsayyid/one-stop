"use client";

import { batchSchema } from "@/app/validationSchemas";
import { Course, Semester } from "@prisma/client";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckPicker, DatePicker } from "rsuite";

interface Props {
  id?: number;
  fromDate?: string;
  toDate?: string;
  courseId?: number;
  semestersProp?: number[];
}

const Form = ({ id, fromDate, toDate, courseId, semestersProp }: Props) => {
  useEffect(() => {
    setBatchDetails({
      fromDate: fromDate || "",
      toDate: toDate || "",
      courseId: courseId || null,
      semesters: semestersProp || [],
    });

    if (courseId) {
      getAllSemesters(courseId.toString());
    }
  }, [fromDate, toDate, courseId]);

  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const getAllCourses = async () => {
    const res = await axios.get("/api/admin/course");
    setCourses(res.data.data);
  };

  const getAllSemesters = async (courseId: string) => {
    const res = await axios.get("/api/admin/semester", {
      params: {
        courseId,
      },
    });
    setSemesters(res.data.data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const [errors, setErrors] = useState({
    fromDate: "",
    toDate: "",
    courseId: "",
  });

  const [batchDetails, setBatchDetails] = useState({
    fromDate: "",
    toDate: "",
    courseId: null as number | null,
    semesters: [] as number[],
  });

  const handleSave = async () => {
    setErrors(() => ({
      fromDate: "",
      toDate: "",
      courseId: "",
    }));

    const validation = batchSchema.safeParse(batchDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.post("/api/admin/batch", {
      ...batchDetails,
    });

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/batch");
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      fromDate: "",
      toDate: "",
      courseId: "",
    }));

    const validation = batchSchema.safeParse(batchDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }
    const res = await axios.put(`/api/admin/batch/${id}`, {
      ...batchDetails,
    });

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/batch");
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* course name */}
        <Flex className="w-1/3" gap={"2"} align={"end"}>
          <Flex gap={"1"} direction={"column"} className="w-1/2">
            <Text className="text-xs text-slate-400">From</Text>
            <Text className="text-xs text-red-400">{errors.fromDate}</Text>
            <Flex className="w-full">
              <DatePicker
                format="MM/yyyy"
                oneTap
                className="w-full"
                placeholder="MM/YYYY"
                value={
                  batchDetails.fromDate
                    ? moment(batchDetails.fromDate).toDate()
                    : null
                }
                onChange={(val) =>
                  setBatchDetails({
                    ...batchDetails,
                    fromDate: (val && new Date(val).toString()) || "",
                  })
                }
              />
            </Flex>
          </Flex>

          <Flex gap={"1"} direction={"column"} className="w-1/2">
            <Text className="text-xs text-slate-400">To</Text>
            <Text className="text-xs text-red-400">{errors.toDate}</Text>

            <Flex className="w-full">
              <DatePicker
                oneTap
                format="MM/yyyy"
                className="w-full"
                placeholder="MM/YYYY"
                value={
                  batchDetails.toDate
                    ? moment(batchDetails.toDate).toDate()
                    : null
                }
                onChange={(val) =>
                  setBatchDetails({
                    ...batchDetails,
                    toDate: (val && new Date(val).toString()) || "",
                  })
                }
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Course */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Course</Text>
          <Text className="text-xs text-red-400">{errors.courseId}</Text>
          <Select.Root
            value={batchDetails.courseId?.toString()}
            onValueChange={(val) => {
              setBatchDetails({
                ...batchDetails,
                courseId: parseInt(val),
              });
              getAllSemesters(val);
            }}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              {courses.map((course) => (
                <Select.Item value={course.id.toString()} key={course.id}>
                  {course.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        {/* Semesters */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Semesters</Text>
          <CheckPicker
            disabled={batchDetails.courseId ? false : true}
            onChange={(val) => {
              setBatchDetails({ ...batchDetails, semesters: val });
              // getSubjectsBySemester(val);
            }}
            value={batchDetails.semesters}
            data={
              (semesters &&
                semesters?.length > 0 &&
                semesters?.map((semester) => ({
                  label: "Semester " + semester.semNumber,
                  value: semester.id,
                }))) ||
              []
            }
          />
        </Flex>
      </Flex>
      {/* <Flex className="w-full" direction={"column"} gap={"2"}>
        <Text className="text-xs text-slate-400">Semesters</Text>
        <Flex
          className="border w-full p-2 bg-slate-50 h-[50vh] overflow-y-scroll"
          gap={"2"}
          direction={"column"}
        >
          {subjects.map((subject) => (
            <Flex
              key={subject.id}
              className="w-full min-h-[5rem] shadow-md border rounded-lg px-5 bg-white"
              align={"center"}
              justify={"between"}
            >
              <Text className="w-1/2">{subject.name}</Text>
              <Text className="text-xs text-slate-400 w-1/4">
                Semester {subject.semester.semNumber}
              </Text>
              <Select.Root
                onValueChange={(val) => {
                  addOrUpdateSubjectTeacherMap(val, subject);
                }}
                value={getValueFromSubjectTeacherMapBySubjectId(subject.id)}
              >
                <Select.Trigger className="w-96" />
                <Select.Content position="popper">
                  {teacher.map((teacher) => (
                    <Select.Item value={teacher.id.toString()} key={teacher.id}>
                      {teacher.user.firstName} {teacher.user.lastName}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          ))}
        </Flex>
      </Flex> */}

      <Flex justify={"center"} mt={"9"}>
        <Flex className="w-1/3" mb={"9"} gap={"2"}>
          {!id && (
            <Button onClick={() => handleSave()} className="w-1/2">
              Save
            </Button>
          )}

          {id && (
            <Button onClick={() => handleUpdate()} className="w-1/2">
              Save Changes
            </Button>
          )}
          <Button onClick={() => router.back()} className="w-1/2" color="red">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
