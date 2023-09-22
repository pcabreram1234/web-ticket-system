import { useState, useEffect } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    const browser = navigator;
    browser.geolocation.getCurrentPosition(
      (resp) => {
        console.log(resp);
        const { latitude, longitude } = resp.coords;
        console.log(latitude);
        setCoords({ latitude, longitude });
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
