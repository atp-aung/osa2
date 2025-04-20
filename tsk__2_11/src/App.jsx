import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [newNote, setNewNote] = useState("");
  // const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log(`render ${persons.length} persons`);

  return (
    <>
      <h1>Person Test</h1>
      <Person persons={persons} />
    </>
  );
};

export default App;
