import React, { useState } from "react";
import { Modal, Input, Form } from "antd";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHookstate } from "@hookstate/core";
import { businessInfo, userInfo } from "../../context";
import "../../../node_modules/react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SocialMediaForm = ({ cb, visible }) => {
  const facebookHref = "https://www.facebook.com/";
  const instgramkHref = "https://www.instagram.com/";
  const whatsappHref = "https://api.whatsapp.com/send?phone=";
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const state = useHookstate(businessInfo);
  const user = useHookstate(userInfo).get().data.sub;
  const [showModal, setShowModal] = useState(visible);
  const saveChanges = () => {
    form.validateFields().then((resp) => {
      setShowModal(false);
      return true;
    });
  };

  const handleAcountUserInput = (owner_uuid, account, href, user_name) => {
    state.socialMedia[account].owner_uuid.set(owner_uuid);
    state.socialMedia[account].href.set(href);
    state.socialMedia[account].user_name.set(user_name);
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
        console.log(state.get());
      }}
    >
      <Form form={form}>
        <Form.Item name={"facebook"}>
          <Input
            placeholder={t("social-media-username")}
            prefix={<FacebookFilled style={{ color: "blue " }} />}
            onInput={(e) => {
              handleAcountUserInput(
                user,
                "facebook",
                facebookHref,
                e.currentTarget.value
              );
            }}
          />
        </Form.Item>

        <Form.Item name={"instagram"}>
          <Input
            prefix={<InstagramFilled style={{ color: "chocolate" }} />}
            placeholder={t("social-media-username")}
            onInput={(e) => {
              handleAcountUserInput(
                user,
                "instagram",
                instgramkHref,
                e.currentTarget.value
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
              handleAcountUserInput(user, "whatsapp", whatsappHref, e);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SocialMediaForm;
