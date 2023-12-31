import z from "zod";

const allowedGenders = ["male", "female", "other"];

const user = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(2, "First Name is too short")
    .max(100, "First Name is too long"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, "Last Name is too short")
    .max(100, "Last Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  gender: z
    .string({ required_error: "Gender is required" })
    .refine((data) => allowedGenders.includes(data), {
      message: "Invalid gender",
    }),
  userTypeId: z.number({
    required_error: "User Type is required",
    invalid_type_error: "User Type is required",
  }),
});

const courseSchema = z.object({
  name: z
    .string({ required_error: "Course Name is required" })
    .min(3, "Course Name is too short")
    .max(100, "Course Name is too long"),
  abbr: z
    .string({ required_error: "Course Abbreviation is required" })
    .min(1, "Course Abbreviation is too short")
    .max(20, "Course Abbreviation is too long"),
  duration: z.number({
    required_error: "Duration is required",
    invalid_type_error: "Duration is required",
  }),
});

const semesterSchema = z.object({
  duration: z.number({
    required_error: "Sem Number is required",
    invalid_type_error: "Sem Number is required",
  }),
  semNumber: z.number({
    required_error: "Sem Number is required",
    invalid_type_error: "Sem Number is required",
  }),
});

const subjectSchema = z.object({
  name: z
    .string({ required_error: "Subject Name is required" })
    .min(3, "Subject Name is too short")
    .max(100, "Subject Name is too long"),
  abbr: z
    .string({ required_error: "Subject Abbreviation is required" })
    .min(1, "Subject Abbreviation is too short")
    .max(20, "Subject Abbreviation is too long"),
  code: z
    .string({ required_error: "Subject Code is required" })
    .min(3, "Subject Code is too short")
    .max(45, "Subject Code is too long"),
  credits: z.number({
    required_error: "Credits are required",
    invalid_type_error: "Credits are required",
  }),
});

const teacherSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(2, "First Name is too short")
    .max(100, "First Name is too long"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, "Last Name is too short")
    .max(100, "Last Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  gender: z
    .string({ required_error: "Gender is required" })
    .refine((data) => allowedGenders.includes(data), {
      message: "Invalid gender",
    }),
  userTypeId: z.number({
    required_error: "User Type is required",
    invalid_type_error: "User Type is required",
  }),
  roleId: z.number({
    required_error: "Teacher Role is required",
    invalid_type_error: "Teacher Role is required",
  }),
});

const batchSchema = z.object({
  fromDate: z
    .string({ required_error: "From Date Is Required" })
    .min(1, "From Date Is Required"),

  toDate: z
    .string({ required_error: "From Date Is Required" })
    .min(1, "To Date Is Required"),
  courseId: z.number({
    required_error: "Course is required",
    invalid_type_error: "Course is required",
  }),
});

const unitSchema = z.object({
  name: z
    .string({ required_error: "Unit Name is required" })
    .min(3, "Unit Name is too short")
    .max(100, "Unit Name is too long"),
  number: z.number({
    required_error: "Unit Number is required",
    invalid_type_error: "Unit Number is required",
  }),
});

export {
  courseSchema,
  semesterSchema,
  subjectSchema,
  teacherSchema,
  batchSchema,
  unitSchema,
};
