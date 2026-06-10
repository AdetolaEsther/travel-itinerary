"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";

interface FlightCardProps {
    airline: string;
    flightCode: string;
    flightClass: string;
    departureTime: string;
    departureDate: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalAirport: string;
    duration: string;
    stopType: string;
    price: string;
    facilities: string[];
}

const FlightCard = ({
    airline,
    flightCode,
    flightClass,
    departureTime,
    departureDate,
    departureAirport,
    arrivalTime,
    arrivalDate,
    arrivalAirport,
    duration,
    stopType,
    price,
    facilities,
}: FlightCardProps) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="w-full rounded border border-gray-200 bg-[white] overflow-hidden flex">
            <div className="flex-1 flex flex-col divide-y divide-gray-100">
                <div className="flex items-center justify-between gap-6 px-6 py-5">
                    <div className="flex items-center gap-3 w-[200px] shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/american_airlines_symbol.svg.png"
                                alt={airline}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">
                                {airline}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-400">
                                    {flightCode}
                                </span>
                                <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded bg-[#0A369D]">
                                    {flightClass}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-center shrink-0 w-[80px]">
                            <p className="text-2xl font-bold text-gray-900">
                                {departureTime}
                            </p>
                            <p className="text-xs text-gray-400">
                                {departureDate}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="w-[280px] flex flex-col gap-1">
                                <div className="flex items-center justify-between w-full text-gray-400">
                                    <Icon
                                        icon="mingcute:flight-takeoff-line"
                                        width="20"
                                        height="20"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Duration: {duration}
                                    </p>
                                    <Icon
                                        icon="mingcute:flight-land-line"
                                        width="20"
                                        height="20"
                                    />
                                </div>
                                <div className="relative w-full h-1.5 bg-gray-100 rounded">
                                    <div
                                        className="absolute left-0 top-0 h-full rounded-full"
                                        style={{
                                            backgroundColor:
                                                theme.colors.primary,
                                            width: "45%",
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-xs font-bold text-gray-700">
                                        {departureAirport}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {stopType}
                                    </span>
                                    <span className="text-xs font-bold text-gray-700">
                                        {arrivalAirport}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center shrink-0 w-[80px]">
                            <p className="text-2xl font-bold text-gray-900">
                                {arrivalTime}
                            </p>
                            <p className="text-xs text-gray-400">
                                {arrivalDate}
                            </p>
                        </div>
                    </div>
                    <div className="text-right shrink-0 w-[160px]">
                        <p className="text-2xl font-bold text-gray-900">
                            ₦ {price}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 px-6 py-3 flex-wrap">
                    <span className="text-xs text-gray-500 font-medium">
                        Facilities:
                    </span>
                    {facilities.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-gray-600"
                        >
                            <Icon
                                icon={
                                    item.toLowerCase().includes("baggage")
                                        ? "mdi:bag-suitcase-outline"
                                        : item
                                                .toLowerCase()
                                                .includes("entertainment")
                                          ? "mdi:movie-open"
                                          : item.toLowerCase().includes("meal")
                                            ? "mdi:food-fork-drink"
                                            : "ph:usb"
                                }
                                width="15"
                                height="15"
                                className="text-gray-400"
                            />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            className="text-sm font-semibold"
                            style={{ color: theme.colors.primary }}
                        >
                            Flight details
                        </button>
                        <button
                            className="text-sm font-semibold"
                            style={{ color: theme.colors.primary }}
                        >
                            Price details
                        </button>
                    </div>
                    <button
                        className="text-sm font-semibold"
                        style={{ color: theme.colors.primary }}
                    >
                        Edit details
                    </button>
                </div>
            </div>

            <button
                onClick={() => setDismissed(true)}
                className="w-10 flex items-center justify-center bg-red-50 hover:bg-red-100 transition shrink-0"
            >
                <Icon
                    icon="mdi:close"
                    width="18"
                    height="18"
                    className="text-red-400"
                />
            </button>
        </div>
    );
};

export default FlightCard;
