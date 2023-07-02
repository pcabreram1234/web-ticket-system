import { useState, useEffect } from "react";
import Province from "../json/provinces.json";
import Cities from "../json/cities.json";

const useCities = (Province_name) => {
  const [cities, setCities] = useState([]);

  const handleSelectCities = () => {
    console.log(Cities);
    for (const key in Cities) {
      if (key === Province_name) {
        setCities(Cities[key].cities);
      }
    }
    return { cities };
  };

  useEffect(() => {
    handleSelectCities();
  }, [Province_name]);
};

export { useCities };
