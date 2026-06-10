
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import Link from "next/link";
import HotelCard from "../components/Hotelcard";
import { useDispatch } from "react-redux";
import {
    useLazySearchDestinationQuery,
    useSearchHotelsQuery,
} from "../services/hotelApi";
import { addHotel, removeHotel } from "../store/itinerarySlice";

interface HotelSearchParams {
    dest_id: string;
    search_type: string;
    arrival_date: string;
    departure_date: string;
    adults: number;
    room_qty: number;
}

const resolveDestination = (res: { data?: unknown }) => {
    const data = res?.data;
    if (Array.isArray(data)) return data[0];
    if (data && typeof data === "object" && "destinations" in data) {
        const destinations = (data as { destinations?: unknown[] })
            .destinations;
        if (Array.isArray(destinations)) return destinations[0];
    }
    return null;
};

const mapHotelsToCards = (
    hotels: Array<{
        hotel_id: number | string;
        property?: {
            name?: string;
            reviewScore?: number;
            reviewCount?: number;
            propertyClass?: number;
            wishlistName?: string;
        };
        priceBreakdown?: { grossPrice?: { value?: number } };
    }> = [],
    checkIn?: string,
    checkOut?: string,
) =>
    hotels.map((hotel) => {
        const property = hotel.property || {};
        const priceValue = hotel.priceBreakdown?.grossPrice?.value;
        const formattedPrice =
            priceValue != null
                ? Number(priceValue).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                  })
                : undefined;

        return {
            hotel_id: String(hotel.hotel_id),
            name: property.name || "Hotel",
            address: property.wishlistName || "",
            rating: property.reviewScore,
            reviews: property.reviewCount,
            roomType: property.propertyClass
                ? `${property.propertyClass}-star property`
                : undefined,
            price: formattedPrice,
            totalPrice: formattedPrice,
            checkIn,
            checkOut,
        };
    });

// const staticHotels = [
//     {
//         name: "Riviera Resort, Lekki",
//         address:
//             "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
//         rating: 8.5,
//         reviews: 436,
//         roomType: "King size room",
//         price: "123,450.00",
//         totalPrice: "560,000",
//         roomNightsSummary: "1 room x 10 nights incl. taxes",
//         facilities: ["Pool", "Bar"],
//         checkIn: "20-04-2024",
//         checkOut: "29-04-2024",
//     },
//     {
//         name: "Eko Hotels & Suites",
//         address: "Plot 1415, Adetokunbo Ademola Street, Victoria Island, Lagos",
//         rating: 9.1,
//         reviews: 812,
//         roomType: "Deluxe Suite",
//         price: "210,000.00",
//         totalPrice: "980,000",
//         roomNightsSummary: "1 room x 10 nights incl. taxes",
//         facilities: ["Pool", "Spa", "Bar"],
//         checkIn: "20-04-2024",
//         checkOut: "29-04-2024",
//     },
//     {
//         name: "The George Hotel",
//         address: "11 Maitland Street, Gardens, Cape Town, 8001, South Africa",
//         rating: 8.8,
//         reviews: 524,
//         roomType: "Standard Room",
//         price: "87,200.00",
//         totalPrice: "392,400",
//         roomNightsSummary: "1 room x 10 nights incl. taxes",
//         facilities: ["Pool", "Restaurant"],
//         checkIn: "20-04-2024",
//         checkOut: "29-04-2024",
//     },
//     {
//         name: "Transcorp Hilton Abuja",
//         address: "1 Aguiyi Ironsi Street, Maitama District, Abuja, Nigeria",
//         rating: 8.3,
//         reviews: 1024,
//         roomType: "Executive Room",
//         price: "156,800.00",
//         totalPrice: "705,600",
//         roomNightsSummary: "1 room x 10 nights incl. taxes",
//         facilities: ["Pool", "Gym", "Bar"],
//         checkIn: "20-04-2024",
//         checkOut: "29-04-2024",
//     },
// ];

const sortOptions = ["Top Rated", "Cheapest", "Most Reviewed"];
const starFilters = ["Any", "3★", "4★", "5★"];

export default function HotelSearchPage() {
    const dispatch = useDispatch();

    const [triggerDestination] = useLazySearchDestinationQuery();

    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(2);
    const [searchParams, setSearchParams] = useState<HotelSearchParams | null>(
        null,
    );
    const [activeSort, setActiveSort] = useState("Top Rated");
    const [activeStar, setActiveStar] = useState("Any");
    const [addedHotels, setAddedHotels] = useState<string[]>([]);

    const {
        data: hotelResults,
        isFetching: isSearchingHotels,
        error: hotelError,
    } = useSearchHotelsQuery(searchParams!, { skip: !searchParams });

    const cleanHotels = mapHotelsToCards(
        hotelResults?.data?.hotels,
        searchParams?.arrival_date,
        searchParams?.departure_date,
    );

    const handleSearchSubmit = async () => {
        if (!destination.trim()) {
            alert("Please enter a destination");
            return;
        }
        if (!checkIn || !checkOut) {
            alert("Please select check-in and check-out dates");
            return;
        }

        try {
            const res = await triggerDestination(destination.trim()).unwrap();
            const firstDest = resolveDestination(res);

            if (!firstDest?.dest_id) {
                alert("Destination not found");
                return;
            }

            setSearchParams({
                dest_id: String(firstDest.dest_id),
                search_type: firstDest.search_type || "CITY",
                arrival_date: checkIn,
                departure_date: checkOut,
                adults: guests,
                room_qty: rooms,
            });
        } catch {
            alert("Failed to search hotels. Please try again.");
        }
    };

    const handleItineraryToggle = (hotel: (typeof cleanHotels)[number]) => {
        const isAlreadyAdded = addedHotels.includes(hotel.hotel_id);

        if (isAlreadyAdded) {
            setAddedHotels((prev) =>
                prev.filter((id) => id !== hotel.hotel_id),
            );
            dispatch(removeHotel(hotel.hotel_id));
        } else {
            setAddedHotels((prev) => [...prev, hotel.hotel_id]);
            dispatch(addHotel(hotel));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center w-9 h-9 rounded bg-gray-100 hover:bg-gray-200 transition"
                >
                    <Icon
                        icon="mdi:arrow-left"
                        width="20"
                        height="20"
                        className="text-gray-600"
                    />
                </Link>
                <div>
                    <h1 className="font-bold text-gray-900 text-lg">
                        Search Hotels
                    </h1>
                    <p className="text-xs text-gray-400">
                        Find and add hotels to your itinerary
                    </p>
                </div>
            </div>

            {/* Search Form */}
            <div className="px-6 py-6">
                <div className="bg-white rounded border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
                    {/* Destination */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-500">
                            Destination
                        </label>
                        <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                            <Icon
                                icon="mdi:map-marker-outline"
                                width="18"
                                height="18"
                                className="text-gray-400 shrink-0"
                            />
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="bg-transparent text-sm text-gray-800 outline-none w-full placeholder-gray-400"
                                placeholder="City, region or hotel name"
                            />
                        </div>
                    </div>

                    {/* Check-in / Check-out */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Check-in
                            </label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:calendar-outline"
                                    width="18"
                                    height="18"
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Check-out
                            </label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:calendar-outline"
                                    width="18"
                                    height="18"
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                    className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rooms + Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Rooms
                            </label>
                            <div className="flex items-center gap-3 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:door-open"
                                    width="18"
                                    height="18"
                                    className="text-gray-400"
                                />
                                <button
                                    onClick={() =>
                                        setRooms((r) => Math.max(1, r - 1))
                                    }
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition font-bold text-sm"
                                >
                                    −
                                </button>
                                <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                                    {rooms}
                                </span>
                                <button
                                    onClick={() => setRooms((r) => r + 1)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition font-bold text-sm"
                                >
                                    +
                                </button>
                                <span className="text-xs text-gray-400 ml-1">
                                    room{rooms > 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Guests
                            </label>
                            <div className="flex items-center gap-3 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:account-outline"
                                    width="18"
                                    height="18"
                                    className="text-gray-400"
                                />
                                <button
                                    onClick={() =>
                                        setGuests((g) => Math.max(1, g - 1))
                                    }
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition font-bold text-sm"
                                >
                                    −
                                </button>
                                <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                                    {guests}
                                </span>
                                <button
                                    onClick={() => setGuests((g) => g + 1)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition font-bold text-sm"
                                >
                                    +
                                </button>
                                <span className="text-xs text-gray-400 ml-1">
                                    guest{guests > 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Search button */}
                    <button
                        onClick={handleSearchSubmit}
                        disabled={isSearchingHotels}
                        className="w-full py-3.5 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        {isSearchingHotels
                            ? "Searching Hotels..."
                            : "Search Hotels"}
                    </button>
                </div>
            </div>

            {/* Results */}
            {searchParams && (
                <div className="px-6 pb-10 flex flex-col gap-4">
                    {hotelError && (
                        <p className="text-red-500 text-center text-sm">
                            Failed to load hotels. Please try again.
                        </p>
                    )}

                    {/* Results header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {cleanHotels.length} hotels found
                            </h2>
                            <p className="text-xs text-gray-400">
                                {destination || "All destinations"} · {rooms}{" "}
                                room
                                {rooms > 1 ? "s" : ""} · {guests} guest
                                {guests > 1 ? "s" : ""}
                            </p>
                        </div>

                        {/* Sort tabs */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setActiveSort(opt)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                    style={
                                        activeSort === opt
                                            ? {
                                                  backgroundColor: "#fff",
                                                  color: theme.colors.primary,
                                                  boxShadow:
                                                      "0 1px 3px rgba(0,0,0,0.1)",
                                              }
                                            : { color: "#6b7280" }
                                    }
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Star filter pills */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-medium">
                            Stars:
                        </span>
                        {starFilters.map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveStar(s)}
                                className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                                style={
                                    activeStar === s
                                        ? {
                                              backgroundColor:
                                                  theme.colors.primary,
                                              color: "#fff",
                                              borderColor: theme.colors.primary,
                                          }
                                        : {
                                              backgroundColor: "#fff",
                                              color: "#6b7280",
                                              borderColor: "#e5e7eb",
                                          }
                                }
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {cleanHotels.length === 0 && !isSearchingHotels && (
                        <p className="text-sm text-gray-500 text-center py-8">
                            No hotels found for this destination
                        </p>
                    )}

                    {/* Hotel cards with Add button */}
                    {cleanHotels.map((hotel) => {
                        const added = addedHotels.includes(hotel.hotel_id);

                        return (
                            <div key={hotel.hotel_id} className="flex flex-col">
                                <HotelCard {...hotel} />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() =>
                                            handleItineraryToggle(hotel)
                                        }
                                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                                        style={
                                            added
                                                ? {
                                                      backgroundColor:
                                                          "#dcfce7",
                                                      color: "#16a34a",
                                                  }
                                                : {
                                                      backgroundColor:
                                                          theme.colors.primary,
                                                      color: "#fff",
                                                  }
                                        }
                                    >
                                        <Icon
                                            icon={
                                                added ? "mdi:check" : "mdi:plus"
                                            }
                                            width="16"
                                        />
                                        {added
                                            ? "Added to itinerary"
                                            : "Add to itinerary"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!searchParams && (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                        <Icon
                            icon="mdi:bed-outline"
                            width="32"
                            height="32"
                            style={{ color: theme.colors.primary }}
                        />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base mb-1">
                        Search for hotels
                    </h3>
                    <p className="text-sm text-gray-400 max-w-[260px]">
                        Enter a destination and dates to find available hotels
                    </p>
                </div>
            )}
        </div>
    );
}
