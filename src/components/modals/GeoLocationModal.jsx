import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Typography, Button } from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useLocation } from "../../hooks/useLocation";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { CompanyContext } from "../../context/CompanyContext";
const { Title } = Typography;
import i18 from "i18next";
const GeoLocationModal = ({ cb, visible, initialCoords }) => {
  const { t } = i18;
  const coords = useLocation();
  const [showModal, setShowModal] = useState(visible);
  const { handleCompanyInfo } = useContext(CompanyContext);
  const [position, setPosition] = useState(coords && initialCoords);

  function LocationMarker() {
    const map = useMapEvents({
      locationfound(e) {
        console.log(e.latlng);
        setPosition(coords);
      },
      click(e) {
        console.log(e);
      },
      dragend(e) {
        console.log(e.target);
        console.log(`Se ha movido el marker ${e.target}`);
      },
    });

    console.log(coords);
    return position === null ? null : (
      <Marker draggable={true} position={coords}>
        <Popup minWidth={90}>
          <span>"Hola"</span>
        </Popup>
      </Marker>
    );
  }

  const getCurrentUbicacion = () => {
    const locationInfo = LocationMarker.call(this);
    console.log(locationInfo);
  };

  useEffect(() => {
    // handleCompanyInfo("geolocation", position);
    console.log(position);
  }, [position]);

  return (
    <Modal
      open={showModal}
      title={t("GeolocationModalForm-title")}
      cancelText={t("Cancel")}
      okText={t("save")}
      style={{ textAlign: "center" }}
      onCancel={() => {
        cb(false);
      }}
      onOk={() => {
        setShowModal(false);
      }}
      bodyStyle={{ height: "400px" }}
      centered={true}
    >
      {coords.length === 0 && (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Title color="red">{t("Searching-Geolocation")}</Title>
        </div>
      )}
      {coords.length > 0 && (
        <MapContainer
          center={coords}
          zoom={18}
          style={{ height: "100%" }}
          touchZoom
        >
          <LocationMarker />
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a> contributors'
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          />
        </MapContainer>
      )}
      {/* <Button onClick={getCurrentUbicacion}>Get Ubication</Button> */}
    </Modal>
  );
};

export default GeoLocationModal;
