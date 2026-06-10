import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItineraryState {
    flights: any[];
    hotels: any[];
    activities: any[];
}

const isClient = typeof window !== "undefined";

const initialState: ItineraryState = {
    flights: isClient
        ? JSON.parse(localStorage.getItem("itinerary_flights") || "[]")
        : [],
    hotels: isClient
        ? JSON.parse(localStorage.getItem("itinerary_hotels") || "[]")
        : [],
    activities: isClient
        ? JSON.parse(localStorage.getItem("itinerary_activities") || "[]")
        : [],
};

const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        // =====================
        // FLIGHTS (UNCHANGED)
        // =====================
        addToItinerary: (state, action: PayloadAction<any>) => {
            const exists = state.flights.some(
                (f) => f.flightCode === action.payload.flightCode,
            );

            if (!exists) {
                state.flights.push(action.payload);

                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "itinerary_flights",
                        JSON.stringify(state.flights),
                    );
                }
            }
        },

        removeFromItinerary: (state, action: PayloadAction<string>) => {
            state.flights = state.flights.filter(
                (f) => f.flightCode !== action.payload,
            );

            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "itinerary_flights",
                    JSON.stringify(state.flights),
                );
            }
        },

        // =====================
        // HOTELS (NEW)
        // =====================
        addHotel: (state, action: PayloadAction<any>) => {
            const exists = state.hotels.some(
                (h) => h.hotel_id === action.payload.hotel_id,
            );

            if (!exists) {
                state.hotels.push(action.payload);

                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "itinerary_hotels",
                        JSON.stringify(state.hotels),
                    );
                }
            }
        },

        removeHotel: (state, action: PayloadAction<string>) => {
            state.hotels = state.hotels.filter(
                (h) => h.hotel_id !== action.payload,
            );

            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "itinerary_hotels",
                    JSON.stringify(state.hotels),
                );
            }
        },

        // =====================
        // ACTIVITIES (placeholder for later)
        // =====================
        addActivity: (state, action: PayloadAction<any>) => {
            state.activities.push(action.payload);

            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "itinerary_activities",
                    JSON.stringify(state.activities),
                );
            }
        },
    },
});

export const {
    addToItinerary,
    removeFromItinerary,
    addHotel,
    removeHotel,
    addActivity,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
