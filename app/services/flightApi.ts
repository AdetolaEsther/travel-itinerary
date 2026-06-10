import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ApiResponse,
    FlightDestination,
    FlightDetailsData,
    FlightSearchData,
} from "../types/api";

export interface FlightSearchParams {
    fromId: string;
    toId: string;
    departDate: string;
    cabinClass: string;
}

export const flightApi = createApi({
    reducerPath: "flightApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/rapidapi/flights",
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
