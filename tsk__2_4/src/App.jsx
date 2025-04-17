import { useState } from "react";

const Header = () => {
  return <h1>Web development curriculum</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      <strong>total of {props.total} exercises</strong>
    </p>
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

const CourseLst = (props) => {
  return (
    <>
      {props.courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <Content parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <CourseLst courses={courses} />
    </>
  );
};

export default App;
