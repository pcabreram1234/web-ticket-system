import React, { useState, useContext, useRef, useMemo } from "react";
import { Modal, Typography } from "antd";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
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
  const { handleCompanyInfo, company } = useContext(CompanyContext);
  const markerRef = useRef(null);

  const LocationMarker = () => {
    const [position, setPosition] = useState(coords ?? null);
    const handlePosition = (e) => {
      setPosition(e.latlng);
      handleCompanyInfo("geolocation", e.latlng);
    };

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker._latlng);
            handleCompanyInfo("geolocation", marker._latlng);
            console.log(company);
          }
        },
      }),
      []
    );

    const map = useMapEvents({
      click(e) {
        map.locate();
        handlePosition(e);
      },
    });

    return position === null ? null : (
      <Marker
        position={position}
        draggable
        eventHandlers={eventHandlers}
        ref={markerRef}
      >
        <Popup> {t("business-location")} </Popup>
      </Marker>
    );
  };

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
          center={initialCoords ?? coords}
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
    </Modal>
  );
};

export default GeoLocationModal;
