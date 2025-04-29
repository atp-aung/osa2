const FilteredPerson = (props) => {
  return (
    <>
      <h2>Person List</h2>
      {props.personsLst.map((person) => (
        <p key={person.id}>
          {person.name} : {person.number}
        </p>
      ))}
    </>
  );
};

export default FilteredPerson;
