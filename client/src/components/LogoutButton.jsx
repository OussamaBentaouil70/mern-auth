import React, { useContext } from "react";
import { UserContext } from "../../context/userContext"; // Adjust the path as necessary

const LogoutButton = () => {
  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
