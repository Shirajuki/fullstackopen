import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    type: "error",
  });

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deleteEntry(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage({
            message: `Successfully deleted ${name}`,
            type: "success",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((_) => {
          setErrorMessage({
            message: `The person ${name} has already been removed from the server`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };
  const addPersons = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;
    const personObj = { name, number };
    if (name === "" || name === undefined) {
      window.alert("Please input a valid name!");
    } else if (persons.map((person) => person.name).includes(name)) {
      const person = persons.find((person) => person.name.includes(name));
      if (person.number !== number) {
        if (
          window.confirm(
            `${name} is already added to phonebook, replace old number with a new one?`
          )
        ) {
          personService
            .update(person.id, personObj)
            .then((_) => {
              const copy = persons.map((p) =>
                p.id === person.id ? personObj : p
              );
              setPersons(copy);
            })
            .catch((_) => {
              setErrorMessage({
                message: `The person ${name} has already been removed from the server`,
                type: "error",
              });
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            });
        }
      } else window.alert(`${name} is already added to phonebook`);
    } else {
      // Reset values
      setNewName("");
      setNewNumber("");
      personService.create(personObj).then((res) => {
        console.log(res);
      });
      // Add new person to persons state
      setPersons([...persons, personObj]);
      setErrorMessage({ message: `Added ${personObj.name}`, type: "success" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={errorMessage} />
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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
