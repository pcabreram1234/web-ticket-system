import React, { useState, useEffect, useContext } from "react";
import { fetchAllCompaniesByUser } from "../../supabase/queries/company";
import { Space, Layout } from "antd";
import { AuthContext } from "../../context/UserContext";
import BussinesCard from "../../components/cards/BussinesCard";
import AutoCompleteInput from "../../components/input/AutoCompleteInput";

const BusinessList = () => {
  const user = useContext(AuthContext);
  const userId = user?.user?.id ?? null;

  console.log(user);
  const [business, setBusiness] = useState([]);
  useEffect(() => {
    fetchAllCompaniesByUser(userId)
      .then((companies) => {
        setBusiness(companies);
      })
      .catch((err) => {
        console.log(err);
        setBusiness(null);
      });
  }, []);

  return (
    <>
      {business !== null && <AutoCompleteInput />}
      <Space
        direction="vertical"
        size={"middle"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {business !== null &&
          business.map((company) => {
            return <BussinesCard company={company} key={company.id} />;
          })}
      </Space>
    </>
  );
};

export default BusinessList;
