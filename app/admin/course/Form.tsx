"use client";

import { courseSchema } from "@/app/validationSchemas";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/ReactQuillStyle.css";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  id?: number;
  name?: string;
  abbr?: string;
  duration?: number;
  description?: string;
  programOutcome?: string;
  departmentalStrength?: string;
  aboutFacility?: string;
  eligibilty?: string;
  significance?: string;
  vision?: string;
  mission?: string;
  technicalActivities?: string;
}

const Form = ({
  id,
  abbr,
  programOutcome,
  description,
  duration,
  name,
  departmentalStrength,
  aboutFacility,
  eligibilty,
  significance,
  vision,
  mission,
  technicalActivities,
}: Props) => {
  useEffect(() => {
    setCourseDetails({
      name: name || "",
      abbr: abbr || "",
      duration: duration || 0,
      description: description || "",
      programOutcome: programOutcome || "",
      departmentalStrength: departmentalStrength || "",
      aboutFacility: aboutFacility || "",
      eligibilty: eligibilty || "",
      significance: significance || "",
      vision: vision || "",
      mission: mission || "",
      technicalActivities: technicalActivities || "",
    });
  }, [
    name,
    abbr,
    duration,
    description,
    programOutcome,
    departmentalStrength,
    aboutFacility,
    eligibilty,
    significance,
    vision,
    mission,
    technicalActivities,
  ]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    abbr: "",
    duration: "",
  });

  // const [courseDetails, setCourseDetails] = useState({
  //   name: "",
  //   abbr: "",
  //   duration: 0,
  //   description: "",
  //   programOutcome: "",
  //   departmentalStrength: "",
  //   aboutFacility: "",
  //   eligibilty: "",
  //   significance: "",
  //   vision: "",
  //   mission: "",
  //   technicalActivities: "",
  // });

  const [courseDetails, setCourseDetails] = useState({
    name: "",
    abbr: "",
    duration: 0,
    description: "",
    programOutcome: "",
    departmentalStrength: "",
    aboutFacility: "",
    eligibilty: "",
    significance: "",
    vision: "",
    mission: "",
    technicalActivities: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      duration: "",
    }));

    const validation = courseSchema.safeParse(courseDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;
      console.log({ errorArray });

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await axios.post("/api/admin/course", courseDetails);

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/course");
  };

  const handleUpdate = async () => {
    setErrors(() => ({
      name: "",
      abbr: "",
      duration: "",
    }));

    const validation = courseSchema.safeParse(courseDetails);

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

    const res = await axios.put(`/api/admin/course/${id}`, courseDetails);

    if (!res.data.status) {
      toast.error("Failed To Save Changes");
      return;
    }

    toast.success("Saved Successfully");
    router.push("/admin/course");
  };

  return (
    <Flex className="w-full h-full px-10 py-20" direction={"column"} gap={"5"}>
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* course name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={courseDetails.name}
              size={"2"}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, name: e.target.value })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Course Abbreviation */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Abbreviation</Text>
          <Text className="text-xs text-red-400">{errors.abbr}</Text>
          <TextField.Root>
            <TextField.Input
              value={courseDetails.abbr}
              onChange={(e) =>
                setCourseDetails({ ...courseDetails, abbr: e.target.value })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Course Duration */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Duration (Years)</Text>
          <Text className="text-xs text-red-400">{errors.duration}</Text>
          <TextField.Root>
            <TextField.Input
              type="number"
              value={courseDetails.duration}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  duration: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Program Outcome</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={courseDetails.programOutcome}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                programOutcome: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Description</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={courseDetails.description}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                description: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Departmental Strength</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={courseDetails.departmentalStrength}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                departmentalStrength: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">About Our Facility</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={courseDetails.aboutFacility}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                aboutFacility: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Eligibilty</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={courseDetails.eligibilty}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                eligibilty: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Significance</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={courseDetails.significance}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                significance: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Mission</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={courseDetails.mission}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                mission: value,
              }))
            }
          />
        </Flex>

        <Flex className="w-1/2" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Vision</Text>
          <ReactQuill
            theme="snow"
            className="h-full w-full"
            value={courseDetails.vision}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                vision: value,
              }))
            }
          />
        </Flex>
      </Flex>

      <Flex gap={"4"} mb={"9"}>
        <Flex className="w-full" direction={"column"} gap={"2"}>
          <Text className="text-xs text-slate-400">Technical Activities</Text>
          <ReactQuill
            theme="snow"
            className="h-full"
            value={courseDetails.technicalActivities}
            onChange={(value) =>
              setCourseDetails((prevDetails) => ({
                ...prevDetails,
                technicalActivities: value,
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
