const isUserLogged = () => {
  const token = window.localStorage.getItem(
    "sb-tdvztulgsohoonxfcpwt-auth-token"
  );
  if (!token) {
    window.location.href = "/login";
    return;
  }
};

export { isUserLogged };
