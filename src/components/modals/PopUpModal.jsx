import React, { useEffect, useState } from "react";
import { Modal, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const PopUpModal = ({ isModalVisible, cb, popUpText, alertType }) => {
  const [currentVisible, setCurrentVisible] = useState(isModalVisible);
  const location = useNavigate();
  const { t } = useTranslation();
  const handleClose = () => {
    if (cb) {
      cb(false);
    }
    setCurrentVisible(false);
  };

  setTimeout(() => {
    if (popUpText === "user-signUp-response") {
      location("/");
    } else {
      handleClose();
    }
  }, 2000);

  return (
    <Modal
      open={currentVisible}
      closable={true}
      cancelButtonProps={{ disabled: true }}
      onCancel={handleClose}
      onOk={handleClose}
      style={{ textAlign: "center" }}
      destroyOnClose={true}
    >
      <Alert type={alertType} message={t(popUpText)} />
    </Modal>
  );
};

export default PopUpModal;
