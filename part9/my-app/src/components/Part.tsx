import React from "react";
import { CoursePart } from "../types";
type PartType = {
  course: CoursePart;
};
const renderSwitch = (course: CoursePart): JSX.Element => {
  switch (course.type) {
    case "normal":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>project exercises {course.groupProjectCount}</i>
        </p>
      );
    case "submission":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          submit to {course.exerciseSubmissionLink}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          required skills: {course.requirements.join()}
        </p>
      );
    default:
      return <></>;
  }
};
const Part: React.FC<PartType> = ({ course }): JSX.Element => {
  return renderSwitch(course);
};
export default Part;
