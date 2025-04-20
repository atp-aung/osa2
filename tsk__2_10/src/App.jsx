import { useState } from "react";
import Header from "./Header";
import SearchFrm from "./SearchFrm";
import Addperson from "./AddPerson";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "bbb", number: "040-123456" },
    { name: "bb Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filtered, setFiltered] = useState(persons);

  const filterOp = (event) => {
    console.log(event.target.value);
    const filter = event.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
    setFiltered(filteredPersons);
  };

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
    setFiltered(persons.concat(newPerson));
    setNewName("");
    setNewPhone("");
  };

  return (
    <>
      <Header />
      <SearchFrm filterOp={filterOp} />
      <Addperson
        submitClick={submitClick}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Person personsLst={filtered} />
    </>
  );
};

export default App;
