import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style} hidden={notification.message === ""}>
      {notification.message}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { notification: state.notification };
};
const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
