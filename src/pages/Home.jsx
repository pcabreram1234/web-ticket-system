import React from "react";
import { Layout, Typography } from "antd";
const { Header } = Layout;
const { Title } = Typography;
import { useTranslation } from "react-i18next";

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
    </Layout>
  );
};

export default Home;
