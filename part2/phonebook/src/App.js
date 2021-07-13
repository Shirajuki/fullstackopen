import React, { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPersons = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;
    if (name === "" || name === undefined) {
      window.alert("Please input a valid name!");
    } else if (persons.map((person) => person.name).includes(name)) {
      window.alert(`${name} is already added to phonebook`);
    } else {
      // Reset values
      setNewName("");
      setNewNumber("");
      // Add new person to persons state
      setPersons([...persons, { name: name, number: number }]);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setValue={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
