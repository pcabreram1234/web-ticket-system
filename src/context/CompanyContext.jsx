import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./UserContext";

const CompanyContext = React.createContext();

const CompanyProvider = ({ children }) => {
  const userContext = useContext(AuthContext);
  const { user } = userContext;
  // const [isNameChanging, setIsNameChanging] = useState(false);

  const initialSate = {
    user_id: user?.id,
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
    image: "",
    type: "",
    imagePath: "",
    fileList: [],
    hasSocialMedia: false,
    hasIcon: false,
  };

  const [company, setCompany] = useState(initialSate);
  const [isBusnisessSaved, setIsBusinessSaved] = useState(false);

  const resetCompanyContextValues = () => {
    setCompany({ ...initialSate });
  };

  const handleCompanyInfo = (prop, value) => {
    setCompany((prevData) => ({ ...prevData, [prop]: value }));
  };

  const updateSocialMediaAccount = (accountType, userName, href) => {
    handleCompanyInfo("hasSocialMedia", true);
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

  const resetIconInfo = () => {
    handleCompanyInfo("fileList", []);
    handleCompanyInfo("imagePath", "");
    handleCompanyInfo("image", "");
    handleCompanyInfo("type", "");
    handleCompanyInfo("hasIcon", false);
  };

  useEffect(() => {
    console.log(company);
  }, [handleCompanyInfo]);

  return (
    <CompanyContext.Provider
      value={{
        company,
        handleCompanyInfo,
        updateSocialMediaAccount,
        resetCompanyContextValues,
        resetIconInfo,
        isBusnisessSaved,
        setIsBusinessSaved,
      }}
      children={children}
    />
  );
};
export { CompanyContext, CompanyProvider };
