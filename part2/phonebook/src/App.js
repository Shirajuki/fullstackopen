import React, { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
