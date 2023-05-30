import React, { useState, useEffect } from "react";
import { fetchAllCompaniesByUser } from "../../supabase/queries/company";
import { useHookstate } from "@hookstate/core";
import { userInfo } from "../../context";
import { Space, Card, Button, Typography, Image } from "antd";
import { useTranslation } from "react-i18next";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

const BusinessList = () => {
  const userId = useHookstate(userInfo).get({ noproxy: true }).data.sub;
  const [business, setBusiness] = useState([]);
  const { t } = useTranslation();
  const { Text } = Typography;
  useEffect(() => {
    console.log(userId);
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
    <div>
      {business !== null &&
        business.length > 0 &&
        business.map((company) => {
          return (
            <Space direction="vertical" size={20} key={company.id}>
              <Card title={company.name} style={{ width: "300px" }}>
                <div className="company_card_img_container">
                  <Image src={company.logo} width={100} />
                  <Text>
                    {t("OwnerApp-Services-types")}: {company.service_type}
                  </Text>
                  {company.service_type.forEach((service) => {
                    return <Text>{service}</Text>;
                  })}
                  <Button>
                    {t("OwnerApp-Edit-Button")} <EditFilled />
                  </Button>
                  <Button>
                    {t("OwnerApp-Delete-Button")} <DeleteFilled />
                  </Button>
                </div>
              </Card>
            </Space>
          );
        })}
    </div>
  );
};

export default BusinessList;
