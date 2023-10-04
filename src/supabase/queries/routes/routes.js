import { supabase } from "../../index";
import { isUserLogged } from "../../../utils/isUserLogged";

export const saveUserCurrentRoute = async (routeToSave, userId) => {
  isUserLogged();
  const { data, error } = await supabase.from("last_routes").insert({
    user_id: userId,
    last_route: routeToSave,
  });

  if (error) {
    throw new Error(error);
  }
  return data;
};

export const fetchLastRoute = async (userId) => {
  isUserLogged();
  const { data, error } = await supabase
    .from("last_routes")
    .select("last_route")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error);
  }
  return data;
};
