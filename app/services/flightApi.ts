import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_API_KEY = "3aa34c36famsh9f7691bbf2435cbp1e6e30jsnebe9ebecdd09";
const RAPID_API_HOST = "booking-com15.p.rapidapi.com";

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
        // Step 1: Search Destinations to get Airport IDs
        searchDestination: builder.query<any, string>({
            query: (text) => `/searchDestination?query=${text}`,
        }),

        // Step 2: Search for flights using IDs and date parameters
        searchFlights: builder.query<
            any,
            {
                fromId: string;
                toId: string;
                departDate: string;
                cabinClass: string;
            }
        >({
            query: ({ fromId, toId, departDate, cabinClass }) =>
                `/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}&pageNo=1&adults=1&cabinClass=${cabinClass.toUpperCase()}&currency_code=NGN`,
        }),

        // Step 3: Get flight details
        getFlightDetails: builder.query<any, { flightId: string }>({
            query: ({ flightId }) =>
                `/getFlightDetails?flightId=${flightId}&currency_code=NGN`,
        }),
    }),
});

// RTK Query auto-generates hooks for us based on the names above!
export const {
    useLazySearchDestinationQuery,
    useSearchFlightsQuery,
    useGetFlightDetailsQuery,
} = flightApi;
