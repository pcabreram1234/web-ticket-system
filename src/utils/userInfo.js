import * as jwt from "jose";

const handleUserInfo = () => {
  const token = JSON.parse(
    window.localStorage.getItem("sb-tdvztulgsohoonxfcpwt-auth-token")
  );
  return token !== null ? token : null;
};

export { handleUserInfo };
