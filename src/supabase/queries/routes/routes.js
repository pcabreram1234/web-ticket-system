import { supabase } from "../../index";
import { isUserLogged } from "../../../utils/isUserLogged";

export const saveUserCurrentRoute = async (routeToSave, userId) => {
  isUserLogged();
  const { data, error } = await supabase.from("last_routes").insert({
    user_id: userId,
    last_route: routeToSave,
  });

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};
