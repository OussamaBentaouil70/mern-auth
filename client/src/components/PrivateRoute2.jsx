import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { jwtDecode } from "jwt-decode";

const PrivateRoute2 = ({ children }) => {
  const { user } = useContext(UserContext);
  //   const token = localStorage.getItem("token");
  //   const user = jwtDecode(token);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "member") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute2;
