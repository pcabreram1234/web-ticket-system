import React from "react";
import LeftNavBar from "./LeftNavBar";
import RightNavBar from "./RigthNavBar";

const NavBar = () => {
  return (
    <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <LeftNavBar />
      {/* <RightNavBar /> */}
    </nav>
  );
};

export default NavBar;
