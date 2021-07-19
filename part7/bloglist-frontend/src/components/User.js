import React from "react";

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map((b, index) => (
          <li key={index + b.title}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default User;
