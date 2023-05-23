import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import { singUp } from "../../supabase";
import PopUpModal from "../modals/PopUpModal";
import { userInfo } from "../../context/index";
import { useHookstate } from "@hookstate/core";

const SignUpForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const state = useHookstate(userInfo);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const name = form.getFieldValue("name");
      const email = form.getFieldValue("email");
      const user_type = form.getFieldValue("user_type");
      const password = form.getFieldValue("password");
      const phone = form.getFieldValue("phone");
      const req = singUp({
        name,
        email,
        user_type,
        phone,
        password,
      }).then((resp) => {
        state.signUpText.set(resp);
        if (resp === "user-signUp-response") {
          state.signUpAlertType.set("success");
        } else {
          state.signUpAlertType.set("error");
        }
        setShowModal(true);
        console.log(state.get());
      });
    });
  };

  return (
    <Form form={form}>
      <Form.Item
        name={"name"}
        required
        rules={[{ type: "string", required: true }]}
      >
        <Input placeholder={t("SignUp-form-name-placeholder")} />
      </Form.Item>

      <Form.Item
        name={"email"}
        required
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder={t("Login-Form-email-placeholder")} />
      </Form.Item>

      <Form.Item
        name={"phone"}
        required
        rules={[
          {
            pattern: /^\(\d{3}\)\s{1}\d{3}\-\d{4}/,
            message: t("SignUp-form-phone-errorMessage"),
            required: true,
          },
        ]}
      >
        <Input placeholder="(111) 222-2333" />
      </Form.Item>

      <Form.Item
        name={"user_type"}
        required
        rules={[{ required: true, message: "Select" }]}
      >
        <Select
          placeholder={t("SignUp-form-type-placeholder")}
          options={[
            { label: "Customer", value: "customer" },
            { label: "Business Owner", value: "business_owner" },
          ]}
        />
      </Form.Item>

      <Form.Item name={"password"} required rules={[{ required: true }]}>
        <Input.Password placeholder={t("Login-Form-Password-placeholder")} />
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          {t("Signup-form-button")}
        </Button>
      </Form.Item>
      {showModal && (
        <PopUpModal
          cb={setShowModal}
          isModalVisible={showModal}
          popUpText={state.get().signUpText}
          alertType={state.get().signUpAlertType}
        />
      )}
    </Form>
  );
};

export default SignUpForm;
