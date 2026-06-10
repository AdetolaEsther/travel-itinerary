import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, FlightDestination, FlightDetailsData, FlightSearchData } from "../types/api";

export interface FlightSearchParams {
    fromId: string;
    toId: string;
    departDate: string;
    cabinClass: string;
}

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY!;
const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST!;

export const flightApi = createApi({
    reducerPath: "flightApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://booking-com15.p.rapidapi.com/api/v1/flights",
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", RAPID_API_KEY);
            headers.set("x-rapidapi-host", RAPID_API_HOST);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchDestination: builder.query<
            ApiResponse<FlightDestination[]>,
            string
        >({
            query: (text) => `/searchDestination?query=${text}`,
        }),

        searchFlights: builder.query<
            ApiResponse<FlightSearchData>,
            FlightSearchParams
        >({
            query: ({ fromId, toId, departDate, cabinClass }) =>
                `/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}&pageNo=1&adults=1&cabinClass=${cabinClass.toUpperCase()}&currency_code=NGN`,
        }),

        getFlightDetails: builder.query<
            ApiResponse<FlightDetailsData>,
            { flightId: string }
        >({
            query: ({ flightId }) =>
                `/getFlightDetails?flightId=${flightId}&currency_code=NGN`,
        }),
    }),
});

export const {
    useLazySearchDestinationQuery,
    useSearchFlightsQuery,
    useGetFlightDetailsQuery,
} = flightApi;
