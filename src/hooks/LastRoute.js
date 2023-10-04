import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/UserContext";
import { fetchLastRoute } from "../supabase/queries/routes/routes";

//Este hook se encarga de rediriger o no al usuario a la pagina de login en caso de que no este logeado
function LastRoute() {
  const location = useLocation();
  const history = useNavigate();
  const { user } = useContext(AuthContext);

  const isUserAutenticated = user !== undefined && user !== null ? true : false;

  useEffect(() => {
    if (isUserAutenticated) {
      fetchLastRoute(user.id)
        .then((resp) => {
          const { last_route } = resp[0];
          if (last_route === "/login") {
            history("/home");
          } else {
            history(resp[0].last_route);
          }
        })
        .catch((err) => {
          console.log(err);
          history("/login");
        });
    }else{
      history("/login");
    }
  }, [user]);
}

export default LastRoute;
