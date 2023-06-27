import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

const AutoCompleteInput = ({ options, handleInput, object }) => {
  const [value, setValue] = useState([]);
  const handleChange = (e) => {
    setValue(e);
    handleInput("name", e, object);
  };
  const { t } = useTranslation();

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={handleChange}
      style={{ width: "100%", marginBottom: "10px" }}
      placeholder={t("search-placeholder")}
    />
  );
};

export default AutoCompleteInput;
