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
  const provinces = useProvinces();
  const [proviceSelected, setProvinceSelected] = useState(provinces[0]);
  const [cities, setCities] = useState([CitiesOfCountry.Cities.Azua.cities]);
  const [citySelected, setCitySelected] = useState(cities[0]);
  const { handleCompanyInfo, company, resetCompanyContext } =
    useContext(CompanyContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleShowSocialForm = () => {
    setShowSocialMediaForm(true);
  };

  const handleShowGeolocationModal = () => {
    setShowGeoLocationModal(true);
  };

  const handleSelectCities = (province) => {
    setCities([]);
    const { Cities } = CitiesOfCountry;
    for (const key in Cities) {
      if (key === province) {
        setCities(Cities[key].cities);
        setProvinceSelected(province);
        setCitySelected(Cities[key].cities[0]);
      }
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((resp) => {
      // console.log(company);
      insertCompanies(company)
        .then((resp) => {
          if (resp === true) {
            console.log("Guardado");
            form.resetFields()
            resetCompanyContext();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    // Cargar los servicios de la lista correspondiente
    // Luego setear los estados de ciudad y provincia con los primeros por defecto
    fetchAllServices().then((services) => {
      setServicesTypes(services);
      handleCompanyInfo("city", citySelected[0]);
      handleCompanyInfo("state", proviceSelected);
    });
  }, []);

  return (
    <Form form={form} style={{ width: "80%", margin: "auto" }} size="large">
      <Form.Item
        name={"name"}
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

      <Form.Item name={"service_type"} rules={[{ required: true }]}>
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

      <Form.Item label="State" initialValue={proviceSelected}>
        <Select
          value={proviceSelected}
          onSelect={(e) => {
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
        // name="City"
        initialValue={citySelected}
        rules={[
          {
            message: t("city-form-errorMessage"),
            required: true,
          },
        ]}
      >
        {cities.length > 0 && (
          <Select
            value={citySelected}
            onSelect={(e) => {
              handleCompanyInfo("city", e);
              setCitySelected(e);
            }}
            options={cities.map((city) => ({ label: city, value: city }))}
          />
        )}
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
          initialCoords={company.geolocation}
        />
      )}
    </Form>
  );
};

export default AddCompaniesForm;
