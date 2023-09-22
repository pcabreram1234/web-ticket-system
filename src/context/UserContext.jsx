import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserInfo = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user ?? null);
    console.log(user);
    return data.user;
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleUserInfo }}
      children={children}
    />
  );
};
export { AuthProvider, AuthContext };
