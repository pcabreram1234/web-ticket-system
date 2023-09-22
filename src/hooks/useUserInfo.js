import { useEffect, useState } from "react";
import { supabase } from "../supabase";
const useUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        console.log(data);
        setUser(data.user ?? null);
      } else {
        throw error;
      }
    };
  }, []);

  return user;
};

export { useUserInfo };
