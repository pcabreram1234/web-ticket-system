import React, { useState } from "react";
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
import { useHookstate } from "@hookstate/core";
import { userInfo } from "../context";

const LeftNavBar = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(useHookstate(userInfo).get().data);
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
      label: user.toString(),
      key: "User-Name-Menu",
      icon: <FaUserAlt />,
    },
    {
      label: t("Log-Out-Menu-option"),
      key: "Log-Out-Menu-option",
      icon: <AiOutlineLogout />,
    },
  ];
  return (
    <Menu items={items} mode="horizontal" style={{ width: "100%" }}></Menu>
  );
};

export default LeftNavBar;
