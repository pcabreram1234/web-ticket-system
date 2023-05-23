import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import LoginForm from "../components/form/LoginForm";
import { userInfo } from "../context";
import NavBar from "../Layouts/NavBar";

import UserContext from "../context/UserContext";

const App = () => {
  return (
    <UserContext.Provider value={userInfo}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
