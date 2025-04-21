const Person = (props) => {
  return (
    <>
      {props.notes.map((note, id) => (
        <p key={note.id}>{note.content}</p>
      ))}
    </>
  );
};

export default Person;
