"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import ActivityCard from "@/app/components/ActivityCard";
import Link from "next/link";
import { useLazySearchAttractionsQuery, useLazySearchLocationQuery } from "../services/activitesApi";

const sortOptions = ["Top Rated", "Price: Low", "Duration"];
const categoryFilters = ["All", "Museums", "Tours", "Nature", "Shows", "Food"];

export default function ActivitySearchPage() {

    const [triggerLocation] = useLazySearchLocationQuery();
    const [triggerActivities, { data: activityResults, isLoading }] =
        useLazySearchAttractionsQuery();

console.log(activityResults);
    const [locationId, setLocationId] = useState<string | null>(null);
    
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);
    const [activeSort, setActiveSort] = useState("Top Rated");
    const [activeCategory, setActiveCategory] = useState("All");
    const [addedActivities, setAddedActivities] = useState<number[]>([]);
const handleSearch = async () => {
    try {
        const res = await triggerLocation(destination).unwrap();

        console.log("LOCATION RESPONSE RAW:", res);

        const first = res?.data?.[0] || res?.[0] || res?.results?.[0];

        if (!first) {
            console.log("No location found");
            return;
        }

        const id = first?.id || first?.dest_id || first?.ufi;

        if (!id) {
            console.log("No valid location ID found:", first);
            return;
        }

        setLocationId(id);

        const activities = await triggerActivities({
            id,
            page: 1,
        }).unwrap();

        console.log("ACTIVITIES:", activities);

        setHasSearched(true);
    } catch (err) {
        console.error("Activity search failed:", err);
    }
};
    const handleAdd = (index: number) => {
        setAddedActivities((prev) =>
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
                        Search Activities
                    </h1>
                    <p className="text-xs text-gray-400">
                        Find and add activities to your itinerary
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
                                placeholder="City or area to explore"
                            />
                        </div>
                    </div>

                    {/* Date + Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">
                                Date
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
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent text-sm text-gray-800 outline-none w-full"
                                />
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
                        Search Activities
                    </button>
                </div>
            </div>

            {/* Results */}
            {hasSearched && (
                <div className="px-6 pb-10 flex flex-col gap-4">
                    {/* Results header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {activityResults?.data.length} activities found
                            </h2>
                            <p className="text-xs text-gray-400">
                                {destination || "All destinations"} · {guests}{" "}
                                guest{guests > 1 ? "s" : ""}
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

                    {/* Category filter pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {categoryFilters.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                                style={
                                    activeCategory === cat
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
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Activity cards with Add button */}
                    {(activityResults?.data || []).map(
                        (activity: any, i: number) => {
                            const added = addedActivities.includes(i);

                            return (
                                <div
                                    key={activity.id || i}
                                    className="flex flex-col"
                                >
                                    <ActivityCard
                                        name={activity.name}
                                        description={activity.shortDescription}
                                        rating={activity.rating}
                                        reviews={activity.reviews}
                                        price={activity.price?.amount}
                                        duration={activity.duration}
                                        included={activity.included}
                                    />

                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={() => handleAdd(i)}
                                            className="flex items-center gap-2 px-5 py-2 rounded text-sm font-semibold"
                                            style={
                                                added
                                                    ? {
                                                          backgroundColor:
                                                              "#dcfce7",
                                                          color: "#16a34a",
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              theme.colors
                                                                  .primary,
                                                          color: "#fff",
                                                      }
                                            }
                                        >
                                            <Icon
                                                icon={
                                                    added
                                                        ? "mdi:check"
                                                        : "mdi:plus"
                                                }
                                                width="16"
                                            />
                                            {added
                                                ? "Added"
                                                : "Add to itinerary"}
                                        </button>
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            )}

            {/* Empty state */}
            {!hasSearched && (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${theme.colors.primary}15` }}
                    >
                        <Icon
                            icon="mingcute:road-line"
                            width="32"
                            height="32"
                            style={{ color: theme.colors.primary }}
                        />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base mb-1">
                        Search for activities
                    </h3>
                    <p className="text-sm text-gray-400 max-w-[260px]">
                        Enter a destination and date to discover things to do
                    </p>
                </div>
            )}
        </div>
    );
}
