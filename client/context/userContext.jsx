import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
    }
  }, []);
  const logout = () => {
    setUser(null); // Reset user state
    axios
      .post("/logout") // Optionally tell the server to clear the session/cookie
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("chatMessages"); // Remove chat messages from local storage
        navigate("/login"); // Redirect to the login page
      })
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
