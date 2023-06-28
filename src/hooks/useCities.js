import { useState, useEffect } from "react";
import Province from "../json/provinces.json";
import Cities from "../json/cities.json";

const useCities = (Province_name) => {
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState([]);

  const handleSelectCities = () => {
    const { Cities } = Province;
    for (const key in Cities) {
      if (key === Province_name) {
        console.log(key);
        setCities(Cities[key].cities);
        setCitySelected(Cities[key].cities[0]);
      }
    }
    return { cities, citySelected };
  };
  useEffect(() => {
    handleSelectCities();
  }, []);
};

export { useCities };
