import React from "react";
import LogOutNavBar from "./LogOutNavBar";
import LogInNavBar from "./LogInNavBar";
import UserContext from "../context/UserContext";
import { userInfo } from "../context";
import { useHookstate } from "@hookstate/core";

const NavBar = () => {
  const userState = useHookstate(userInfo).get().data;
  console.log(userState);
  return (
    <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {userState !== undefined && <LogOutNavBar />}
      {userState === undefined && <LogInNavBar />}
    </nav>
  );
};

export default NavBar;
