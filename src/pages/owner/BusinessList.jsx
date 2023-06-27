import React, { useState, useEffect, useContext } from "react";
import { fetchAllCompaniesByUser } from "../../supabase/queries/company";
import { Layout } from "antd";
import { AuthContext } from "../../context/UserContext";
import BussinesCard from "../../components/cards/BussinesCard";
import AutoCompleteInput from "../../components/input/AutoCompleteInput";

const BusinessList = () => {
  const user = useContext(AuthContext);
  const userId = user?.user?.id ?? null;
  const { Content } = Layout;

  const [business, setBusiness] = useState([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState([]);

  useEffect(() => {
    fetchAllCompaniesByUser(userId)
      .then((companies) => {
        setBusiness(companies);
        setFilteredBusiness(companies);
        setAutoCompleteOptions(
          companies.map((c) => {
            return { value: c.name };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setBusiness(null);
        setFilteredBusiness(null);
      });
  }, []);

  const filterByOption = (field, value, object) => {
    const filteredObject = object.filter((obj) =>
      obj[field].toLowerCase().includes(value.toLowerCase())
    );
    filteredBusiness !== false
      ? setFilteredBusiness(filteredObject)
      : setFilteredBusiness(business);
    console.log(business);
  };

  return (
    <Layout>
      <Content>
        {business !== null && (
          <AutoCompleteInput
            options={autoCompleteOptions}
            handleInput={filterByOption}
            object={business}
          />
        )}
        <div
          style={{
            width: "100%",
            overflow: "scroll",
            height: "450px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            justifyItems: "center",

            margin: "auto",
          }}
        >
          {business !== null &&
            filteredBusiness.map((company) => {
              return <BussinesCard company={company} key={company.id} />;
            })}
        </div>
      </Content>
    </Layout>
  );
};

export default BusinessList;
