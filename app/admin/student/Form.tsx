"use client";

import { studentSchema } from "@/app/validationSchemas";
import {
  Avatar,
  Button,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/ReactQuillStyle.css";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Batch, Course, Division, Gender } from "@prisma/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import moment from "moment";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: Gender | "";
  profileImg?: string | "";
  courseId?: number;
  batchId?: number;
  divisionId?: number;
}

const Form = ({
  id,
  userId,
  firstName,
  lastName,
  email,
  password,
  profileImg,
  gender,
  courseId,
  batchId,
  divisionId,
}: Props) => {
  const router = useRouter();

  const [studentDetails, setStudentDetails] = useState({
    userTypeId: 2,
    userId: null as number | null,
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: password || "",
    gender: gender || "",
    profileImg: profileImg || "",
    courseId: null as number | null,
    batchId: null as number | null,
    divisionId: null as number | null,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    courseId: "",
    batchId: "",
    divisionId: "",
  });

  useEffect(() => {
    setStudentDetails({
      userTypeId: 1,
      userId: userId || null,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      profileImg: profileImg || "",
      gender: gender || "",
      courseId: courseId || null,
      batchId: batchId || null,
      divisionId: divisionId || null,
    });

    getAllCourses();
  }, [
    userId,
    firstName,
    lastName,
    email,
    password,
    gender,
    profileImg,
    courseId,
    batchId,
    divisionId,
  ]);

  const handleSave = async () => {
    setErrors(() => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      courseId: "",
      batchId: "",
      divisionId: "",
    }));

    const validation = studentSchema.safeParse(studentDetails);

    if (!validation.success) {
      console.log(validation.error.errors);
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.post("/api/admin/student", studentDetails);

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/student");
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      courseId: "",
      batchId: "",
      divisionId: "",
    }));

    const validation = studentSchema.safeParse(studentDetails);

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

    const res = await axios.put(`/api/admin/student/${id}`, studentDetails);

    if (!res.data.status) {
      toast.error("Failed To Save Changes");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/student");
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);

  const getAllCourses = async () => {
    try {
      const res = await axios.get("/api/admin/course");
      setCourses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBatches = async (courseId: number | string) => {
    try {
      const res = await axios.get("/api/admin/batch", {
        params: {
          courseId,
        },
      });
      setBatches(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDivisions = async (batchId: number | string) => {
    try {
      const res = await axios.get("/api/admin/division", {
        params: {
          batchId,
        },
      });
      setDivisions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (studentDetails.courseId) {
      getAllBatches(studentDetails.courseId);
    }
  }, [studentDetails.courseId]);

  useEffect(() => {
    if (studentDetails.batchId) {
      getAllDivisions(studentDetails.batchId);
    }
  }, [studentDetails.batchId]);

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        <Flex className="w-full" justify={"center"} gap={"1"}>
          <Flex className="w-40">
            <CldUploadWidget
              options={{
                sources: ["local", "url"],
                multiple: false,
                cropping: true,
                styles: {
                  palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#0433ff",
                    action: "#339933",
                    inProgress: "#0433ff",
                    complete: "#339933",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd",
                  },
                  fonts: {
                    default: null,
                    "sans-serif": {
                      url: null,
                      active: true,
                    },
                  },
                },
              }}
              uploadPreset="oekh1dfb"
              onUpload={(result) => {
                if (result.event !== "success") return;
                const info = result.info as CloudinaryResult;
                setStudentDetails({
                  ...studentDetails,
                  profileImg: info.url,
                });
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => {
                    open();
                  }}
                >
                  <Avatar
                    fallback={"?"}
                    radius="full"
                    size={"9"}
                    mb={"9"}
                    src={studentDetails.profileImg}
                    className="cursor-pointer"
                  />
                </button>
              )}
            </CldUploadWidget>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* student first name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">First Name</Text>
          <Text className="text-xs text-red-400">{errors.firstName}</Text>
          <TextField.Root>
            <TextField.Input
              value={studentDetails.firstName}
              size={"2"}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  firstName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* student last name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Last Name</Text>
          <Text className="text-xs text-red-400">{errors.lastName}</Text>
          <TextField.Root>
            <TextField.Input
              value={studentDetails.lastName}
              size={"2"}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  lastName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Student email */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Email</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <TextField.Root>
            <TextField.Input
              value={studentDetails.email}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  email: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* student password*/}
        <Flex direction={"column"} className="w-1/2" gap={"1"}>
          <Text className="text-xs text-slate-400">Password</Text>
          <Text className="text-xs text-red-400">{errors.password}</Text>
          <TextField.Root>
            <TextField.Input
              value={studentDetails.password}
              size={"2"}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  password: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* student gender */}
        <Flex className="w-1/2" gap={"2"} align={"end"}>
          <Flex direction={"column"} className="w-full" gap={"1"}>
            <Text className="text-xs text-slate-400">Gender</Text>
            <Text className="text-xs text-red-400">{errors.gender}</Text>
            <Select.Root
              value={studentDetails.gender || undefined}
              onValueChange={(val) =>
                setStudentDetails({
                  ...studentDetails,
                  gender: val,
                })
              }
            >
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value={"male"}>Male</Select.Item>
                <Select.Item value={"female"}>Female</Select.Item>
                <Select.Item value={"other"}>Other</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>
      </Flex>

      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* course */}
        <Flex className="w-1/3" gap={"2"} align={"end"}>
          <Flex direction={"column"} className="w-full" gap={"1"}>
            <Text className="text-xs text-slate-400">Course</Text>
            <Text className="text-xs text-red-400">{errors.courseId}</Text>
            <Select.Root
              value={studentDetails.courseId?.toString() || undefined}
              onValueChange={(val) =>
                setStudentDetails({
                  ...studentDetails,
                  courseId: parseInt(val),
                })
              }
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
        </Flex>

        {/* Batch */}
        <Flex className="w-1/3" gap={"2"} align={"end"}>
          <Flex direction={"column"} className="w-full" gap={"1"}>
            <Text className="text-xs text-slate-400">Batch</Text>
            {!studentDetails.courseId && (
              <Text className="text-xs text-[var(--violet-11)]">
                Select Course To Choose Batch
              </Text>
            )}
            <Text className="text-xs text-red-400">{errors.batchId}</Text>
            <Select.Root
              disabled={!studentDetails.courseId}
              value={studentDetails.batchId?.toString() || undefined}
              onValueChange={(val) =>
                setStudentDetails({
                  ...studentDetails,
                  batchId: parseInt(val),
                })
              }
            >
              <Select.Trigger />
              <Select.Content position="popper">
                {batches.map((batch) => (
                  <Select.Item value={batch.id.toString()} key={batch.id}>
                    {moment(batch.fromDate).format("MMM YYYY")} -{" "}
                    {moment(batch.toDate).format("YY")}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>

        {/* Division */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Flex direction={"column"} className="w-full" gap={"1"}>
            <Text className="text-xs text-slate-400">Division</Text>
            {!studentDetails.batchId && (
              <Text className="text-xs text-[var(--violet-11)]">
                Select Batch To Choose Division
              </Text>
            )}
            <Text className="text-xs text-red-400">{errors.divisionId}</Text>
            <Select.Root
              disabled={!studentDetails.batchId}
              value={studentDetails.divisionId?.toString() || undefined}
              onValueChange={(val) =>
                setStudentDetails({
                  ...studentDetails,
                  divisionId: parseInt(val),
                })
              }
            >
              <Select.Trigger />
              <Select.Content position="popper">
                {divisions.map((division) => (
                  <Select.Item value={division.id.toString()} key={division.id}>
                    Division {division.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>
      </Flex>

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
