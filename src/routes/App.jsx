import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import LoginForm from "../components/form/LoginForm";
import OwnerApp from "../pages/owner/OwnerApp";
import NavBar from "../Layouts/NavBar";
import { userInfo } from "../context";

import UserContext from "../context/UserContext";

const App = () => {
  return (
    <UserContext.Provider value={userInfo}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/My-Companies" element={<OwnerApp />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
