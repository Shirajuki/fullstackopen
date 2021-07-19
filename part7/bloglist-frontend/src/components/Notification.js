import React from "react";
import { useSelector } from "react-redux";
import "../index.css";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div
      className={`notification ${
        notification.type === "success" ? "success" : "error"
      }`}
      hidden={notification.message === ""}
    >
      <p>{notification.message}</p>
    </div>
  );
};
export default Notification;
