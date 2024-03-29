import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import LoginForm from "../components/form/LoginForm";
import NavBar from "../Layouts/NavBar";
import OwnerApp from "../pages/owner/OwnerApp";
import LastRoute from "../hooks/LastRoute";

const App = () => {
  return (
    <>
      <NavBar />
      <LastRoute />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/My-config" element={<OwnerApp />} />
      </Routes>
    </>
  );
};

export default App;
