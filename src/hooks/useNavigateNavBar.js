import { useEffect } from "react";
import { useNavigate } from "react-router";

const useNavBarNavigation = (path) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  }, [path, navigate]);
  return navigate;
};

export { useNavBarNavigation };
