import React, { useEffect } from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaUserAlt,
} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { userInfo } from "../context";
import { useHookstate } from "@hookstate/core";
import { logOut } from "../supabase";
import { useNavBarNavigation } from "../hooks/useNavigateNavBar";

const LogOutNavBar = () => {
  const { t } = useTranslation();
  const userName = useHookstate(userInfo);
  const navigate = useNavBarNavigation();

  const handleClick = (e) => {
    if (e.key !== "User-Name-Menu") {
      if (e.key === "Log-Out-Menu-option") {
        logOut().then((resp) => {
          userName.data.set(undefined);
          navigate("/login");
        });
      }
      navigate(e.key);
    }
  };

  const toogleLogInLogOut = (user) => {
    if (user !== undefined) {
      const { name, user_type } = user.user_metadata;
      switch (user_type) {
        case "business_owner":
          console.log("Dueño de comercio");
          items.push({
          
          })
          break;

        case "customer":
          console.log("Normal")
          break;

        default:
          console.log("usuario normal");
          break;
      }
    }
  };

  const items = [
    {
      label: t("Home-Menu-option"),
      key: "/",
      icon: <FaHome />,
    },
    {
      label: t("Offers-Menu-option"),
      key: "/offers",
    },
    {
      label: t("Schedule-Menu-option"),
      key: "/schedule",
      icon: <FaCalendar />,
    },
    {
      label: t("Reservation-Menu-option"),
      key: "/reservation",
      icon: <FaCalendarCheck />,
    },
    {
      label: t("Use-Location-Menu-option"),
      key: "/useLocation",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: userName.get().data.email,
      key: "User-Name-Menu",
      icon: <FaUserAlt />,
    },
    {
      label: t("Log-Out-Menu-option"),
      key: "Log-Out-Menu-option",
      icon: <AiOutlineLogout />,
      danger: true,
    },
  ];

  useEffect(() => {
    toogleLogInLogOut(userName.get().data);
  }, [userInfo, handleClick]);

  return (
    <Menu
      items={items}
      mode="horizontal"
      style={{ width: "100%" }}
      onClick={handleClick}
    ></Menu>
  );
};

export default LogOutNavBar;
