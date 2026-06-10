"use client";

import Image from "next/image";
import { theme } from "./theme";
import { Icon } from "@iconify/react";
import FlightCard from "./components/Flightcard";
import HotelCard from "./components/Hotelcard";
import ActivityCard from "./components/ActivityCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ItineraryHotel } from "./types/itinerary";

const tripCards = [
    {
        title: "Activities",
        description:
            "Build, personalize, and optimize your itineraries with our trip planner.",
        buttonLabel: "Add Activities",
        href: "/activities",
        bgColor: theme.colors.secondary,
        buttonBgColor: theme.colors.primary,
        buttonTextColor: "#fff",
        titleColor: "#fff",
        descColor: "rgba(255,255,255,0.8)",
    },
    {
        title: "Hotels",
        description:
            "Build, personalize, and optimize your itineraries with our trip planner.",
        buttonLabel: "Add Hotels",
        href: "/hotels",
        bgColor: "#eef3fb",
        buttonBgColor: theme.colors.primary,
        buttonTextColor: "#fff",
        titleColor: "#1a1a2e",
        descColor: "#6b7280",
    },
    {
        title: "Flights",
        description:
            "Build, personalize, and optimize your itineraries with our trip planner.",
        buttonLabel: "Add Flights",
        href: "/flights",
        bgColor: theme.colors.primary,
        buttonBgColor: "#fff",
        buttonTextColor: theme.colors.primary,
        titleColor: "#fff",
        descColor: "rgba(255,255,255,0.8)",
    },
];



export default function Home() {
  const itineraryFlights = useSelector(
      (state: RootState) => state.itinerary.flights,
  );
   const itineraryHotels = useSelector(
       (state: RootState) => state.itinerary.hotels,
   );
  const activities = useSelector(
      (state: RootState) => state.itinerary.activities,
  );

  console.log({ itineraryFlights });
    return (
        <div className="w-full flex flex-col bg-white">
            <section id="home" className="w-full">
                <div className="relative w-full h-[220px] overflow-hidden">
                    <Image
                        src="/banner.png"
                        alt="Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded p-2">
                        <Icon
                            icon="material-symbols:arrow-back"
                            width="28"
                            height="28"
                            className="text-gray-800"
                        />
                    </button>
                </div>

                <div className="px-4 md:px-10 lg:px-16 py-6 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded text-[#7A4504] bg-[#fef3e2] text-sm font-medium ">
                                <Icon
                                    icon="mdi:calendar-outline"
                                    width="16"
                                    height="16"
                                />
                                <span>21 March 2024</span>
                                <Icon
                                    icon="mdi:arrow-right"
                                    width="14"
                                    height="14"
                                />
                                <span>21 April 2024</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Bahamas Family Trip
                            </h1>

                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span>New York,</span>
                                <span className="font-semibold text-gray-700">
                                    United States of America
                                </span>
                                <div className="w-px h-4 bg-gray-300 mx-1" />
                                <span>Solo Trip</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 shrink-0">
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-8 py-2 rounded  bg-[#e6f0ff] text-sm text-gray-500 shadow-sm">
                                    <Icon
                                        icon="mdi:account-plus-outline"
                                        width="20"
                                        height="20"
                                        color={theme.colors.primary}
                                    />
                                </button>
                                <Icon
                                    icon="mdi:dots-horizontal"
                                    width="20"
                                    height="20"
                                    className="text-gray-500"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full border-2 border-white shadow object-cover"
                                />
                                <button className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition shadow-sm">
                                    <Icon
                                        icon="mdi:cog-outline"
                                        width="20"
                                        height="20"
                                        className="text-gray-500"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 mt-2 overflow-x-auto ">
                        {tripCards.map(
                            ({
                                title,
                                description,
                                buttonLabel,
                                href,
                                bgColor,
                                buttonBgColor,
                                buttonTextColor,
                                titleColor,
                                descColor,
                            }) => (
                                <div
                                    key={title}
                                    className="rounded border border-gray-200 p-6 flex flex-col justify-between shrink-0 shadow-sm"
                                    style={{
                                        backgroundColor: bgColor,
                                        width: 270,
                                        height: 193,
                                    }}
                                >
                                    <h3
                                        className="font-bold text-lg"
                                        style={{ color: titleColor }}
                                    >
                                        {title}
                                    </h3>
                                    <p
                                        className="text-sm leading-relaxed flex-1"
                                        style={{ color: descColor }}
                                    >
                                        {description}
                                    </p>
                                    <Link href={href}>
                                        <button
                                            className="text-sm font-semibold px-2 py-2 mb-2 rounded transition-opacity hover:opacity-90 w-full"
                                            style={{
                                                backgroundColor: buttonBgColor,
                                                color: buttonTextColor,
                                            }}
                                        >
                                            {buttonLabel}
                                        </button>
                                    </Link>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </section>
            <section id="itinerary" className="w-full ">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 py-2">
                    Trip itineraries{" "}
                </h2>
                <p className="text-gray-600 mb-6">
                    Your trip itineraries are placed here
                </p>

                <div className="flex flex-col gap-4 p-4 bg-[#f0f2f5]">
                    <div className="flex items-center justify-between mb-2 bg-[#f0f2f5]">
                        <div className="flex items-center gap-2">
                            <Icon
                                icon="mingcute:flight-inflight-line"
                                width="22"
                                height="22"
                                className="text-gray-700"
                            />
                            <h2 className="text-xl font-bold text-gray-900">
                                Flights
                            </h2>
                        </div>
                        <a
                            className="text-sm font-semibold px-5 py-2 rounded bg-white transition hover:opacity-90"
                            style={{
                                color: theme.colors.primary,
                            }}
                            href="/flights"
                        >
                            Add Flights
                        </a>
                    </div>
                    {itineraryFlights?.length > 0 ? (
                        itineraryFlights.map((flight: any, i: number) => (
                            <FlightCard key={i} {...flight} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">
                            No flights added to itinerary yet
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-4 p-4 bg-[#344054] mt-6">
                    <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center gap-2">
                            <Icon
                                icon="icon-park-outline:building-four"
                                width="22"
                                height="22"
                                className="text-white"
                            />
                            <h2 className="text-xl font-bold text-white">
                                Hotels{" "}
                            </h2>
                        </div>
                        <a
                            className="text-sm font-semibold px-5 py-2 rounded bg-white text-[#344054] border-2 transition hover:opacity-90"
                            // style={{
                            //     color: theme.colors.primary,
                            //     borderColor: theme.colors.primary,
                            // }}
                            href="/hotels"
                        >
                            Add Hotels
                        </a>
                    </div>
                    <div className="flex flex-col gap-3 px-4 pb-4">
                        {itineraryHotels.length > 0 ? (
                            itineraryHotels.map((hotel: ItineraryHotel) => (
                                <HotelCard key={hotel.hotel_id} {...hotel} />
                            ))
                        ) : (
                            <p className="text-sm text-white/80">
                                No hotels added to itinerary yet
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className="rounded overflow-hidden mt-6"
                    style={{ backgroundColor: theme.colors.primary }}
                >
                    <div className="flex items-center justify-between px-5 py-4 ">
                        <div className="flex items-center gap-2">
                            <Icon
                                icon="mingcute:road-line"
                                width="22"
                                height="22"
                                className="text-white"
                            />
                            <h2 className="text-lg font-bold text-white">
                                Activities
                            </h2>
                        </div>
                        <a
                            className="text-sm font-semibold px-5 py-2 rounded bg-white transition hover:opacity-90"
                            style={{ color: theme.colors.primary }}
                            href="/activities"
                        >
                            Add Activities
                        </a>
                    </div>
                    <div className="flex flex-col gap-3 px-4 pb-4">
                        {activities.map((activity: any) => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
