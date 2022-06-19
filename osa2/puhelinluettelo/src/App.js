import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const isDuplicate = persons.find((person) => person.name === newName);

    if (isDuplicate) {
      alert(newName + " is already added to phonebook");
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    console.log(persons);
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const personsToShow =
    newFilter.length === 0
      ? persons
      : persons.filter((person) => person.name.includes(newFilter));

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  );
};

const Filter = (props) => {
  return (
    <>
      filter shown with{" "}
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </>
  );
};

const PersonForm = (props) => {
  return (
    <>
      name: <input value={props.newName} onChange={props.handleNameChange} />
      <br></br>
      number:{" "}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
      <form onSubmit={props.addPerson}>
        <button type="submit">add</button>
      </form>
    </>
  );
};

const Persons = (props) => {
  return (
    <>
      {props.personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default App;
