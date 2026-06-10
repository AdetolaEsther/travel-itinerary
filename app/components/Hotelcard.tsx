"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import Image from "next/image";

interface HotelCardProps {
    name?: string;
    address?: string;
    rating?: number;
    reviews?: number;
    roomType?: string;
    price?: string;
    totalPrice?: string;
    roomNightsSummary?: string;
    facilities?: string[];
    checkIn?: string;
    checkOut?: string;
}

const HotelCard = ({
    name,
    address,
    rating,
    reviews,
    roomType,
    price,
    totalPrice,
    roomNightsSummary,
    facilities,
    checkIn,
    checkOut,
}: HotelCardProps) => {
    const [dismissed, setDismissed] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    if (dismissed) return null;

    return (
        <div className="w-full rounded border border-gray-200 bg-white overflow-hidden flex">
            <div className="relative w-[246px] shrink-0 p-3">
                <div className="relative w-full h-full rounded overflow-hidden">
                    <Image
                        src="/Rectangle 3437.png"
                        alt={name || ""}
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={() => setImgIndex((i) => i - 1)}
                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-0.5"
                    >
                        <Icon
                            icon="mdi:chevron-left"
                            width="18"
                            height="18"
                            className="text-gray-700"
                        />
                    </button>
                    <button
                        onClick={() => setImgIndex((i) => i + 1)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-0.5"
                    >
                        <Icon
                            icon="mdi:chevron-right"
                            width="18"
                            height="18"
                            className="text-gray-700"
                        />
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y divide-gray-200">
                <div className="flex gap-4 p-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">
                                    {name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5 max-w-[340px]">
                                    {address}
                                </p>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-xl font-bold text-gray-900">
                                    ₦ {price}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Total Price: NGN {totalPrice}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {roomNightsSummary}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                            <button
                                className="flex items-center gap-1"
                                style={{ color: theme.colors.primary }}
                            >
                                <Icon
                                    icon="mdi:map-marker-outline"
                                    width="14"
                                    height="14"
                                />
                                <span>Show in map</span>
                            </button>
                            <div className="flex items-center gap-1">
                                <Icon
                                    icon="mdi:star"
                                    width="14"
                                    height="14"
                                    className="text-yellow-400"
                                />
                                <span className="font-medium text-gray-700">
                                    {rating}
                                </span>
                                <span>({reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icon
                                    icon="ph:bed-fill"
                                    width="14"
                                    height="14"
                                />
                                <span>{roomType}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-2">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-xs text-gray-500 font-medium">
                            Facilities:
                        </span>
                        {facilities?.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1 text-xs text-gray-600"
                            >
                                <Icon
                                    icon={
                                        f.toLowerCase().includes("pool")
                                            ? "mdi:pool"
                                            : "ph:wine"
                                    }
                                    width="14"
                                    height="14"
                                    className="text-gray-400"
                                />
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Icon
                                icon="mdi:calendar-outline"
                                width="14"
                                height="14"
                            />
                            <span>Check In: {checkIn}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon
                                icon="mdi:calendar-outline"
                                width="14"
                                height="14"
                            />
                            <span>Check Out: {checkOut}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            className="text-sm font-semibold"
                            style={{ color: theme.colors.primary }}
                        >
                            Hotel details
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

export default HotelCard;
