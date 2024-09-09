"use client";

import { useState, useEffect } from "react";
import Spin from "@/components/spin";
import { useCheckAuth } from "@/utils/auth";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import MapDisplay from "./map-display";
import EventsList from "./events-list";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const EventsPage = () => {
  const role = useCheckAuth();
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const getEvents = async () => {
    try {
      if (role === "Coach") {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/me`, { withCredentials: true });
        setEventsData(response.data.events);
      } else {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/`, { withCredentials: true });
        setEventsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (role === "") return;
    getEvents();
  }, [role]);

  if (role === "") {
    return <Spin />;
  }

  return (
    <div className="flex">
      <MapDisplay selectedLocation={selectedLocation} eventsData={eventsData} />
      <EventsList eventsData={eventsData} setSelectedLocation={setSelectedLocation} />
    </div>
  );
};

export default EventsPage;
