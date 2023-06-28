import { useState, useEffect } from "react";
import Provinces from "../json/provinces.json";
const useProvinces = () => {
  const [provinces, setProvices] = useState([]);

  const loadProvinces = (cb) => {
    setProvices(Provinces.map((province) => province));
  };

  useEffect(() => {
    loadProvinces();
  }, []);

  return provinces;
};

export { useProvinces };
