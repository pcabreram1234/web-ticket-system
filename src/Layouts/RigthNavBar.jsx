import React from "react";
import { userInfo } from "../context";
import { useHookstate } from "@hookstate/core";
import { GoLocation } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const RightNavBar = () => {
  const { t } = useTranslation();
  const userState = useHookstate(userInfo);
  const items = [
    {
      label: userState.get().data,
      icon: <CiUser />,
      key: "Use-Name",
    },
  ];

  console.log(userState);

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: "5px",
      }}
    >
      <div>
        <Button icon={<GoLocation />}>{t("Use-Location-Menu-option")}</Button>
      </div>
      <div>
        <label htmlFor="">{"userState.get().data"}</label>
        <Button icon={<CloseCircleFilled />} danger>
          {t("OwnerApp-close-session")}
        </Button>
      </div>
    </nav>
  );
};

export default RightNavBar;
