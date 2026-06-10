import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    ApiResponse,
    AttractionDetailsData,
    AttractionLocationData,
} from "../types/api";

export interface AttractionSearchParams {
    id: string;
    page?: number;
    currency_code?: string;
}

export const attractionApi = createApi({
    reducerPath: "attractionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/rapidapi/attraction",
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
