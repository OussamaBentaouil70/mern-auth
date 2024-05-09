import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      console.log(user);
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
      })
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
