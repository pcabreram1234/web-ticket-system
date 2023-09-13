import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import LoginForm from "../components/form/LoginForm";
import NavBar from "../Layouts/NavBar";
import OwnerApp from "../pages/owner/OwnerApp";
import { useNavBarNavigation } from "../hooks/useNavigateNavBar";

const App = () => {
  useNavBarNavigation();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/My-config" element={<OwnerApp />} />
      </Routes>
    </>
  );
};

export default App;
