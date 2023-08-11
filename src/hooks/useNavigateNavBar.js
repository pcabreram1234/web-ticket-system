import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";

//Este hook se ecnarga de rediriger o no al usuario a la pagina de login en caso de que no este logeado
const useNavBarNavigation = (path) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
    if (user !== undefined || user !== null) {
      if (path === "/login") {
        return false;
      } else {
        navigate(path);
      }
    } else {
      navigate("/login");
    }
  }, [path, navigate]);
  return navigate;
};

export { useNavBarNavigation };
