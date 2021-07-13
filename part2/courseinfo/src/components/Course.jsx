const Header = (props) => <h2>{props.course}</h2>;
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
const Total = (props) => (
  <p>
    <b>
      Total of{" "}
      {props.total.map((part) => part.exercises).reduce((a, b) => a + b, 0)}{" "}
      exercises
    </b>
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};
export default Course;
