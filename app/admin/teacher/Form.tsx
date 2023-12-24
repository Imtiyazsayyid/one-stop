"use client";

import { teacherSchema } from "@/app/validationSchemas";
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
import { Gender, TeacherRole } from "@prisma/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  userId?: number;
  roleId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: Gender | "";
  profileImg?: string | "";
  qualification?: string;
  experience?: number;
  about?: string;
  awardsAndRecognition?: string;
  guestSpeakerAndResourcePerson?: string;
  participationInCWTP?: string;
  researchPublications?: string;
  certificationCourses?: string;
  booksOrChapter?: string;
  professionalMemberships?: string;
}

const Form = ({
  id,
  userId,
  roleId,
  firstName,
  lastName,
  email,
  password,
  profileImg,
  gender,
  qualification,
  experience,
  about,
  awardsAndRecognition,
  guestSpeakerAndResourcePerson,
  participationInCWTP,
  researchPublications,
  certificationCourses,
  booksOrChapter,
  professionalMemberships,
}: Props) => {
  const [teacherRoles, setTeacherRoles] = useState<TeacherRole[]>();
  const router = useRouter();

  const [teacherDetails, setTeacherDetails] = useState({
    userTypeId: 1,
    roleId: null as number | null,
    userId: null as number | null,
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: password || "",
    gender: gender || "",
    profileImg: profileImg || "",

    qualification: "",
    experience: null as number | null,
    about: "",
    awardsAndRecognition: "",
    guestSpeakerAndResourcePerson: "",
    participationInCWTP: "",
    researchPublications: "",
    certificationCourses: "",
    booksOrChapter: "",
    professionalMemberships: "",
  });

  const [errors, setErrors] = useState({
    roleId: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  const getTeacherRoles = async () => {
    const res = await axios.get("/api/admin/teacher-role");
    setTeacherRoles(res.data.data);
  };

  useEffect(() => {
    getTeacherRoles();
  }, []);

  useEffect(() => {
    setTeacherDetails({
      userTypeId: 1,
      userId: userId || null,
      roleId: roleId || null,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      profileImg: profileImg || "",
      gender: gender || "",
      qualification: qualification || "",
      experience: experience || null,
      about: about || "",
      awardsAndRecognition: awardsAndRecognition || "",
      guestSpeakerAndResourcePerson: guestSpeakerAndResourcePerson || "",
      participationInCWTP: participationInCWTP || "",
      researchPublications: researchPublications || "",
      certificationCourses: certificationCourses || "",
      booksOrChapter: booksOrChapter || "",
      professionalMemberships: professionalMemberships || "",
    });
  }, [
    userId,
    firstName,
    lastName,
    email,
    password,
    gender,
    profileImg,
    roleId,
    qualification,
    experience,
    about,
    awardsAndRecognition,
    guestSpeakerAndResourcePerson,
    participationInCWTP,
    researchPublications,
    certificationCourses,
    booksOrChapter,
    professionalMemberships,
  ]);

  const handleSave = async () => {
    setErrors(() => ({
      roleId: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    }));

    const validation = teacherSchema.safeParse(teacherDetails);

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

    const res = await axios.post("/api/admin/teacher", teacherDetails);

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/teacher");
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      roleId: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    }));

    const validation = teacherSchema.safeParse(teacherDetails);

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

    const res = await axios.put(`/api/admin/teacher/${id}`, teacherDetails);

    if (!res.data.status) {
      toast.error("Failed To Save Changes");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/teacher");
  };

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
                setTeacherDetails({
                  ...teacherDetails,
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
                    src={teacherDetails.profileImg}
                    className="cursor-pointer"
                  />
                </button>
              )}
            </CldUploadWidget>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* teacher first name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">First Name</Text>
          <Text className="text-xs text-red-400">{errors.firstName}</Text>
          <TextField.Root>
            <TextField.Input
              value={teacherDetails.firstName}
              size={"2"}
              onChange={(e) =>
                setTeacherDetails({
                  ...teacherDetails,
                  firstName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* teacher last name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Last Name</Text>
          <Text className="text-xs text-red-400">{errors.lastName}</Text>
          <TextField.Root>
            <TextField.Input
              value={teacherDetails.lastName}
              size={"2"}
              onChange={(e) =>
                setTeacherDetails({
                  ...teacherDetails,
                  lastName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Teacher email */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Email</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <TextField.Root>
            <TextField.Input
              value={teacherDetails.email}
              onChange={(e) =>
                setTeacherDetails({
                  ...teacherDetails,
                  email: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* teacher password*/}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Password</Text>
          <Text className="text-xs text-red-400">{errors.password}</Text>
          <TextField.Root>
            <TextField.Input
              value={teacherDetails.password}
              size={"2"}
              onChange={(e) =>
                setTeacherDetails({
                  ...teacherDetails,
                  password: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* teacher role */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Role</Text>
          <Text className="text-xs text-red-400">{errors.roleId}</Text>
          <Select.Root
            value={teacherDetails.roleId?.toString() || undefined}
            onValueChange={(val) =>
              setTeacherDetails({
                ...teacherDetails,
                roleId: parseInt(val),
              })
            }
          >
            <Select.Trigger />
            <Select.Content position="popper">
              {teacherRoles?.map((role) => (
                <Select.Item value={role.id.toString()} key={role.id}>
                  {role.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        {/* teacher gender */}
        <Flex className="w-1/3" gap={"2"} align={"end"}>
          <Flex direction={"column"} className="w-1/2" gap={"1"}>
            <Text className="text-xs text-slate-400">Gender</Text>
            <Text className="text-xs text-red-400">{errors.gender}</Text>
            <Select.Root
              value={teacherDetails.gender || undefined}
              onValueChange={(val) =>
                setTeacherDetails({
                  ...teacherDetails,
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
          <Flex className="w-1/2" direction={"column"} gap={"1"}>
            <Text className="text-xs text-slate-400">Experience (Years)</Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={teacherDetails.experience || undefined}
                type="number"
                onChange={(e) =>
                  setTeacherDetails({
                    ...teacherDetails,
                    experience: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
              />
            </TextField.Root>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Qualification</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={teacherDetails.qualification}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                qualification: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">About Me</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={teacherDetails.about}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                about: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Awards And Recognition</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={teacherDetails.awardsAndRecognition}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                awardsAndRecognition: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">
            Guest Speaker And Resource Person
          </Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={teacherDetails.guestSpeakerAndResourcePerson}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                guestSpeakerAndResourcePerson: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">
            Pariticipation In Conferences, Workshops and Training Programs
          </Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={teacherDetails.participationInCWTP}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                participationInCWTP: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Research Publications</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={teacherDetails.researchPublications}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                researchPublications: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Certification Courses</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={teacherDetails.certificationCourses}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                certificationCourses: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Books Or Chapter</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={teacherDetails.booksOrChapter}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                booksOrChapter: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-full" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">
            Professional Memberships
          </Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={teacherDetails.professionalMemberships}
            onChange={(value) =>
              setTeacherDetails((prevDetails) => ({
                ...prevDetails,
                professionalMemberships: value,
              }))
            }
          />
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
