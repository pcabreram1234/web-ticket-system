import React, { useState } from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
const LogInNavBar = () => {
  const { t } = useTranslation();
  const items = [
    {
      label: t("Home-Menu-option"),
      key: "Home-Menu-option",
      icon: <FaHome />,
    },
    {
      label: t("Offers-Menu-option"),
      key: "Offers-Menu-option",
    },
    {
      label: t("Schedule-Menu-option"),
      key: "Schedule-Menu-option",
      icon: <FaCalendar />,
    },
    {
      label: t("Reservation-Menu-option"),
      key: "Reservation-Menu-option",
      icon: <FaCalendarCheck />,
    },
    {
      label: t("Use-Location-Menu-option"),
      key: "Use-Location-Menu-option",
      icon: <FaMapMarkerAlt />,
    },

    {
      label: t("Log-In-Menu-option"),
      key: "Log-In-Menu-option",
      icon: <AiOutlineLogin />,
    },
  ];
  return (
    <Menu items={items} mode="horizontal" style={{ width: "100%" }}></Menu>
  );
};

export default LogInNavBar;
