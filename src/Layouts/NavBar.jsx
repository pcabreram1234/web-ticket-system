import React from "react";
import LeftNavBar from "./LeftNavBar";

const NavBar = () => {
  return (
    <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <LeftNavBar />
    </nav>
  );
};

export default NavBar;
