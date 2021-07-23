import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

type ContentType = { courseParts: CoursePart[] };
const Content: React.FC<ContentType> = ({ courseParts }): JSX.Element => {
  return (
    <div>
      {courseParts.map((course: CoursePart, index: number) => (
        <Part key={index} course={course} />
      ))}
    </div>
  );
};
export default Content;
