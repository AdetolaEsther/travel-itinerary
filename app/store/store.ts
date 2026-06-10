import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import { flightApi } from "../services/flightApi";

export const store = configureStore({
    reducer: {
        [flightApi.reducerPath]: flightApi.reducer,
        itinerary: itineraryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(flightApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
