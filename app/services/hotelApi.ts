
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY!;
const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST!;

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://booking-com15.p.rapidapi.com/api/v1/hotels",
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", RAPID_API_KEY);
            headers.set("x-rapidapi-host", RAPID_API_HOST);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchDestination: builder.query<any, string>({
            query: (text) =>
                `/searchDestination?query=${encodeURIComponent(text)}`,
        }),

        searchHotels: builder.query<
            any,
            {
                dest_id: string;
                search_type?: string;
                arrival_date: string;
                departure_date: string;
                adults?: number;
                room_qty?: number;
                page_number?: number;
            }
        >({
            query: ({
                dest_id,
                search_type = "CITY",
                arrival_date,
                departure_date,
                adults = 1,
                room_qty = 1,
                page_number = 1,
            }) =>
                `/searchHotels?dest_id=${dest_id}&search_type=${search_type}&arrival_date=${arrival_date}&departure_date=${departure_date}&adults=${adults}&room_qty=${room_qty}&page_number=${page_number}&units=metric&languagecode=en-us&currency_code=NGN`,
        }),
        getHotelDetails: builder.query<any, string>({
            query: (hotelId) =>
                `/getHotelDetails?hotel_id=${hotelId}&adults=1&room_qty=1&units=metric&languagecode=en-us`,
        }),
    }),
});

// RTK Query auto-generates hooks for us based on the names above!
export const {
    useSearchDestinationQuery,
    useLazySearchDestinationQuery,
    useSearchHotelsQuery,
    useLazySearchHotelsQuery,
    useGetHotelDetailsQuery,
} = hotelApi;
