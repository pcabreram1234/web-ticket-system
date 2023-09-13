import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {} from "../supabase/index"

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserInfo = () => {

    const session = supabase.auth
      .getSession()
      .then((resp) => {
        console.log(
          `Existe el contexto con el valor ${resp.data.session.user.id}`
        );
        setUser(resp?.data?.session?.user ?? null);
      })
      .catch((error) => {
        console.error(error + "error");
      });
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }} children={children} />;
};
export { AuthProvider, AuthContext };
