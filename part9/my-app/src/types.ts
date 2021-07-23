export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseDescriptionBase extends CoursePartBase {
  description: string;
}
export interface CourseNormalPart extends CourseDescriptionBase {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptionBase {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
