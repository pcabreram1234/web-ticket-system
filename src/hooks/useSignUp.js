import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { searchUser } from "../supabase";
import { supabase } from "../supabase";

const useSignUp = (user_data) => {
  const [signUpText, setSignUpText] = useState("");
  const [existUser, setExistUser] = useState([]);
  const { name, email, user_type, phone, password } = user_data;
  useEffect(() => {
    /* Search the current user */
    const userExist = searchUser(email).then((resp) => {
      setExistUser(resp);
    });

    if (existUser.data) {
      /* Insert new user in users_info table */
      const newUser = supabase.from("users_info").insert({
        email: email,
        phone: phone,
        name: name,
        type: user_type,
      });
    }

    if (existUser.error) {
      setSignUpText("user-SignUp-Exist");
    }

    /* signUp new user */
    if (existUser.count === 0) {
      const { data, error } = supabase.auth.signUp({
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
      setSignUpText("uuser-signUp-response");
    }
    console.log(signUpText);
  }, []);
  return signUpText;
};

export { useSignUp };
