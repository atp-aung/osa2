import { useState } from "react";

const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} ----- {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        <strong>total of {props.total} exercises</strong>
      </p>
    </>
  );
};

const Content = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(total);

  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total total={total} />
    </>
  );
};

const Course = (props) => {
  return (
    <>
      <Header header={props.header} />
      <Content parts={props.parts} />
      {/* <Total parts={props.parts} /> */}
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Course header={course.name} parts={course.parts} />
    </>
  );
};

export default App;
