import React, { useState, useImperativeHandle } from "react";
import { Button } from "@material-ui/core";
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
        <Button onClick={toggleVisibility} variant="contained" color="primary">
          {props.buttonLabel}
        </Button>
      </div>
      <div hidden={!visible} className="togglableContent">
        {props.children}
        <Button variant="outlined" color="secondary" onClick={toggleVisibility}>
          {props.buttonLabelClose ? props.buttonLabelClose : "cancel"}
        </Button>
      </div>
    </div>
  );
});
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";
export default Togglable;
