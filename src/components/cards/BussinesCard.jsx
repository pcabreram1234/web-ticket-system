import React from "react";
import { Card, Button, Typography, Image, Row } from "antd";
import { useTranslation } from "react-i18next";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

const BusinessCard = ({ company }) => {
  const { t } = useTranslation();
  const { Text } = Typography;
  return (
    <Card key={company.id} title={company.name} style={{ width: "300px", margin:"10px 0" }}>
      <div className="company_card_img_container">
        <Image src={company.logo} width={60} />
        <Text>
          {t("OwnerApp-Services-types")}: {t(company.service_type.toString())}
        </Text>
        {company.service_type.forEach((service) => {
          return <Text>{service}</Text>;
        })}
        <Row justify={"space-between"}>
          <Button type="primary">
            {t("OwnerApp-Edit-Button")} <EditFilled />
          </Button>
          <Button danger>
            {t("OwnerApp-Delete-Button")} <DeleteFilled />
          </Button>
        </Row>
      </div>
    </Card>
  );
};

export default BusinessCard;
