import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Header from "./components/Header";
import SearchFrm from "./components/SearchFrm";
import Addperson from "./components/AddPerson";
import AllPerson from "./components/AllPerson";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [tmpPersons, setTmpPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [message, setMessage] = useState(null);

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
    setFilterInput(event.target.value);
    if (filterInput === "") {
      setPersons(tmpPersons);
    }

    const filter = event.target.value.toLowerCase();
    const filteredPersons = tmpPersons.filter((p) =>
      p.name.toLowerCase().includes(filter)
    );
    setPersons(filteredPersons);
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
        setMessage(`${person.name} is deleted successfully`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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
    console.log("submit button clicked", event.target);
    if (newName === "") {
      alert("Please enter a name");
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`alredy exists, update?`)) {
        console.log("update");
        const toUpdateNumber = persons.find(
          (person) => person.name === newName
        );
        console.log(toUpdateNumber);

        personService
          .update(toUpdateNumber.id, {
            name: newName,
            number: newPhone,
          })
          .then((response) => {
            console.log(response);
            const updatedPersons = tmpPersons.map((person) =>
              person.id === response.data.id
                ? { ...person, number: newPhone }
                : person
            );
            console.log(updatedPersons);
            setFilterInput("");
            setNewName("");
            setNewPhone("");
            setPersons(updatedPersons);
            setTmpPersons(updatedPersons);
            setMessage(`${toUpdateNumber.name} is updated successfully`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data);
            setMessage(
              `${toUpdateNumber.name} is not updated due to ${error.response.data.error} error`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        return;
      } else {
        window.alert(`${newName} is already exists and enter different name`);
        console.log("cancel");
        return;
      }
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
      setNewName("");
      setNewPhone("");
      setMessage(`${response.data.name} is added successfully`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  return (
    <>
      <Header />
      <Message message={message} />
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
