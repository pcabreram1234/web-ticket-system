import React, { useState, useContext } from "react";
import { Modal, Input, Form } from "antd";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "../../../node_modules/react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CompanyContext } from "../../context/CompanyContext";
import { AuthContext } from "../../context/UserContext";

const SocialMediaForm = ({ cb, visible }) => {
  const facebookHref = "https://www.facebook.com/";
  const instgramkHref = "https://www.instagram.com/";
  const whatsappHref = "https://api.whatsapp.com/send?phone=";
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { updateSocialMediaAccount, company, handleCompanyInfo } =
    useContext(CompanyContext);
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(visible);
  const saveChanges = () => {
    form.validateFields().then((resp) => {
      setShowModal(false);
      return true;
    });
  };

  return (
    <Modal
      open={showModal}
      title={t("SocialMediaForm-title")}
      cancelText={t("Cancel")}
      okText={t("save")}
      style={{ textAlign: "center" }}
      onCancel={() => {
        cb(false);
      }}
      onOk={() => {
        saveChanges();
      }}
    >
      <Form form={form}>
        <Form.Item name={"facebook"}>
          <Input
            placeholder={t("social-media-username")}
            prefix={<FacebookFilled style={{ color: "blue " }} />}
            onInput={(e) => {
              updateSocialMediaAccount(
                "facebook",
                e.currentTarget.value,
                facebookHref
              );
            }}
          />
        </Form.Item>

        <Form.Item name={"instagram"}>
          <Input
            prefix={<InstagramFilled style={{ color: "chocolate" }} />}
            placeholder={t("social-media-username")}
            onInput={(e) => {
              updateSocialMediaAccount(
                "instagram",
                e.currentTarget.value,
                instgramkHref
              );
            }}
          />
        </Form.Item>

        <Form.Item
          name={"whatsapp"}
          rules={[
            {
              required: true,
              message: t("whatsapp-error-input"),
              min: 10,
              pattern: /[(0-9){3}(0-9){3}(0-9){4}]/,
            },
          ]}
        >
          <PhoneInput
            countries={["DO", "US"]}
            className="ant-input-affix-wrapper ant-input-affix-wrapper-lg css-dev-only-do-not-override-j0nf2s"
            placeholder="Whatsapp"
            onChange={(e) => {
              updateSocialMediaAccount("whatsapp", e, whatsappHref);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SocialMediaForm;
