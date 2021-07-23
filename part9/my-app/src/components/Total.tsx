import React from "react";

interface IContent {
  name: string;
  exerciseCount: number;
}
type TotalType = { courseParts: IContent[] };
const Total: React.FC<TotalType> = ({ courseParts }): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};
export default Total;
