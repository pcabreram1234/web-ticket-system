import React from "react";
import { Layout, Typography } from "antd";
const { Content, Header } = Layout;
const { Title } = Typography;
import { useTranslation } from "react-i18next";
import SignUpForm from "../components/form/SignUpForm";
const SignUp = () => {
  const { t } = useTranslation();

  return (
    <Layout
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Content>
        <Header style={{ backgroundColor: "transparent" }}>
          <Title style={{ textAlign: "center" }}>
            {t("SignUp-Layout-title")}
          </Title>
        </Header>
        <SignUpForm />
      </Content>
    </Layout>
  );
};

export default SignUp;
