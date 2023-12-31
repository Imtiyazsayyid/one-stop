import {
  Batch,
  BatchSemesterMapper,
  Course,
  Division,
  DivisionTeacherSubjectMapper,
  Semester,
  Student,
  Subject,
  Teacher,
  TeacherRole,
  Unit,
  UnitMaterial,
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

export type DetailedStudent = Student & {
  user: User;
};

export type DetailedBatch = Batch & {
  course: Course;
  semesters: BatchSemesterMapper[];
};

export type DetailedDivision = Division & {
  students: Student[];
};

export type DetailedSubject = Subject & {
  semester: Semester;
};

export type DetailedDivisionSubjectTeacher = DivisionTeacherSubjectMapper & {
  subject: DetailedSubject;
  teacher: DetailedTeacher;
};

export type DetailedUnit = Unit & {
  unitMaterial: UnitMaterial[];
};
