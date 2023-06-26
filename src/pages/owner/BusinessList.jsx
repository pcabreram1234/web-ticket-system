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

  console.log(user);
  const [business, setBusiness] = useState([]);
  const [filterValue, setFilterValue] = useState([]);
  useEffect(() => {
    fetchAllCompaniesByUser(userId)
      .then((companies) => {
        setBusiness(companies);
        setFilterValue(companies);
      })
      .catch((err) => {
        console.log(err);
        setBusiness(null);
        setFilterValue(null);
      });
  }, []);

  const handleFilterBussines = (value) => {};

  return (
    <Layout>
      <Content>
        {business !== null && <AutoCompleteInput />}
        {/* <Space direction="horizontal" wrap={true}> */}
        <div
          style={{
            width: "100%",
            overflow: "scroll",
            height: "450px",
            border: "1px solid black",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            justifyItems: "center",

            margin: "auto",
          }}
        >
          {business !== null &&
            business.map((company) => {
              return <BussinesCard company={company} key={company.id} />;
            })}
        </div>
        {/* </Space> */}
      </Content>
    </Layout>
  );
};

export default BusinessList;
