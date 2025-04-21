import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Person from "./components/Person";
import Addperson from "./components/AddPerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  // const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log(`render ${persons.length} persons`);

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
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
      });
  };

  return (
    <>
      <Header />
      <Person persons={persons} />
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
