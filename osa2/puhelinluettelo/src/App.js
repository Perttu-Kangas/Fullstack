import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson) {
      if (
        window.confirm(
          `${duplicatePerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...duplicatePerson, number: newNumber };
        personService
          .update(duplicatePerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicatePerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePer = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then((response) => {
        console.log(response);
        setPersons(persons.filter((filter) => filter.id !== person.id));
      });
    }
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
      : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

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
      <Persons personsToShow={personsToShow} deletePer={deletePer} />
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
          {person.name} {person.number}{" "}
          <button onClick={() => props.deletePer(person)} type="submit">
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default App;
