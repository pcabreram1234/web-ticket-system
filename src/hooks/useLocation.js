import { useState, useEffect, useContext } from "react";
import { CompanyContext } from "../context/CompanyContext";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);
  const { company } = useContext(CompanyContext);

  const { geolocation } = company;
  useEffect(() => {
    const browser = navigator;
    browser.geolocation.getCurrentPosition(
      (resp) => {
        const { latitude, longitude } = resp.coords;
        geolocation !== ""
          ? setCoords(geolocation)
          : setCoords([latitude, longitude]);
      },
      (err) => {
        console.log(err);
        setCoords(null);
      },
      { enableHighAccuracy: true }
    );
  }, []);
  console.log(coords);
  return coords;
};
