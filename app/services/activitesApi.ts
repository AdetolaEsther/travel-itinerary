import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_API_KEY = "3aa34c36famsh9f7691bbf2435cbp1e6e30jsnebe9ebecdd09";
const RAPID_API_HOST = "booking-com15.p.rapidapi.com";

export const attractionApi = createApi({
    reducerPath: "attractionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://booking-com15.p.rapidapi.com/api/v1/attraction",
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", RAPID_API_KEY);
            headers.set("x-rapidapi-host", RAPID_API_HOST);
            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // 1. Search location (get city/ufi id)
        searchLocation: builder.query<any, string>({
            query: (text) =>
                `/searchLocation?query=${encodeURIComponent(text)}&languagecode=en-us`,
        }),

        // 2. Get attractions in a city
        searchAttractions: builder.query<
            any,
            { id: string; page?: number; currency_code?: string }
        >({
            query: ({ id, page = 1, currency_code = "USD" }) =>
                `/searchAttractions?id=${id}&sortBy=trending&page=${page}&currency_code=${currency_code}&languagecode=en-us`,
        }),

        // 3. Get attraction details
        getAttractionDetails: builder.query<any, string>({
            query: (slug) =>
                `/getAttractionDetails?slug=${slug}&currency_code=USD`,
        }),
    }),
});

export const {
    useLazySearchLocationQuery,
    useLazySearchAttractionsQuery,
    useGetAttractionDetailsQuery,
} = attractionApi;
