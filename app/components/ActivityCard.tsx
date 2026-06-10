"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import Image from "next/image";

interface ActivityCardProps {
    name: string;
    description: string;
    rating: number;
    reviews: number;
    duration: string;
    price: string;
    timeDate?: string;
    included: string;
    day?: string;
}

const ActivityCard = ({
    name,
    description,
    rating,
    reviews,
    duration,
    price,
    timeDate,
    included,
    day,
}: ActivityCardProps) => {
    const [dismissed, setDismissed] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    if (dismissed) return null;

    return (
        <div className="w-full rounded border border-gray-200 bg-white overflow-hidden flex">
            <div className="relative w-[246px] shrink-0 p-3">
                <div className="relative w-full h-full rounded overflow-hidden">
                    <Image
                        src="/Rectangle 3437-2.svg"
                        alt={name}
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
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-base">
                                    {name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5 max-w-[340px] leading-relaxed">
                                    {description}
                                </p>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end gap-2">
                                <div>
                                    <p className="text-xl font-bold text-gray-900">
                                        ₦ {price}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {timeDate}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] bg-[#0A369D] font-bold text-white px-3 py-1 rounded">
                                        {day}
                                    </span>
                                    <div className="flex flex-col gap-0.5">
                                        <button className="text-gray-300 hover:text-gray-500">
                                            <Icon
                                                icon="mdi:chevron-up"
                                                width="16"
                                                height="16"
                                            />
                                        </button>
                                        <button className="text-gray-300 hover:text-gray-500">
                                            <Icon
                                                icon="mdi:chevron-down"
                                                width="16"
                                                height="16"
                                            />
                                        </button>
                                    </div>
                                </div>
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
                                <span>Directions</span>
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
                                    icon="mdi:clock-outline"
                                    width="14"
                                    height="14"
                                />
                                <span>{duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 text-xs text-gray-500 flex-wrap">
                    <span className="font-medium">What's Included:</span>
                    <span>{included}</span>
                    <button
                        style={{ color: theme.colors.primary }}
                        className="font-semibold"
                    >
                        See more
                    </button>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            className="text-sm font-semibold"
                            style={{ color: theme.colors.primary }}
                        >
                            Activity details
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

export default ActivityCard;
