import "./App.css";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserContext } from "../context/userContext";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import TestNav from "./pages/TestNav";
import Rules from "./pages/Rules";
import PrivateRoute2 from "./components/PrivateRoute2";
import Profile from "./pages/Profile";
import ChatBot from "./pages/ChatBot";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? (
          <Navigate to="/" />
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/rules"
          element={
            <PrivateRoute2>
              <Rules />
            </PrivateRoute2>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute2>
              <ChatBot />
            </PrivateRoute2>
          }
        />
        <Route path="/test" element={<TestNav />} />
      </Routes>
    </UserContextProvider>
  );
}
export default App;
