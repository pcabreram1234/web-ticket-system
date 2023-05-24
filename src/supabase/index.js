import { createClient } from "@supabase/supabase-js";
import i18n from "../i18n/index";
import { checkInternetConnection } from "../utils/internet";
const SUPABASE_URL = import.meta.env["VITE_SUPABASE_URL"];
const ANON_KEY = import.meta.env["VITE_ANON_KEY"];
export const supabase = createClient(SUPABASE_URL, ANON_KEY);
import { openNotification } from "../components/notifications/NotConnection";

export async function singUp(user_data) {
  /* Check internet connection */
  checkInternetConnection();
  const { name, email, user_type, phone, password } = user_data;
  /* Search the current user */

  const userExist = await searchUser(email);
  if (userExist.data.length === 0) {
    /* signUp new user */
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
      options: {
        data: {
          name: name,
          user_type: user_type,
        },
      },
    });

    /* Insert new user in users_info table */
    const newUser = await supabase.from("users_info").insert({
      email: email,
      phone: phone,
      name: name,
      type: user_type,
      uuid: data.user.id,
    });
    return "user-signUp-response";
  } else {
    return "user-exists";
  }
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    openNotification(i18n.t("error-signin"), error.message, "error");
  }
  if (data.user !== null) {
    openNotification("wellcome", i18n.t("wellcome-description"), "success");
    return data;
  }
}

export async function searchUser(email) {
  const { data, error } = await supabase
    .from("users_info")
    .select("email")
    .eq("email", email);
  return { data, error };
}

export async function logOut() {
  const res = await supabase.auth.signOut().then(() => {
    openNotification("Good Bye", i18n.t("good-bye-description"), "info");
  });
}
