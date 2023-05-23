import * as jose from "jose";

const handleUserInfo = () => {
  const token = JSON.parse(
    window.localStorage.getItem("sb-tdvztulgsohoonxfcpwt-auth-token")
  );
  if (token) {
    const claims = jose.decodeJwt(token.access_token);
    return claims;
  }
};

export { handleUserInfo };
