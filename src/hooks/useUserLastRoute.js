import { useEffect, useContext, useState } from "react";
import { fetchLastRoute } from "../supabase/queries/routes/routes";
import { AuthContext } from "../context/UserContext";

const useUserLastRoute = () => {
  const { user } = useContext(AuthContext);
  const [lastRoute, setLastRoute] = useState("/login");

  useEffect(() => {
    if (user !== null && user !== undefined) {
      fetchLastRoute(user.id)
        .then((route) => {
          setLastRoute(route);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return lastRoute;
};

export { useUserLastRoute };
