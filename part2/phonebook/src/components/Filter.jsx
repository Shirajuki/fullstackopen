const Filter = ({ value, setValue }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        id="filter"
        value={value}
        onChange={(event) => setValue(event.target.value.toLowerCase())}
      />
    </div>
  );
};
export default Filter;
