import { useState, useEffect } from "react";
import i18n from "../i18n";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaUserAlt,
  FaCog,
} from "react-icons/fa";

import { userInfo } from "../context";
import { hookstate } from "@hookstate/core";

const userName = hookstate(userInfo);
const useMenuItems = (user, cb) => {
  const menuItems = {
    menu_for_normal_logged_user: [
      {
        label: i18n.t("Home-Menu-option"),
        key: "/",
        icon: <FaHome />,
      },
      {
        label: i18n.t("Offers-Menu-option"),
        key: "/offers",
      },
      {
        label: i18n.t("Schedule-Menu-option"),
        key: "/schedule",
        icon: <FaCalendar />,
      },
      {
        label: i18n.t("Reservation-Menu-option"),
        key: "/reservation",
        icon: <FaCalendarCheck />,
      },
      {
        label: i18n.t("Use-Location-Menu-option"),
        key: "/useLocation",
        icon: <FaMapMarkerAlt />,
      },
      {
        label: userName.get().data.email,
        key: "User-Name-Menu",
        icon: <FaUserAlt />,
      },
      {
        label: i18n.t("Log-Out-Menu-option"),
        key: "Log-Out-Menu-option",
        icon: <AiOutlineLogout />,
        danger: true,
      },
    ],
    menu_for_bussiness_owner_logged_user: [
      {
        label: i18n.t("Home-Menu-option"),
        key: "/",
        icon: <FaHome />,
      },
      {
        label: i18n.t("Offers-Menu-option"),
        key: "/offers",
      },
      {
        label: i18n.t("Schedule-Menu-option"),
        key: "/schedule",
        icon: <FaCalendar />,
      },
      {
        label: i18n.t("Reservation-Menu-option"),
        key: "/reservation",
        icon: <FaCalendarCheck />,
      },
      {
        label: i18n.t("Use-Location-Menu-option"),
        key: "/useLocation",
        icon: <FaMapMarkerAlt />,
      },
      {
        label: userName.get().data.email,
        key: "User-Name-Menu",
        icon: <FaUserAlt />,
      },
      {
        label: userName.get().data.email,
        key: "/My-config",
        icon: <FaCog />,
      },
      {
        label: i18n.t("Log-Out-Menu-option"),
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
  const [itemsForMenu, setMenuItmes] = useState(user);
  useEffect(() => {
    if (user !== undefined) {
      const { name, user_type } = user.user_metadata;
      switch (user_type) {
        case "business_owner":
          console.log("Dueño de comercio");
          setMenuItmes(menuItems.menu_for_bussiness_owner_logged_user);
          break;

        default:
          setMenuItmes(menuItems.menu_for_normal_logged_user);
          break;
      }
    } else {
      setMenuItmes(menuItems.menu_for_unlogged_user);
    }
  }, [user, cb]);

  return itemsForMenu;
};

export { useMenuItems };
