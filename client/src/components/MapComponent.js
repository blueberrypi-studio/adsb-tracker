// const center = [-43.487, 172.537]

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createIcon } from "./iconUtils"; // Import the utility function

const MapComponent = () => {
    const center = [-43.487, 172.537]; // Example center coordinates
    // State to store aircraft data
    const [aircraftData, setAircraftData] = useState([]);

    useEffect(() => {
        // Connect to WebSocket server
        const socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.aircraft) {
                setAircraftData(data.aircraft);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.close(); // Clean up on unmount
        };
    }, []);
    return (
        <MapContainer center={center} zoom={10} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {aircraftData.map((aircraft, index) => (
                <Marker
                    key={index}
                    position={[aircraft.lat, aircraft.lon]}
                    icon={createIcon(aircraft)} // Use the createIcon function
                >
                    <Popup>
                        <strong>Flight:</strong> {aircraft.flight}<br />
                        <strong>Type:</strong> {aircraft.type}<br />
                        <strong>Track:</strong> {aircraft.track}<br />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

