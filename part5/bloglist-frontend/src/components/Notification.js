import React from "react";
import "../index.css";
const Notification = ({ errorMessage }) => {
  console.log(errorMessage);
  if (!errorMessage?.message) return <></>;
  return (
    <div
      className={`notification ${
        errorMessage.type === "success" ? "success" : "error"
      }`}
    >
      <p>{errorMessage.message}</p>
    </div>
  );
};
export default Notification;
