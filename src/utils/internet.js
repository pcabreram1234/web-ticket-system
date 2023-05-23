import { openNotification } from "../components/notifications/NotConnection";

export const handleInternetConnection = () => {
  const navigator = window.navigator;
  return navigator.onLine;
};

export const checkInternetConnection = () => {
  const isOnline = handleInternetConnection();
  if (isOnline === false) {
    openNotification(
      "not-internet-connection",
      "not-internet-connection-description",
      "error"
    );
    return false;
  } else {
    return true;
  }
};
