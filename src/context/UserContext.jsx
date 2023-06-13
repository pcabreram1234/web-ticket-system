import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserInfo = () => {
    const session = supabase.auth.getSession().then((resp) => {
      console.log(resp);
      setUser(resp?.data?.session?.user ?? null);
    });
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }} children={children} />;
};
export { AuthProvider, AuthContext };
