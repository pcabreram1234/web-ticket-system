import React from "react";
import { userInfo } from "./index";

const UserContext = React.createContext(userInfo.get());
export default UserContext;
