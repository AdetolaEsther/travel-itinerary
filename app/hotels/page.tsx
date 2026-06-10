"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import Link from "next/link";
import HotelCard from "../components/Hotelcard";
import { useDispatch } from "react-redux";
import { useLazySearchDestinationQuery, useLazySearchHotelsQuery } from "../services/hotelApi";
import { addHotel } from "../store/itinerarySlice";


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
 const [triggerHotels, { data: hotelResults, isLoading, isError }] =
     useLazySearchHotelsQuery();

    const [destId, setDestId] = useState<string | null>(null);
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(2);
    const [hasSearched, setHasSearched] = useState(false);
    const [activeSort, setActiveSort] = useState("Top Rated");
    const [activeStar, setActiveStar] = useState("Any");
    const [addedHotels, setAddedHotels] = useState<number[]>([]);

 const handleSearch = async () => {
     if (!destination.trim()) {
         alert("Please enter a destination");
         return;
     }

     try {
         const res = await triggerDestination(destination).unwrap();
         console.log("DEST RESPONSE:", res);
         const firstDest = res?.data?.[0];
         if (!firstDest) {
             alert("Destination not found");
             return;
         }

         setDestId(firstDest.dest_id);

         await triggerHotels({
             dest_id: firstDest.dest_id,
             search_type: firstDest.search_type || "CITY",
             adults: guests,
             room_qty: rooms,
             page_number: 1,
         }).unwrap();

         setHasSearched(true);
     } catch (error) {
         console.error("Search error:", error);
         alert("Failed to search hotels. Please try again.");
     }
 };
console.log("HOTELS RESPONSE:", hotelResults);
    const handleAdd = (index: number) => {
        setAddedHotels((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
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
                        onClick={handleSearch}
                        className="w-full py-3.5 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        Search Hotels
                    </button>
                </div>
            </div>

            {isLoading && (
                <p className="text-sm text-gray-500 px-6">Loading hotels...</p>
            )}

            {isError && (
                <p className="text-sm text-red-500 px-6">
                    Failed to load hotels
                </p>
            )}

            {/* Results */}
            {hasSearched && (
                <div className="px-6 pb-10 flex flex-col gap-4">
                    {/* Results header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {hotelResults?.data.length} hotels found
                            </h2>
                            <p className="text-xs text-gray-400">
                                {destination || "All destinations"} · {rooms}{" "}
                                room{rooms > 1 ? "s" : ""} · {guests} guest
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

                    {/* Hotel cards with Add button */}
                    {(hotelResults?.data || []).map((hotel: any, i: number) => {
                        return (
                            <div key={hotel.hotel_id} className="flex flex-col">
                                <HotelCard
                                    name={hotel.name}
                                    address={hotel.address}
                                    rating={hotel.reviewScore}
                                    price={
                                        hotel.priceBreakdown?.grossPrice?.value
                                    }
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                addHotel({
                                                    id: hotel.hotel_id,
                                                    name: hotel.name,
                                                    address: hotel.address,
                                                    price: hotel.priceBreakdown
                                                        ?.grossPrice?.value,
                                                }),
                                            )
                                        }
                                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white"
                                    >
                                        Add to itinerary
                                    </button>
                                </div>{" "}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!hasSearched && (
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
