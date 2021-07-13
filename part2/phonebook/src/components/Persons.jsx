const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);
const Persons = ({ persons, filter }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => {
      return <Person key={person.name} person={person} />;
    });
};
export default Persons;
