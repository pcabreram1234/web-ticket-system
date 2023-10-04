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
  const {
    name,
    type,
    address,
    contact,
    geolocation,
    state,
    city,
    socialMedia,
    user_id,
  } = company;

  const { data, error } = await supabase
    .from("companies")
    .insert({ company })
    .select("id");

  if (data !== []) {
    openNotification("information", "business-added", "success");
    const { id } = data[0];
    const request_to_save_social = await insertSocialMedia(socialMedia, id);
    if (request_to_save_social !== null) {
      openNotification("information", "business-added", "success");
    } else {
      openNotification("information", "business-added", "success");
    }
  } else {
    return error;
  }
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
