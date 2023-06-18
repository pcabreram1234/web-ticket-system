import React, { useState } from "react";
import { Layout, Button, Typography } from "antd";
import {
  PlusCircleFilled,
  SettingFilled,
  CloseCircleFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import FooterCopyRight from "../../Layouts/FooterCopyRight";
import AddCompaniesForm from "../../components/form/AddCompaniesForm";
import BusinessList from "./BusinessList";

const { Content, Sider, Header, Footer } = Layout;
const { Title } = Typography;
const OwnerApp = () => {
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBusinessSaved, setShowBusinessSaved] = useState(false);

  const handleShowModal = (modalToShowProp) => {
    switch (modalToShowProp) {
      case "settings":
        setShowSettings(true);
        setShowAddBusiness(false);
        setShowBusinessSaved(false);
        break;

      case "AddBusiness":
        setShowAddBusiness(true);
        setShowSettings(false);
        setShowBusinessSaved(false);
        break;

      case "BusinessList":
        setShowBusinessSaved(true);
        setShowSettings(false);
        setShowAddBusiness(false);
        break;
    }
  };

  const { t } = useTranslation();

  return (
    <Layout>
      <Header style={{ height: "auto" }}>
        <Title style={{ color: "white", textAlign: "center" }}>
          {t("OwnerApp-Title")}
        </Title>
      </Header>
      <Layout
        style={{
          padding: "5% 20% 20% 0%",
        }}
      >
        <Sider
          width={300}
          style={{
            backgroundColor: "transparent",
            padding: "25px 10px",
          }}
        >
          <Button
            style={{ margin: "5px 0", width: "100%" }}
            onClick={() => {
              handleShowModal("BusinessList");
            }}
            icon={<UnorderedListOutlined />}
          >
            {t("OwnerApp-Show-Companies-list")}
          </Button>
          <Button
            style={{ margin: "5px 0", width: "100%" }}
            onClick={() => {
              handleShowModal("AddBusiness");
            }}
            icon={<PlusCircleFilled />}
          >
            {t("OwnerApp-Add-Companie")}
          </Button>
          <Button
            icon={<SettingFilled />}
            style={{ margin: "5px 0", width: "100%" }}
            onClick={() => {
              handleShowModal("settings");
            }}
          >
            {t("OwnerApp-settings")}
          </Button>
          <Button
            icon={<CloseCircleFilled />}
            style={{
              margin: "5px 0",
              width: "100%",
              backgroundColor: "#F879A7",
            }}
          >
            {t("OwnerApp-close-session")}
          </Button>
        </Sider>
        <Content
          style={{ display: "grid", width: "100%", placeItems: "center" }}
        >
          {showAddBusiness && <AddCompaniesForm />}
          {showBusinessSaved && <BusinessList />}
        </Content>
      </Layout>
      <Footer>
        <FooterCopyRight />
      </Footer>
    </Layout>
  );
};

export default OwnerApp;
