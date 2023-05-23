import { supabase } from "../index";

export async function fetchUserType(user_id) {
  let { data, error } = await supabase
    .from("users_info")
    .select()
    .eq("uuid", user_id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
