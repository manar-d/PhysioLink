import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ onChange }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onChange({ lat, lng });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ value, onChange }) {
  return (
    <MapContainer
      center={value ? [value.lat, value.lng] : [24.7136, 46.6753]} // Riyadh
      zoom={6}
      style={{
        height: 300,
        width: "100%",
        borderRadius: 12,
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onChange={onChange} />
    </MapContainer>
  );
}
