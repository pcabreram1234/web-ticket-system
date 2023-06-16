import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";
const useNavBarNavigation = (path) => {
  const navigate = useNavigate();
  const userState = useContext(AuthContext);
  useEffect(() => {
    if (userState !== undefined) {
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
