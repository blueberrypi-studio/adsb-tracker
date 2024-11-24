// rows and columns are zero indexed (don't forget)
// I could fix this in code I guess, but I didn't so deal with it

export const aircraftIconMap = {
    // GA aircraft
    "C172": { row: 0, col: 3 },
    "C152": { row: 0, col: 3 },
    "P28A": { row: 5, col: 7 },
    "ECHO": { row: 0, col: 3 },
    "BE20": { row: 1, col: 7 },
    "R200": { row: 0, col: 3 },

    // helicopters
    "EC20": { row: 5, col: 6 },

    // general airlines
    "DH8C": { row: 1, col: 6 },
    "AT76": { row: 1, col: 6 },
    "PC12": { row: 1, col: 3 },

    // Airbus Airliners
    "A320": { row: 0, col: 0 },
    "A359": { row: 0, col: 4 },

    
    // Boeing Airliners
    "B738": { row: 0, col: 0 },
    "B789": { row: 0, col: 4 },


    // Military aircraft
    "C17" : { row: 4, col: 2 },
    "C5M" : { row: 4, col: 3 },
    "A400": { row: 2, col: 2 },
    "C130": { row: 0, col: 6 },
    "C30J": { row: 0, col: 6 },
    "P8":   { row: 0, col: 0 },

    // Military Fighters
    "F16":  { row: 0, col: 7 },
    "T38":  { row: 0, col: 7 },
    "TEX2": { row: 1, col: 3 },

    // Warbirds
    "P51": { row: 0, col: 3 },
    "T6":  { row: 0, col: 3 },
    "T28": { row: 0, col: 3 },

    // Other
    "TWR": { row: 8, col: 6 },




    "DEFAULT": { row: 0, col: 3 }, // Fallback icon for unknown types
};
