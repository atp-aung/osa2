import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchFrm from "./components/SearchFrm";
import FilteredPerson from "./components/FilteredPerson";
import Addperson from "./components/AddPerson";
import AllPerson from "./components/AllPerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [filtered, setFiltered] = useState(persons);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log(`render ${persons.length} persons`);

  const filterOp = (event) => {
    setShowAll(false);
    setFilterInput(event.target.value);
    const filter = event.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
    setFiltered(filteredPersons);
    if (event.target.value === "") {
      setShowAll(true);
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
      id: Math.floor(100000 + Math.random() * 900000),
    };

    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        console.log(response);
        setFilterInput("");
        setPersons(persons.concat(response.data));
        setShowAll(true);
        setNewName("");
        setNewPhone("");
      });
  };

  return (
    <>
      {showAll ? (
        <>
          <Header />
          <SearchFrm filterOp={filterOp} filterInput={filterInput} />
          <AllPerson personsLst={persons} />
          <Addperson
            submitClick={submitClick}
            newName={newName}
            handleNameChange={handleNameChange}
            newPhone={newPhone}
            handlePhoneChange={handlePhoneChange}
          />
        </>
      ) : (
        <>
          <Header />
          <SearchFrm filterOp={filterOp} filterInput={filterInput} />
          <FilteredPerson personsLst={filtered} />
          <Addperson
            submitClick={submitClick}
            newName={newName}
            handleNameChange={handleNameChange}
            newPhone={newPhone}
            handlePhoneChange={handlePhoneChange}
          />
        </>
      )}
    </>
  );
};

export default App;
