import React, { useEffect, useState, useContext } from "react";
import { Form, Select, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { fetchAllServices } from "../../supabase/queries/service";
import {
  ZoomInOutlined,
  ShareAltOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import SocialMediaForm from "../../components/modals/SocialMedialForm";
import GeoLocationModal from "../../components/modals/GeoLocationModal";
import UploadButton from "../buttons/Upload";
import PhoneInput from "react-phone-number-input";
import CitiesOfCountry from "../../json/cities.json";
import { insertCompanies } from "../../supabase/queries/company";
import { useProvinces } from "../../hooks/useProvinces";
import { CompanyContext } from "../../context/CompanyContext";

const AddCompaniesForm = () => {
  const [servicesTypes, setServicesTypes] = useState([]);
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);
  const [showGeolocationModal, setShowGeoLocationModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState([]);
  const provinces = useProvinces();
  const { handleCompanyInfo, company } = useContext(CompanyContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    handleSelectCities(provinces[0]);
    form.resetFields();
    fetchAllServices().then((services) => {
      setServicesTypes(services);
    });
  }, []);

  const handleShowSocialForm = () => {
    setShowSocialMediaForm(true);
  };

  const handleShowGeolocationModal = () => {
    setShowGeoLocationModal(true);
  };

  const handleSelectCities = (province) => {
    const { Cities } = CitiesOfCountry;
    for (const key in Cities) {
      if (key === province) {
        setCities(Cities[key].cities);
        handleCompanyInfo("city", null);
        // handleCompanyInfo("state", province);
      }
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((resp) => {
      insertCompanies(state.get()).then((resp) => {
        if ((resp = "business-added")) {
        }
      });
    });
  };

  return (
    <Form form={form} style={{ width: "80%", margin: "auto" }} size="large">
      <Form.Item
        rules={[
          {
            required: true,
            min: "3",
          },
        ]}
      >
        <Input
          placeholder={t("AddCompaniesForm-Name-PlaceHolder")}
          onInput={(e) => {
            handleCompanyInfo("name", e.currentTarget.value);
          }}
          autoFocus
        />
      </Form.Item>

      <Form.Item name={"service_type"}>
        <Select
          allowClear
          placeholder={t("service_type_placeholder")}
          mode="multiple"
          onChange={(e) => {
            handleCompanyInfo("service_type", e);
          }}
          options={
            servicesTypes.length > 0 &&
            servicesTypes.map((service) => {
              return {
                label: t(service.name),
                value: t(service.name),
                key: service.id,
              };
            })
          }
        />
      </Form.Item>

      <Form.Item name={"address"} rules={[{ required: true, min: "10" }]}>
        <Input
          onInput={(e) => {
            handleCompanyInfo("address", e.currentTarget.value);
          }}
          placeholder={t("AddCompaniesForm-Address-PlaceHolder")}
        />
      </Form.Item>

      <Form.Item
        name={"contact"}
        rules={[
          {
            message: t("SignUp-form-phone-errorMessage"),
            required: true,
          },
        ]}
      >
        <PhoneInput
          onChange={(e) => {
            handleCompanyInfo("contact", e);
          }}
          countries={["DO", "US"]}
          className="ant-input-affix-wrapper ant-input-affix-wrapper-lg css-dev-only-do-not-override-j0nf2s"
          placeholder="809-111-2231"
        />
      </Form.Item>

      <Form.Item label="State" initialValue={provinces[0]}>
        <Select
          value={company.state}
          onChange={(e) => {
            handleCompanyInfo("state", e);
            handleSelectCities(e);
          }}
          options={provinces.map((province) => ({
            label: province,
            value: province,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="City"
        name={"City"}
        initialValue={cities[0]}
        rules={[
          {
            message: t("city-form-errorMessage"),
            required: true,
          },
        ]}
      >
        <Select
          value={company.city}
          onChange={(e) => {
            handleCompanyInfo("city", e);
          }}
          options={cities.map((city) => ({ label: city, value: city }))}
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} onClick={handleShowGeolocationModal}>
          {t("AddCompaniesForm-Geolocation-button")} <ZoomInOutlined />
        </Button>
      </Form.Item>

      <Form.Item name={"social_media"}>
        <Button style={{ width: "100%" }} onClick={handleShowSocialForm}>
          {t("AddCompaniesForm-socialMedia-PlaceHolder")}
          <ShareAltOutlined />
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }} rules={[{ required: true }]}>
        <UploadButton />
      </Form.Item>

      <Form.Item
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          icon={<SaveOutlined />}
          style={{ margin: "5px" }}
          onClick={handleSubmit}
        >
          {t("Signup-form-button")}
        </Button>
        <Button type="default" style={{ margin: "5px" }}>
          {t("Cancel")}
        </Button>
      </Form.Item>

      {showSocialMediaForm && (
        <SocialMediaForm
          cb={setShowSocialMediaForm}
          visible={showSocialMediaForm}
        />
      )}

      {showGeolocationModal && (
        <GeoLocationModal
          cb={setShowGeoLocationModal}
          visible={showGeolocationModal}
          initialCoords={null}
        />
      )}
    </Form>
  );
};

export default AddCompaniesForm;
