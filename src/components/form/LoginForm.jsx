import React, { useContext } from "react";
import { Form, Input, Button, Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { signInWithEmail } from "../../supabase";
import { checkInternetConnection } from "../../utils/internet";
import { useNavBarNavigation } from "../../hooks/useNavigateNavBar";
import FooterCopyRight from "../../Layouts/FooterCopyRight";
import { AuthContext } from "../../context/UserContext";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const LoginForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavBarNavigation();
  const handleSubmit = () => {
    form.validateFields().then(() => {
      const internetConnection = checkInternetConnection();
      if (internetConnection) {
        const email = form.getFieldValue("email");
        const password = form.getFieldValue("password");
        const signIn = signInWithEmail(email, password).then((resp) => {
          navigate("/");
          setUser(resp);
        });
      }
    });
  };

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
      <Content>
        <Form form={form}>
          <Form.Item
            name={"email"}
            required
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder={t("Login-Form-email-placeholder")} />
          </Form.Item>
          <Form.Item name={"password"} rules={[{ required: true }]}>
            <Input.Password
              placeholder={t("Login-Form-Password-placeholder")}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              {t("Login-form-LogIngButton")}
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Footer style={{ width: "100%" }}>
        <FooterCopyRight />
      </Footer>
    </Layout>
  );
};

export default LoginForm;
