import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MoveMapToEvent = ({ location }: { location: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location, 13, {
        animate: true,
      });
    }
  }, [location]);
  return null;
};

export default function MapDisplay({ selectedLocation, eventsData }: { selectedLocation: [number, number] | null, eventsData: Event[] }) {
  if (!eventsData) return null;
  return (
    <div className="flex-1 mr-4">
      <MapContainer
        center={[45.75, 4.85]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {eventsData.map((event) => (
          <Marker
            key={event.id}
            position={[parseFloat(event.location_x), parseFloat(event.location_y)]}
          />
        ))}
        {selectedLocation && <MoveMapToEvent location={selectedLocation} />}
      </MapContainer>
    </div>
  );
}
