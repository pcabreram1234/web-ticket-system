import { useState } from "react";
import Provinces from "../json/provinces.json";
const useProvinces = () => {
  const [provinces, setProvices] = useState(
    Provinces.map((province) => province)
  );

  return provinces;
};

export { useProvinces };
