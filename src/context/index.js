import { hookstate } from "@hookstate/core";
import { handleInternetConnection } from "../utils/internet";

const userInfo = hookstate({
  signUpText: "",
  online: handleInternetConnection(),
  signUpAlertType: "",
  user: "",
});

const businessInfo = hookstate({
  user_id: "",
  name: "",
  type: "",
  address: "",
  socialMedia: {
    facebook: {
      user_name: "",
      href: "",
      social_media: "facebook",
      owner_uuid: "",
    },
    instagram: {
      user_name: "",
      href: "",
      social_media: "instagram",
      owner_uuid: "",
    },
    whatsapp: {
      user_name: "",
      href: "",
      social_media: "whatsapp",
      owner_uuid: "",
    },
  },
  contact: "",
  geolocation: "",
  state: "",
  city: "",
});

const updateSignUpText = (text) => {
  userInfo.set({ signUpText: text });
};

export { userInfo, updateSignUpText, businessInfo };
