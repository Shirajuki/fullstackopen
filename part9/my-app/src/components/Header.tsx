import React from "react";

type HeaderType = {
  name: string;
};
const Header: React.FC<HeaderType> = ({ name }): JSX.Element => {
  return <h1>{name}</h1>;
};
export default Header;
