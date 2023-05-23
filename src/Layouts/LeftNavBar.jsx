import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { FaHome, FaCalendar, FaCalendarCheck } from "react-icons/fa";

const LeftNavBar = () => {
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
  ];
  return (
    <Menu items={items} mode="horizontal" style={{ width: "100%" }}></Menu>
  );
};

export default LeftNavBar;
