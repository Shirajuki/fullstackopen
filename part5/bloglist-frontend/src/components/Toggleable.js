import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div>
      <div hidden={visible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div hidden={!visible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>
          {props.buttonLabelClose ? props.buttonLabelClose : "cancel"}
        </button>
      </div>
    </div>
  );
});
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";
export default Togglable;
