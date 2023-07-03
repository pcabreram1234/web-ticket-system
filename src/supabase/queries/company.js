import { supabase } from "../index";
import { isUserLogged } from "../../utils/isUserLogged";

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
    .insert({
      name: name,
      service_type: type,
      address: address,
      contact: contact,
      geolocation: geolocation,
      state: state,
      city: city,
      social_media: socialMedia,
      user_id: user_id,
    })
    .select("id");

  if (data !== []) {
    const { id } = data[0];
    await insertSocialMedia(socialMedia, id);
    return "business-added";
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
