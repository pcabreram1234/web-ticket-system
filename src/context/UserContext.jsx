import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleUserInfo = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user ?? null);
    data.user.email
    return data.user;
  };

  const handleToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    setToken(data.session.access_token ?? null);
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  useEffect(() => {
    handleToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleUserInfo, token }}
      children={children}
    />
  );
};
export { AuthProvider, AuthContext };
