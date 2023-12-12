import { supabase } from "../..";
import { isUserLogged } from "../../../utils/isUserLogged";
export const fetchDays = async () => {
  isUserLogged();
  const { data, error } = await supabase.from("week_days").select("day,id");
  if (error) {
    throw new Error(error);
  }
  return data;
};
