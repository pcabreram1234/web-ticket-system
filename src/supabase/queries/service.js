import { supabase } from "../index";
import { isUserLogged } from "../../utils/isUserLogged";
export const fetchAllServices = async () => {
  isUserLogged();
  const { data, error } = await supabase.from("services").select("name,id");
  return data;
};
