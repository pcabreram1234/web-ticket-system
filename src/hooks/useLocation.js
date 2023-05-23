import { useState, useEffect } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    const browser = navigator;
    browser.geolocation.getCurrentPosition(
      (resp) => {
        console.log(resp);
        setCoords([resp.coords.latitude, resp.coords.longitude]);
      },
      (err) => {
        console.log(err);
        setCoords([]);
      },
      { enableHighAccuracy: true }
    );
  }, []);
  return coords;
};
