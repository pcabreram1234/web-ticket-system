import React from "react";
import { Layout, Typography } from "antd";
const { Header } = Layout;
const { Title } = Typography;
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom"; 
import OwnerApp from "../pages/owner/OwnerApp";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Header style={{ backgroundColor: "transparent" }}>
        <Title style={{ textAlign: "center" }}>{t("Home-Title")}</Title>
      </Header>
      <Routes>
        <Route path="/My-Companies" element={<OwnerApp />} />
      </Routes>
    </Layout>
  );
};

export default Home;
