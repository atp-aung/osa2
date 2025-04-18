import { useState } from "react";

const Person = (props) => {
  return (
    <>
      {props.persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const submitClick = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    if (newName === "") {
      alert("Please enter a name");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={submitClick}>
        name:
        <input value={newName} onChange={handleNameChange} />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Person persons={persons} />
    </>
  );
};

export default App;
