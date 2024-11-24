import L from "leaflet";
import { aircraftIconMap } from "./iconMappings";

const spriteSheetUrl = "/icons.webp";

export const createIcon = (aircraft) => {
    const iconWidth = 72; // Width of a single icon in the sprite sheet
    const iconHeight = 72; // Height of a single icon in the sprite sheet

    // Get the grid position (row and col) for the aircraft type
    const { row, col } = aircraftIconMap[aircraft.type] || aircraftIconMap["DEFAULT"];

    // Create a custom Leaflet icon using CSS for rotation
    return L.divIcon({
        className: "custom-icon",
        html: `
            <div style="
                width: ${iconWidth}px;
                height: ${iconHeight}px;
                background: url(${spriteSheetUrl});
                background-position: -${col * iconWidth}px -${row * iconHeight}px;
                background-size: ${iconWidth * 8}px ${iconHeight * 11}px;
                transform: rotate(${aircraft.track}deg); /* Apply rotation */
                transform-origin: center center; /* Rotate around center */
            "></div>
            <span style="
                    display: block;
                    font-size: 12px;
                    color: black;
                    margin-top: 4px;
                    background-color: white;
                ">
                    ${aircraft.type} ${aircraft.alt}
                </span>
            </div>
        `,
        iconSize: [iconWidth, iconHeight],
    });
};
