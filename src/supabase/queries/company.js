import { supabase } from "../index";
import { isUserLogged } from "../../utils/isUserLogged";
import { openNotification } from "../../components/notifications/NotConnection";

export const fetchAllCompaniesByUser = async (user_id) => {
  isUserLogged();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("user_id", user_id);
  return data;
};

export const insertCompanies = async (company) => {
  isUserLogged();
  let saveStatus = false;
  console.log(company);

  const {
    hasSocialMedia,
    hasIcon,
    socialMedia,
    fileList,
    type,
    image,
    working_hours,
    ...companyToSave
  } = company;

  const openings_hours = working_hours[0].format("HH:mm");
  const closing_time = working_hours[1].format("HH:mm");

  // console.log(new Date().getTime(openings_hours));
  // console.log(closing_hours);

  const verifyCurrentCompany = await verifyExistingCompany(
    companyToSave.name,
    companyToSave.user_id
  );

  if (verifyCurrentCompany === true) {
    openNotification("Error", "company-exists", "error");
    saveStatus = false;
  } else {
    const { data, error } = await supabase
      .from("companies")
      .insert({
        ...companyToSave,
        openings_hours: openings_hours,
        closing_time: closing_time,
      })
      .select("id");
    if (data) {
      openNotification("information", "business-added", "success");
      const { id } = data[0];
      if (company.hasSocialMedia) {
        const request_to_save_social = await insertSocialMedia(socialMedia, id);
        if (request_to_save_social !== null) {
          openNotification("information", "business-added", "success");
        } else {
          openNotification("information", "business-added", "success");
        }
      }
      if (company.hasIcon) {
        const request_to_save_icon = await saveIconIntoStorage(
          image,
          companyToSave.imagePath
        );
      }
      saveStatus = true;
    } else {
      openNotification("Error", error.message, "error");
      saveStatus = false;
    }
  }
  return saveStatus;
};

export const insertSocialMedia = async (medias, owner_uuid) => {
  for (const key in medias) {
    const { href, social_media, user_name } = medias[key];
    const { data, error } = await supabase.from("social_medias").insert({
      user_name: user_name,
      href: href,
      social_media: social_media,
      owner_uuid: owner_uuid,
    });
  }
};

export const fetchCompanyById = async (id) => {
  isUserLogged();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .limit(1);
  return data;
};

export const saveIconIntoStorage = async (file, filePath) => {
  // console.log(file, filePath);
  const { data, error } = await supabase.storage
    .from("web-ticket-storage")
    .upload(filePath, file, {
      upsert: true,
      cacheControl: "3600",
    });
  if (error) {
    openNotification("upload-file-error", error.message, "error");
    return null;
  } else {
    openNotification(
      "upload-file-success",
      "upload-file-success-message",
      "success"
    );
  }
};

const verifyExistingCompany = async (company, user_id) => {
  const { data, error } = await supabase
    .from("companies")
    .select()
    .eq("name", company)
    .eq("user_id", user_id)
    .limit(1);

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};
