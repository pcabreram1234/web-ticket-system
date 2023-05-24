import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavBarNavigation } from "../hooks/useNavigateNavBar";
const LogInNavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavBarNavigation();

  const handleClick = (e) => {
    navigate(e.key);
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
      label: t("Log-In-Menu-option"),
      key: "/login",
      icon: <AiOutlineLogin />,
    },
  ];

  return (
    <Menu
      items={items}
      mode="horizontal"
      style={{ width: "100%" }}
      onClick={handleClick}
    ></Menu>
  );
};

export default LogInNavBar;
