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
import { useNavBarNavigation } from "../hooks/useNavigateNavBar";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const menuItems = {
    menu_for_normal_logged_user: [
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
        label: t("Log-In-Menu-option"),
        key: "/login",
        icon: <AiOutlineLogin />,
      },
    ],
  };
  const [itemsForMenu, setMenuItmes] = useState(
    menuItems.menu_for_unlogged_user
  );

  const navigate = useNavBarNavigation();

  const handleClick = (e) => {
    setMenuItmes(handleUserTypeMenu());
    if (e.key !== "User-Name-Menu") {
      if (e.key === "Log-Out-Menu-option") {
        logOut().then((resp) => {
          setUser(null);
          navigate();
        });
      }
      navigate(e.key);
    }
  };

  const handleUserTypeMenu = () => {
    if (user !== null && user !== undefined) {
      console.log(user);
      const user_type = user.user_metadata.user_type;
      console.log(user_type);
      switch (user_type) {
        case "business_owner":
          if (itemsForMenu !== menuItems.menu_for_bussiness_owner_logged_user) {
            return menuItems.menu_for_bussiness_owner_logged_user;
          }
          break;
        case "customer":
          if (itemsForMenu !== menuItems.menu_for_normal_logged_user) {
            return menuItems.menu_for_normal_logged_user;
          }
          break;
      }
    } else {
      return menuItems.menu_for_unlogged_user;
    }
  };

  useEffect(() => {
    setMenuItmes(handleUserTypeMenu());
    if (user === null || user === undefined) {
      history("/login");
    }
  }, [user, history]);

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
