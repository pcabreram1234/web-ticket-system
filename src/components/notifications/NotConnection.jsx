import { notification } from "antd";
import i18n from "../../i18n";

const openNotification = (message, description, type) => {
  notification.open({
    message: i18n.t(message),
    description: i18n.t(description),
    type: type,
    duration: 3,
  });
};

export { openNotification };
