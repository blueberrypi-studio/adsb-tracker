require('dotenv').config();
const WebSocket = require('ws');
const axios = require('axios');

const API_URL = process.env.API_URL; // Replace with your API URL
const API_INTERVAL = process.env.API_INTERVAL; // Time between API calls in ms
const PORT = process.env.PORT;

const server = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

server.on('connection', (socket) => {
    console.log('Client connected');

    // Function to fetch data from the API and filter it
    const fetchDataAndSend = async () => {
        try {
            const response = await axios.get(API_URL);
            const data = response.data;

            if (data.aircraft) {
                const filteredAircraft = data.aircraft.map((aircraft) => ({
                    reg: aircraft.r || "Unknown",
                    type: aircraft.t || "Unknown",
                    squawk: aircraft.squawk || "Unknown",
                    flight: aircraft.flight?.trim() || "Unknown",
                    desc: aircraft.desc || "No Description",
                    alt: aircraft.alt_baro || "Unknown",
                    lat: aircraft.lat || "Unknown",
                    lon: aircraft.lon || "Unknown",
                    track: aircraft.track || 0,
                }));

                const filteredData = {
                    now: data.now,
                    aircraft: filteredAircraft,
                };

                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(filteredData)); // Send filtered data to the client
                }
            }
        } catch (error) {
            console.error('Error querying API:', error.message);
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(
                    JSON.stringify({ error: 'Failed to retrieve data from API' })
                );
            }
        }
    };

    // Query API at regular intervals
    const intervalId = setInterval(fetchDataAndSend, API_INTERVAL);

    socket.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Stop querying when client disconnects
    });
});

server.on('close', () => {
    console.log('WebSocket server stopped');
});
