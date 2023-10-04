import React, { useEffect, useState, useContext } from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCog,
} from "react-icons/fa";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { logOut } from "../supabase";
import { AuthContext } from "../context/UserContext";
import { redirect, useNavigate, useLocation } from "react-router-dom";
import { saveUserCurrentRoute } from "../supabase/queries/routes/routes";

const NavBar = () => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(AuthContext);
  const history = useNavigate();
  const location = useLocation();
  const menuItems = {
    menu_for_normal_logged_user: [
      {
        label: t("Home-Menu-option"),
        key: "/home",
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
        label: user !== null && user !== undefined ? user.email : "",
        key: "User-Name-Menu",
        icon: <FaUserAlt />,
      },
      {
        label: t("Log-Out-Menu-option"),
        key: "Log-Out-Menu-option",
        icon: <AiOutlineLogout />,
        danger: true,
      },
    ],
    menu_for_bussiness_owner_logged_user: [
      {
        label: t("Home-Menu-option"),
        key: "/home",
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
        label: user !== null && user !== undefined ? user.email : "",
        key: "User-Name-Menu",
        icon: <FaUserAlt />,
      },
      {
        label: t("My-config"),
        key: "/My-config",
        icon: <FaCog />,
      },
      {
        label: t("Log-Out-Menu-option"),
        key: "Log-Out-Menu-option",
        icon: <AiOutlineLogout />,
        danger: true,
      },
    ],
    menu_for_unlogged_user: [
      {
        label: t("Home-Menu-option"),
        key: "/home",
        icon: <FaHome />,
        disabled: true,
      },
      {
        label: t("Offers-Menu-option"),
        key: "/offers",
        disabled: true,
      },
      {
        label: t("Schedule-Menu-option"),
        key: "/schedule",
        icon: <FaCalendar />,
        disabled: true,
      },
      {
        label: t("Reservation-Menu-option"),
        key: "/reservation",
        icon: <FaCalendarCheck />,
        disabled: true,
      },
      {
        label: t("Use-Location-Menu-option"),
        key: "/useLocation",
        icon: <FaMapMarkerAlt />,
        disabled: true,
      },

      {
        label: t("Log-In-Menu-option"),
        key: "/login",
        icon: <AiOutlineLogin />,
      },
    ],
  };

  const [itemsForMenu, setMenuItmes] = useState(
    menuItems.menu_for_unlogged_user
  );

  const handleClick = (e) => {
    handleUserTypeMenu();
    if (e.key !== "User-Name-Menu") {
      if (e.key === "Log-Out-Menu-option") {
        logOut().then((resp) => {
          setUser(null);
          handleUserTypeMenu();
          return history("/login");
        });
      }
      history(e.key);
    }
  };

  const handleUserTypeMenu = () => {
    // debugger;
    if (user !== null) {
      const user_type = user.user_metadata.user_type;
      switch (user_type) {
        case "business_owner":
          if (itemsForMenu !== menuItems.menu_for_bussiness_owner_logged_user) {
            return setMenuItmes(menuItems.menu_for_bussiness_owner_logged_user);
          }
          break;
        case "customer":
          if (itemsForMenu !== menuItems.menu_for_normal_logged_user) {
            return setMenuItmes(menuItems.menu_for_normal_logged_user);
          }
          break;
      }
    } else {
      return setMenuItmes(menuItems.menu_for_unlogged_user);
    }
  };

  // Al colocar como dependencia el state user, ya sea que exista o no un usuario ya logeado modificará el menu actual
  useEffect(() => {
    handleUserTypeMenu();
  }, [user]);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      const { id } = user;
      saveUserCurrentRoute(location.pathname, id);
    }
  }, [location.pathname]);

  return (
    <Menu
      items={itemsForMenu}
      mode="horizontal"
      style={{ width: "100%" }}
      onClick={handleClick}
    />
  );
};

export default NavBar;
