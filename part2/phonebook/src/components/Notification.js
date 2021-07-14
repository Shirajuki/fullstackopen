const Notification = ({ error }) => {
  if (error?.message === "" || error?.message === undefined) {
    return <></>;
  }

  return (
    <div className={error?.type === "error" ? "error" : "success"}>
      {error?.message}
    </div>
  );
};
export default Notification;
