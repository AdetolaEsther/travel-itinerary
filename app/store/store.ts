import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import { flightApi } from "../services/flightApi";
import { hotelApi } from "../services/hotelApi";
import { attractionApi } from "../services/activitesApi";

export const store = configureStore({
    reducer: {
        [flightApi.reducerPath]: flightApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [attractionApi.reducerPath]: attractionApi.reducer,
        itinerary: itineraryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(flightApi.middleware)
            .concat(hotelApi.middleware)
            .concat(attractionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
