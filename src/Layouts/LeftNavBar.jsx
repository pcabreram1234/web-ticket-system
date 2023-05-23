import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useHookstate } from "@hookstate/core";
import { userInfo } from "../context";

const LeftNavBar = () => {
  const { t } = useTranslation();
  const userState = useHookstate(userInfo);
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
      label: userState.get().data,
      key: "User-Name-Menu",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <Menu items={items} mode="horizontal" style={{ width: "100%" }}></Menu>
  );
};

export default LeftNavBar;
