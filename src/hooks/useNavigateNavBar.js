import { useEffect } from "react";
import { useNavigate } from "react-router";
import { userInfo } from "../context";
import { useHookstate } from "@hookstate/core";
const useNavBarNavigation = (path) => {
  const navigate = useNavigate();
  const userState = useHookstate(userInfo).get().data;
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
