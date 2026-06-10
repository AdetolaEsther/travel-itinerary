"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import Link from "next/link";
import FlightCard from "../components/Flightcard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToItinerary, removeFromItinerary } from "../store/itinerarySlice";
import { useSearchFlightsQuery } from "../services/flightApi";


export default function FlightSearchPage() {
    const dispatch = useDispatch();

    // Get currently added flights from Redux state to handle toggle states
    const addedFlights = useSelector(
        (state: RootState) => state.itinerary.flights,
    );

    // --- Search Inputs State ---
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
        "one-way",
    );
    const [passengers, setPassengers] = useState(1);
    const [cabinClass, setCabinClass] = useState("ECONOMY");
    const [departDate, setDepartDate] = useState("2026-06-11"); // Defaulting to your working date example
    const [returnDate, setReturnDate] = useState("");

    // --- Simple Manual Airport Codes ---
    const [fromCode, setFromCode] = useState("LOS");
    const [toCode, setToCode] = useState("DXB");

    // Flight search parameters trigger state
    const [searchParams, setSearchParams] = useState<{
        fromId: string;
        toId: string;
        departDate: string;
        cabinClass: string;
    } | null>(null);

    // This hook automatically triggers ONLY when searchParams is updated via submission
    const {
        data: flightResults,
        isFetching: isSearchingFlights,
        error: flightError,
    } = useSearchFlightsQuery(searchParams!, { skip: !searchParams });

    // --- Search Submission ---
    const handleSearchSubmit = () => {
        const cleanFrom = fromCode.trim().toUpperCase();
        const cleanTo = toCode.trim().toUpperCase();

        if (cleanFrom.length !== 3 || cleanTo.length !== 3) {
            alert(
                "Please enter valid 3-letter airport codes (e.g., LOS, DXB, BOM)",
            );
            return;
        }
        if (!departDate) {
            alert("Please choose a departure date.");
            return;
        }

        // Map manual inputs directly into the formats your working URL expects!
        setSearchParams({
            fromId: `${cleanFrom}.AIRPORT`, // Turns "LOS" into "LOS.AIRPORT"
            toId: `${cleanTo}.AIRPORT`, // Turns "DXB" into "DXB.AIRPORT"
            departDate,
            cabinClass,
        });
    };

    // --- Redux Actions ---
    const handleItineraryToggle = (flight: any) => {
        const isAlreadyAdded = addedFlights.some(
            (f: any) => f.flightCode === flight.flightCode,
        );
        if (isAlreadyAdded) {
            dispatch(removeFromItinerary(flight.flightCode));
        } else {
            // Step 4: Save processed flight components cleanly into Redux state
            dispatch(addToItinerary(flight));
        }
    };

    // --- Clean & Map API Response Objects safely into <FlightCard /> Props ---
   const cleanFlights =
       flightResults?.data?.flightOffers?.map((offer: any) => {
           const segment = offer?.segments?.[0];
           const leg = segment?.legs?.[0];
           const carrier = leg?.carriersData?.[0];
           const price = offer?.priceBreakdown?.total?.units || 0;
           const nanos = offer?.priceBreakdown?.total?.nanos || 0;

           const formattedPrice = (price + nanos / 1e9).toLocaleString(
               "en-NG",
               {
                   minimumFractionDigits: 2,
               },
           );

           return {
               airline: carrier?.name || "Airline",
               flightCode: leg?.flightInfo?.flightNumber || offer?.flightKey,
               flightClass: leg?.cabinClass || "Economy",

               departureTime:
                   segment?.departureTime?.split("T")[1]?.substring(0, 5) ||
                   "00:00",
               departureDate: segment?.departureTime?.split("T")[0] || "",
               departureAirport: segment?.departureAirport?.code || "N/A",

               arrivalTime:
                   segment?.arrivalTime?.split("T")[1]?.substring(0, 5) ||
                   "00:00",
               arrivalDate: segment?.arrivalTime?.split("T")[0] || "",
               arrivalAirport: segment?.arrivalAirport?.code || "N/A",

               duration: leg?.totalTime
                   ? `${Math.floor(leg.totalTime / 3600)}h ${Math.floor(
                         (leg.totalTime % 3600) / 60,
                     )}m`
                   : "N/A",

               stopType:
                   leg?.flightStops?.length === 0 ? "Direct" : "With stops",

               price: formattedPrice,

               facilities:
                   leg?.amenities?.length > 0
                       ? leg.amenities
                       : ["Baggage included", "In-flight entertainment"],
           };
       }) || [];
;

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
                        Search Flights
                    </h1>
                    <p className="text-xs text-gray-400">
                        Find and add flights directly to your itinerary
                    </p>
                </div>
            </div>

            {/* Search Form */}
            <div className="px-6 py-6">
                <div className="bg-white rounded border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
                    {/* Trip Type Toggle */}
                    <div className="flex items-center gap-2">
                        {(["one-way", "round-trip"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setTripType(type)}
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                style={
                                    tripType === type
                                        ? {
                                              backgroundColor:
                                                  theme.colors.primary,
                                              color: "#fff",
                                          }
                                        : {
                                              backgroundColor: "#f3f4f6",
                                              color: "#6b7280",
                                          }
                                }
                            >
                                {type === "one-way" ? "One-way" : "Round-trip"}
                            </button>
                        ))}
                    </div>

                    {/* From / To Code Manual Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                From (Airport Code)
                            </label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:airplane-takeoff"
                                    width="18"
                                    height="18"
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="text"
                                    maxLength={3}
                                    value={fromCode}
                                    onChange={(e) =>
                                        setFromCode(
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    className="bg-transparent text-sm font-semibold text-gray-800 outline-none w-full placeholder-gray-400 uppercase tracking-wider"
                                    placeholder="LOS"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                To (Airport Code)
                            </label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:airplane-landing"
                                    width="18"
                                    height="18"
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="text"
                                    maxLength={3}
                                    value={toCode}
                                    onChange={(e) =>
                                        setToCode(e.target.value.toUpperCase())
                                    }
                                    className="bg-transparent text-sm font-semibold text-gray-800 outline-none w-full placeholder-gray-400 uppercase tracking-wider"
                                    placeholder="DXB"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Departure & Return Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Departure Date
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
                                    value={departDate}
                                    onChange={(e) =>
                                        setDepartDate(e.target.value)
                                    }
                                    className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                />
                            </div>
                        </div>
                        {tripType === "round-trip" && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-500">
                                    Return Date
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
                                        value={returnDate}
                                        onChange={(e) =>
                                            setReturnDate(e.target.value)
                                        }
                                        className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Passenger & Cabin Setup */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Passengers
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
                                        setPassengers((p) => Math.max(1, p - 1))
                                    }
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold"
                                >
                                    −
                                </button>
                                <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                                    {passengers}
                                </span>
                                <button
                                    onClick={() => setPassengers((p) => p + 1)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Cabin Class
                            </label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 bg-gray-50">
                                <Icon
                                    icon="mdi:seat-passenger"
                                    width="18"
                                    height="18"
                                    className="text-gray-400 shrink-0"
                                />
                                <select
                                    value={cabinClass}
                                    onChange={(e) =>
                                        setCabinClass(e.target.value)
                                    }
                                    className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                >
                                    <option value="ECONOMY">Economy</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="FIRST">First Class</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Execution Button */}
                    <button
                        onClick={handleSearchSubmit}
                        disabled={isSearchingFlights}
                        className="w-full py-3.5 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        {isSearchingFlights
                            ? "Searching Flights..."
                            : "Search Flights"}
                    </button>
                </div>
            </div>

            {/* Live Search Results UI Mapping Block */}
            {searchParams && (
                <div className="px-6 pb-10 flex flex-col gap-4">
                    {flightError && (
                        <p className="text-red-500 text-center text-sm">
                            Failed to connect to Booking.com. Verify active keys
                            or endpoints.
                        </p>
                    )}

                    {cleanFlights.length > 0 && (
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {cleanFlights.length} Flights Available
                            </h2>
                            <p className="text-xs text-gray-400">
                                {fromCode} → {toCode} · {passengers}{" "}
                                Passenger(s) · {cabinClass.toLowerCase()}
                            </p>
                        </div>
                    )}

                    {cleanFlights.map((flight: any, i: number) => {
                        const isAdded = addedFlights.some(
                            (f: any) => f.flightCode === flight.flightCode,
                        );
                        return (
                            <div
                                key={i}
                                className="flex flex-col gap-0 bg-white p-2 rounded border border-gray-100 shadow-sm"
                            >
                                <FlightCard {...flight} />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() =>
                                            handleItineraryToggle(flight)
                                        }
                                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                                        style={
                                            isAdded
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
                                                isAdded
                                                    ? "mdi:check"
                                                    : "mdi:plus"
                                            }
                                            width="16"
                                            height="16"
                                        />
                                        {isAdded
                                            ? "Added to itinerary"
                                            : "Add to itinerary"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
