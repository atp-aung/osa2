import DelBut from "./DelBut";

const AllPerson = (props) => {
  return (
    <>
      <h2>Person List</h2>
      {props.personsLst.map((person) => (
        <p key={person.id}>
          {person.name} : {person.number}
          <DelBut delOp={props.delOp} id={person.id} />
        </p>
      ))}
    </>
  );
};

export default AllPerson;
