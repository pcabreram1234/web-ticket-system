import Provinces from "../../json/provinces.json";

export const loadProvinces = (cb) => {
  cb(Provinces.map((province) => province));
};
