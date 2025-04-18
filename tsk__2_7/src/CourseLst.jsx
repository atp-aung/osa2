import { useState } from "react";

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

export default CourseLst;
