
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    ApiResponse,
    AttractionDetailsData,
    AttractionLocationData,
} from "../types/api";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY!;
const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST!;

export interface AttractionSearchParams {
    id: string;
    page?: number;
    currency_code?: string;
}

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
        searchLocation: builder.query<
            ApiResponse<AttractionLocationData>,
            string
        >({
            query: (text) =>
                `/searchLocation?query=${encodeURIComponent(text)}&languagecode=en-us`,
        }),

        searchAttractions: builder.query<
            ApiResponse<AttractionLocationData>,
            AttractionSearchParams
        >({
            query: ({ id, page = 1, currency_code = "USD" }) =>
                `/searchAttractions?id=${id}&sortBy=trending&page=${page}&currency_code=${currency_code}&languagecode=en-us`,
        }),

        getAttractionDetails: builder.query<
            ApiResponse<AttractionDetailsData>,
            string
        >({
            query: (slug) =>
                `/getAttractionDetails?slug=${slug}&currency_code=USD`,
        }),
    }),
});

export const {
    useSearchLocationQuery,
    useLazySearchLocationQuery,
    useSearchAttractionsQuery,
    useLazySearchAttractionsQuery,
    useGetAttractionDetailsQuery,
} = attractionApi;

