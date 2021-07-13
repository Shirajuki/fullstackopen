const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
  </p>
);
const Persons = ({ persons, filter, deletePerson }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => {
      return (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      );
    });
};
export default Persons;
