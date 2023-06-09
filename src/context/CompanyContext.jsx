import React, { useState, useEffect } from "react";

const CompanyContext = React.createContext();

const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState({
    user_id: "",
    name: "",
    service_type: "",
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

  const handleCompanyInfo = (prop, value) => {
    setCompany((prevData) => ({ ...prevData, [prop]: value }));
    console.log(company);
  };

  const updateSocialMediaAccount = (accountType, userName, href) => {
    switch (accountType) {
      case "facebook":
        setCompany((prevData) => ({
          ...prevData,
          socialMedia: {
            facebook: {
              href: href,
              user_name: userName,
            },
            instagram: { ...prevData.socialMedia.instagram },
            whatsapp: { ...prevData.socialMedia.whatsapp },
          },
        }));
        break;

      case "instagram":
        setCompany((prevData) => ({
          ...prevData,
          socialMedia: {
            instagram: {
              href: href,
              user_name: userName,
            },
            facebook: { ...prevData.socialMedia.facebook },
            whatsapp: { ...prevData.socialMedia.whatsapp },
          },
        }));
        break;

      case "whatsapp":
        setCompany((prevData) => ({
          ...prevData,
          socialMedia: {
            whatsapp: {
              href: href,
              user_name: userName,
            },
            instagram: { ...prevData.socialMedia.instagram },
            facebook: { ...prevData.socialMedia.facebook },
          },
        }));
        break;

      default:
        break;
    }
  };

  return (
    <CompanyContext.Provider
      value={{ company, handleCompanyInfo, updateSocialMediaAccount }}
      children={children}
    />
  );
};
export { CompanyContext, CompanyProvider };
