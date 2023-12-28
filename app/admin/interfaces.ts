import {
  Batch,
  BatchSemesterMapper,
  Course,
  DivisionTeacherSubjectMapper,
  Semester,
  Subject,
  Teacher,
  TeacherRole,
  User,
} from "@prisma/client";

export type DetailedSemester = Semester & {
  subjects: Subject[];
};

export type DetailedCourse = Course & {
  semesters: DetailedSemester[];
};

export type DetailedTeacher = Teacher & {
  user: User;
  role: TeacherRole;
};

export type DetailedBatch = Batch & {
  course: Course;
  semesters: BatchSemesterMapper[];
};

export type DetailedSubject = Subject & {
  semester: Semester;
};

export type DetailedDivisionSubjectTeacher = DivisionTeacherSubjectMapper & {
  subject: DetailedSubject;
  teacher: DetailedTeacher;
};
