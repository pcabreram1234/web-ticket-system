import React from "react";
import { Layout, Divider, Typography } from "antd";
import {
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const { Content } = Layout;
const { Text } = Typography;

const FooterCopyRight = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Content
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a href="https://github.com/pcabreram1234" target={"_blank"}>
          <GithubFilled
            style={{ fontSize: "30px", color: "black", margin: "0 5px" }}
          />
        </a>

        <a
          href="https://www.linkedin.com/in/phillip-leonardo-cabrera-medrano/"
          target={"_blank"}
        >
          <LinkedinFilled
            style={{ fontSize: "30px", color: "black", margin: "0 5px" }}
          />
        </a>

        <a href="mailto:pcabreram1234@gmail.com">
          <MailFilled
            style={{ fontSize: "30px", color: "black", margin: "0 5px" }}
          />
        </a>

        <a href="https://twitter.com/pcabreram1234" target={"_blank"}>
          <TwitterCircleFilled
            style={{ fontSize: "30px", color: "black", margin: "0 5px" }}
          />
        </a>
      </Content>

      <Divider />
      <Text style={{ color: "gray", textAlign: "center" }}>
        © 2023 Apúntame {t("Footer-CopyRight")} - Phillip Cabrera
      </Text>
    </Layout>
  );
};

export default FooterCopyRight;
