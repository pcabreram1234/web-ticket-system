import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

const AutoCompleteInput = ({ options }) => {
  const [value, setValue] = useState([]);
  const onChange = (e) => {
    setValue(e);
  };
  const { t } = useTranslation();

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={onChange}
      style={{ width: "100%", marginBottom: "10px" }}
      placeholder={t("search-placeholder")}
    />
  );
};

export default AutoCompleteInput;
