import { LatLng, LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useState, useCallback, useMemo } from "react";
import { MapContainer, useMapEvent, TileLayer, Marker } from "react-leaflet";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useNewIncident } from "../hooks/useNewIncident";

interface LocationMarkerProps {
  defaultValue: LatLngExpression;
  onChange: (value: LatLng) => void;
}

function LocationMarker({ defaultValue, onChange }: LocationMarkerProps) {
  const [position, setPosition] = useState<LatLngExpression>(defaultValue);

  const handleClick = useCallback(
    (e: LeafletMouseEvent) => {
      setPosition(e.latlng);
      onChange(e.latlng);
    },
    [onChange]
  );

  useMapEvent("click", handleClick);

  return <Marker position={position}></Marker>;
}

export function NewIncidentLocationPicker() {
  const { data, handleChangeValue } = useNewIncident();
  const initialPosition: LatLngExpression | null = useMemo(
    () =>
      data.latitude && data.longitude
        ? [Number(data.latitude), Number(data.longitude)]
        : null,
    [data.latitude, data.longitude]
  );

  const handleSelectPosition = useCallback(
    (value: LatLng) => {
      handleChangeValue(String(value.lat), "latitude");
      handleChangeValue(String(value.lng), "longitude");
    },
    [handleChangeValue]
  );

  if (initialPosition === null) {
    return <Skeleton className="h-[400px] rounded-md" />;
  }

  return (
    <div className="h-[400px] rounded-md overflow-hidden">
      <MapContainer center={initialPosition} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          defaultValue={initialPosition}
          onChange={handleSelectPosition}
        />
      </MapContainer>
    </div>
  );
}
