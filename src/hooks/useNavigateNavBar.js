import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/UserContext";
import { saveLastRoute } from "../supabase/queries/users/saveLastRouteUser";

//Este hook se ecnarga de rediriger o no al usuario a la pagina de login en caso de que no este logeado
const useNavBarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [previousLocation, setPreviousLocation] = useState("");

  const isUserAutenticated = () => {
    return user !== undefined && user !== null ? true : false;
  };

  useEffect(() => {
    if (isUserAutenticated()) {
      console.log(`Pagina anterior ${location.pathname}`);
      switch (previousLocation) {
        case "/login":
          navigate("/home");
          break;
      }
    } else {
      navigate("/login");
    }
    saveLastRoute(location.pathname);
  }, [location, navigate]);

  useEffect(() => {
    // Actualizar la ubicación anterior
    setPreviousLocation(location.pathname);
  }, [location]);

  return navigate;
};

export { useNavBarNavigation };
