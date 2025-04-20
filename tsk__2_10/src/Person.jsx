const Person = (props) => {
  return (
    <>
      {props.personsLst.map((person, index) => (
        <p key={index}>
          {person.name} : {person.number}
        </p>
      ))}
    </>
  );
};

export default Person;
