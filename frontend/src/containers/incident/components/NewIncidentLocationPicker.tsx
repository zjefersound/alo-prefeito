import { LatLng, LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useEffect, useState, useCallback } from "react";
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
  const { handleChangeValue } = useNewIncident();
  const [initialPosition, setInitialPosition] =
    useState<LatLngExpression | null>(null);

  const handleSelectPosition = useCallback(
    (value: LatLng) => {
      handleChangeValue(value.lat, "latitude");
      handleChangeValue(value.lng, "longitude");
    },
    [handleChangeValue]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setInitialPosition([-27.0127149, -51.1714452]); // Example coordinates (Videira)
      }
    );
  }, []);

  if (initialPosition === null) {
    return <Skeleton className="h-[400px] rounded-md" />;
  }

  return (
    <div className="h-[400px] rounded-md overflow-hidden">
      <MapContainer scrollWheelZoom={false} center={initialPosition} zoom={15}>
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
