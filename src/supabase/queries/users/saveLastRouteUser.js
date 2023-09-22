import { supabase } from "../../index";

function saveLastRoute(path) {
  const user = supabase.auth.getUser().then((user) => {
    const { id } = user.data.user;
    if (path !== "/login") {
      // Guardamos la ruta en Supabase
      supabase
        .from("last_routes") // Supongamos que esta es tu tabla de rutas
        .insert({
          user_id: id,
          last_route: location.pathname,
        })
        .then((resp) => {
          console.log(resp.count);
        });
    }
  });
}

export { saveLastRoute };
