import React, { useState } from "react";
import { Card, Button, Typography, Image, Row } from "antd";
import { useTranslation } from "react-i18next";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import EditBusinessModal from "../modals/EditBusinessModal";
import { fetchCompanyById } from "../../supabase/queries/company";
const BusinessCard = ({ company }) => {
  const [showEditModal, setShowEdtiModal] = useState(false);
  const [formData, setFormData] = useState();
  const { t } = useTranslation();
  const { Text } = Typography;
  return (
    <>
      {showEditModal && (
        <EditBusinessModal
          isModaVisible={showEditModal}
          formData={formData}
          setFormData={setFormData}
          setShowEdtiModal={setShowEdtiModal}
        />
      )}
      <Card key={company.id} title={company.name} style={{ width: "300" }}>
        <div className="company_card_img_container">
          <Image src={company.logo} width={30} />
          <Text>
            {t("OwnerApp-Services-types")}: {t(company.service_type.toString())}
          </Text>
          {company.service_type.forEach((service) => {
            return <Text>{service}</Text>;
          })}
          <Row justify={"space-between"}>
            <Button
              type="primary"
              onClick={() => {
                fetchCompanyById(company.id).then((resp) => {
                  setShowEdtiModal((e) => !e);
                  setFormData(resp[0]);
                });
              }}
            >
              {t("OwnerApp-Edit-Button")} <EditFilled />
            </Button>
            <Button danger>
              {t("OwnerApp-Delete-Button")} <DeleteFilled />
            </Button>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default BusinessCard;
