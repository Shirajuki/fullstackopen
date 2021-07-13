import React from "react";

const Header = (props) => <h1>{props.course}</h1>;
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => {
  return (
    <div>
      {props.parts.map((cont, index) => (
        <Part key={index} part={cont.part} exercises={cont.exercises} />
      ))}
    </div>
  );
};
const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.total.map((part) => part.exercises).reduce((a, b) => a + b, 0)}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

export default App;
