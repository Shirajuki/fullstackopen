import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    const content = event.target.value;
    setFilter(content);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect(null, { setFilter })(Filter);
export default ConnectedFilter;
