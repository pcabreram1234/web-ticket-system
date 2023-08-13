import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Typography, Button } from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useLocation } from "../../hooks/useLocation";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { CompanyContext } from "../../context/CompanyContext";
const { Title } = Typography;
import i18, { use } from "i18next";
const GeoLocationModal = ({ cb, visible, initialCoords }) => {
  const { t } = i18;
  const coords = useLocation();
  const [showModal, setShowModal] = useState(visible);
  const { handleCompanyInfo } = useContext(CompanyContext);
  const [position, setPosition] = useState();
  const markerRef = useRef(null);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    if (position === null || position === undefined) {
      setPosition(coords);
    }
  }

  const handleDragendMarker = () => {
    const marker = markerRef.current;
    if (marker !== null) {
      console.log("Marker movido");
      setPosition(marker.getLatLng());
      console.log(position);
    }
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
          center={coords}
          zoom={18}
          style={{ height: "100%" }}
          touchZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a> contributors'
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          />
          <LocationMarker />
          {position !== null && position !== undefined && (
            <Marker
              draggable={true}
              position={position}
              ref={markerRef}
              eventHandlers={{ dragend: handleDragendMarker }}
            >
              <Popup minWidth={90}>
                <span>"Hola"</span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      {/* <Button onClick={getCurrentUbicacion}>Get Ubication</Button> */}
    </Modal>
  );
};

export default GeoLocationModal;
