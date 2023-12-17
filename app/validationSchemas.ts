import z from "zod";

const courseSchema = z.object({
  name: z
    .string({ required_error: "Course Name is required" })
    .min(3, "Course Name is too short")
    .max(100, "Course Name is too long"),
  abbr: z
    .string({ required_error: "Course Abbreviation is required" })
    .min(1, "Course Abbreviation is too short")
    .max(10, "Course Abbreviation is too long"),
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
    .max(45, "Subject Name is too long"),
  abbr: z
    .string({ required_error: "Subject Abbreviation is required" })
    .min(1, "Subject Abbreviation is too short")
    .max(10, "Subject Abbreviation is too long"),
  code: z
    .string({ required_error: "Subject Code is required" })
    .min(3, "Subject Code is too short")
    .max(45, "Subject Code is too long"),
});

const gradeSchema = z.object({
  gradeName: z
    .string({ required_error: "Grade Name is required" })
    .min(3, "Grade Name is too short")
    .max(45, "Grade Name is too long"),
});

const teacherSchema = z.object({
  teacherName: z
    .string({ required_error: "Teacher Name is required" })
    .min(3, "Teacher Name is too short")
    .max(45, "Teacher Name is too long"),
  teacherEmail: z
    .string({ required_error: "Teacher Email is required" })
    .email(),
  teacherPassword: z
    .string({ required_error: "Teacher Password is required" })
    .min(3, "Teacher Password is too short")
    .max(45, "Teacher Password is too long"),
});

const lectureGroupSchema = z.object({
  lectureGroupName: z
    .string({ required_error: "Lecture Group Name is required" })
    .min(3, "Lecture Group Name is too short")
    .max(45, "Lecture Group Name too long"),
  subjectId: z.number({
    required_error: "Subject is required",
    invalid_type_error: "Subject is required",
  }),
  teacherId: z.number({
    required_error: "Teacher is required",
    invalid_type_error: "Teacher is required",
  }),
});

const chapterSchema = z.object({
  chapterName: z
    .string({ required_error: "Chapter Name is required" })
    .min(3, "Chapter Name is too short")
    .max(45, "Chapter Name is too long"),
  chapterNumber: z.number({
    required_error: "Chapter Number is required",
    invalid_type_error: "Chapter Number is required",
  }),
});

const topicSchema = z.object({
  topicName: z
    .string({ required_error: "Topic Name is required" })
    .min(3, "Topic Name is too short")
    .max(45, "Topic Name is too long"),
});

const studentSchema = z.object({
  studentName: z
    .string({ required_error: "Student Name is required" })
    .min(3, "Student Name is too short")
    .max(45, "Student Name is too long"),
  studentEmail: z
    .string({ required_error: "Student Email is required" })
    .email(),
  studentPassword: z
    .string({ required_error: "Student Password is required" })
    .min(3, "Student Password is too short")
    .max(45, "Student Password is too long"),
  studentGradeId: z.number({
    required_error: "Student Grade is required",
    invalid_type_error: "Student Grade is required",
  }),
  studentBoardId: z.number({
    required_error: "Student Board is required",
    invalid_type_error: "Student Board is required",
  }),
});

export { courseSchema, semesterSchema, subjectSchema };
