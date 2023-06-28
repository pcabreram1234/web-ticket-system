import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { fetchAllServices } from "../../supabase/queries/service";
import PhoneInput from "react-phone-number-input";
import { useProvinces } from "../../hooks/useProvinces";
import { useCities } from "../../hooks/useCities";
const EditBusinessModal = ({
  isModaVisible,
  setFormData,
  formData,
  setShowEdtiModal,
}) => {
  const { t } = useTranslation();
  const [servicesTypes, setServicesTypes] = useState([]);
  const [form] = Form.useForm();
  const provinces = useProvinces();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const cities = useCities(provinces);
  useEffect(() => {
    form.resetFields();
    fetchAllServices().then((services) => {
      setServicesTypes(services);
    });
    // console.log(formData);
    console.log(cities);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [handleChange || formData]);

  return (
    <Modal
      open={isModaVisible}
      title={`${t("Edit-business")} ${name}`}
      onCancel={() => setShowEdtiModal(false)}
    >
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
            value={formData.name}
            name="name"
            onChange={handleChange}
            autoFocus
          />
        </Form.Item>

        <Form.Item name={"service_type"}>
          <Select
            allowClear
            placeholder={t("service_type_placeholder")}
            mode="multiple"
            name="service_type"
            onChange={handleChange}
            defaultValue={formData.service_type}
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
            name="address"
            onInput={handleChange}
            value={formData.address}
            placeholder={t("AddCompaniesForm-Address-PlaceHolder")}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              message: t("SignUp-form-phone-errorMessage"),
              required: true,
            },
          ]}
        >
          <PhoneInput
            name="contact"
            onChange={(e) => {
              setFormData((prevData) => ({ ...prevData, contact: e }));
            }}
            countries={["DO", "US"]}
            className="ant-input-affix-wrapper ant-input-affix-wrapper-lg css-dev-only-do-not-override-j0nf2s"
            placeholder="809-111-2231"
          />
        </Form.Item>

        <Form.Item label="State" name={"state"}>
          <Select
            defaultValue={formData.state}
            onChange={(e) => {
              setFormData((prevData) => ({ ...prevData, state: e }));
            }}
            options={provinces.map((province) => ({
              label: province,
              value: province,
            }))}
          />
        </Form.Item>

        <Form.Item label="City">
          <Select
            value={formData.city}
            // onChange={(e) => {
            //   handleChangeCity(e);
            // }}
            // options={cities.map((city) => ({ label: city, value: city }))}
          />
        </Form.Item>
        {/*  <Form.Item>
          <Button
            style={{ width: "100%" }}
            onClick={handleShowGeolocationModal}
          >
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
          />
        )} */}
      </Form>
    </Modal>
  );
};

export default EditBusinessModal;