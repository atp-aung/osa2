import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Header from "./components/Header";
import SearchFrm from "./components/SearchFrm";
import Addperson from "./components/AddPerson";
import AllPerson from "./components/AllPerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [tmpPersons, setTmpPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [filtered, setFiltered] = useState(persons);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log(`persons: ${persons}`);
      setTmpPersons(response.data);
      console.log(`tmpPersons: ${tmpPersons}`);
    });
  }, []);
  console.log(`render ${persons.length} persons of original`);
  console.log(`render ${tmpPersons.length} persons of tmpPersons`);

  const filterOp = (event) => {
    setShowAll(false);
    setFilterInput(event.target.value);
    const filter = event.target.value.toLowerCase();
    const filteredPersons = tmpPersons.filter((p) =>
      p.name.toLowerCase().includes(filter)
    );
    setPersons(filteredPersons);
    if (event.target.value === "") {
      setPersons(tmpPersons);
    }
  };

  const delOp = (id) => {
    console.log("delete button clicked", id);
    console.log(persons);
    const person = tmpPersons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.del(id).then((response) => {
        console.log(response);
        setFilterInput("");
        setPersons(tmpPersons.filter((person) => person.id !== id));
        setTmpPersons(tmpPersons.filter((person) => person.id !== id));
      });
    }
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

    const personObject = {
      name: newName,
      number: newPhone,
    };

    personService.create(personObject).then((response) => {
      console.log(response);
      setFilterInput("");
      setTmpPersons(tmpPersons.concat(response.data));
      setPersons(tmpPersons.concat(response.data));
      setShowAll(true);
      setNewName("");
      setNewPhone("");
    });
  };

  return (
    <>
      <Header />
      <SearchFrm filterOp={filterOp} filterInput={filterInput} />
      <AllPerson personsLst={persons} delOp={delOp} />
      <Addperson
        submitClick={submitClick}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
    </>
  );
};

export default App;
