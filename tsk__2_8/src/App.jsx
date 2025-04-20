import { useState } from "react";

const Person = (props) => {
  return (
    <>
      {props.persons.map((person, index) => (
        <p key={index}>
          {person.name} : {person.number}
        </p>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
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
      number: newPhone,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewPhone("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={submitClick}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            id="number"
            value={newPhone}
            onChange={handlePhoneChange}
            placeholder="Enter number"
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Person persons={persons} />
    </>
  );
};

export default App;
