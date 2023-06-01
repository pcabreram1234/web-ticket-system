import React, { useEffect, useState } from "react";
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
import { userInfo } from "../context";
import { useHookstate } from "@hookstate/core";
import { logOut } from "../supabase";
import { useNavBarNavigation } from "../hooks/useNavigateNavBar";

const NavBar = () => {
  const { t } = useTranslation();
  const userName = useHookstate(userInfo);
  const [userEmail, setUserEmail] = useState(userInfo.get().data);
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
        label: userEmail !== undefined ? userEmail.email : "",
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
        label: userEmail !== undefined ? userEmail.email : "",
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
    if (e.key !== "User-Name-Menu") {
      if (e.key === "Log-Out-Menu-option") {
        logOut().then((resp) => {
          userName.data.set(undefined);
          setMenuItmes(menuItems.menu_for_unlogged_user);
          // setEmail("");
          navigate("/login");
        });
      }
      navigate(e.key);
    }
  };

  const handleUserTypeMenu = () => {
    if (userName.get().data !== undefined) {
      const { user_type } = userName.get().data.user_metadata;
      switch (user_type) {
        case "business_owner":
          if (itemsForMenu !== menuItems.menu_for_bussiness_owner_logged_user) {
            setMenuItmes(menuItems.menu_for_bussiness_owner_logged_user);
          }
          break;

        case "customer":
          if (itemsForMenu !== menuItems.menu_for_normal_logged_user) {
            setMenuItmes(menuItems.menu_for_normal_logged_user);
          }
          break;
      }
      // setEmail(userName.get().data.email);
    } else {
      setMenuItmes(menuItems.menu_for_unlogged_user);
    }
  };

  useEffect(() => {
    handleUserTypeMenu();
  }, []);

  useEffect(() => {
    handleUserTypeMenu();
  }, [userName.data]);

  return (
    <Menu
      items={itemsForMenu}
      mode="horizontal"
      style={{ width: "100%" }}
      onClick={handleClick}
    ></Menu>
  );
};

export default NavBar;
