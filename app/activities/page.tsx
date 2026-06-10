"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import ActivityCard from "@/app/components/ActivityCard";
import Link from "next/link";
import { useSearchLocationQuery } from "../services/activitesApi";
import { useDispatch } from "react-redux";
import { addActivity } from "../store/itinerarySlice";

const sortOptions = ["Top Rated", "Price: Low", "Duration"];
const categoryFilters = ["All", "Museums", "Tours", "Nature", "Shows", "Food"];

const formatCategory = (slug?: string) =>
    (slug || "activity").replace(/-/g, " ");

interface AttractionProduct {
    id: string;
    title: string;
    productId: string;
    productSlug: string;
    taxonomySlug: string;
    cityName: string;
    countryCode?: string;
}

const mapProductsToActivities = (products: AttractionProduct[] = []) =>
    products.map((product) => {
        const category = formatCategory(product.taxonomySlug);
        const location = [product.cityName, product.countryCode?.toUpperCase()]
            .filter(Boolean)
            .join(", ");

        return {
            id: product.productId,
            name: product.title,
            description: `${category} in ${product.cityName}`,
            category,
            location,
            included: category,
            price: "On request",
            duration: category,
        };
    });

export default function ActivitySearchPage() {
    const dispatch = useDispatch();
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [activeSort, setActiveSort] = useState("Top Rated");
    const [activeCategory, setActiveCategory] = useState("All");
    const [addedActivities, setAddedActivities] = useState<string[]>([]);

    const {
        data: activityResults,
        isFetching: isSearchingActivities,
        error: activityError,
    } = useSearchLocationQuery(searchQuery!, { skip: !searchQuery });

    const cleanActivities = mapProductsToActivities(
        activityResults?.data?.products,
    );

    const handleSearchSubmit = () => {
        if (!destination.trim()) {
            alert("Please enter a destination");
            return;
        }

        setSearchQuery(destination.trim());
    };

   const handleAdd = (activity: any) => {
       dispatch(addActivity(activity));

       setAddedActivities((prev) =>
           prev.includes(activity.id) ? prev : [...prev, activity.id],
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
                        onClick={handleSearchSubmit}
                        disabled={isSearchingActivities}
                        className="w-full py-3.5 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        {isSearchingActivities
                            ? "Searching Activities..."
                            : "Search Activities"}
                    </button>
                </div>
            </div>

            {/* Results */}
            {searchQuery && (
                <div className="px-6 pb-10 flex flex-col gap-4">
                    {activityError && (
                        <p className="text-red-500 text-center text-sm">
                            Failed to load activities. Please try again.
                        </p>
                    )}
                    {/* Results header */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {cleanActivities.length} activities found
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

                    {cleanActivities.length === 0 && !isSearchingActivities && (
                        <p className="text-sm text-gray-500 text-center py-8">
                            No activities found for this destination
                        </p>
                    )}

                    {/* Activity cards with Add button */}
                    {cleanActivities.map((activity) => {
                        const added = addedActivities.includes(activity.id);

                        return (
                            <div key={activity.id} className="flex flex-col">
                                <ActivityCard {...activity} />

                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => handleAdd(activity)}
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
                                        {added ? "Added" : "Add to itinerary"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!searchQuery && (
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
