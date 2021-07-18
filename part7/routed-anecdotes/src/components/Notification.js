import React, { useEffect, useState } from "react";
const Notification = ({ notification, setNotification }) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (notification !== "") {
      clearTimeout(timer);
      const t = setTimeout(() => setNotification(""), 10000);
      setTimer(t);
    }
  }, [notification]);
  return (
    <div>
      <p>{notification !== "" ? notification : ""}</p>
    </div>
  );
};
export default Notification;
