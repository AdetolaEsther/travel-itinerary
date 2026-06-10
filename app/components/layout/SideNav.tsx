"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const navItems = [
    { label: "Activities", icon: "mdi:map-marker-path", href: "/activities" },
    { label: "Hotels", icon: "mdi:hotel", href: "/hotels" },
    { label: "Flights", icon: "mdi:airplane", href: "/flights" },
    { label: "Study", icon: "mdi:school", href: "/study" },
    { label: "Visa", icon: "mdi:passport", href: "/visa" },
    { label: "Medical", icon: "mdi:hospital-box", href: "/medical" },
    { label: "Vacation Package", icon: "mdi:bag-suitcase", href: "/packages" },
];

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SideNav({ isOpen, onClose }: SideNavProps) {
    const [openAccount, setOpenAccount] = useState(false);

    return (
        <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between p-3">
            {/* TOP NAV ITEMS */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xs text-gray-400 px-2 mb-2">Explore</h2>

                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        <Icon icon={item.icon} width="20" height="20" />
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* MIDDLE CTA BOX */}
            <div className="p-3">
                <button className="w-full bg-blue-600 text-white rounded-xl p-3 text-left hover:bg-blue-700 transition">
                    <div className="font-semibold">
                        Go and Personal Accounts
                    </div>
                    <div className="text-xs opacity-80">
                        Manage bookings, wallet & profile
                    </div>
                </button>

                {/* DROPDOWN SECTION */}
                <button
                    onClick={() => setOpenAccount(!openAccount)}
                    className="mt-3 text-sm text-gray-600 flex items-center justify-between w-full px-2"
                >
                    What’s in there?
                    <Icon
                        icon={openAccount ? "ep:arrow-up" : "ep:arrow-down"}
                        width="16"
                    />
                </button>

                {openAccount && (
                    <div className="mt-2 bg-gray-50 rounded p-2 text-sm text-gray-600 space-y-2">
                        <div>👤 Profile</div>
                        <div>💳 Wallet</div>
                        <div>📦 Bookings</div>
                        <div>⚙️ Settings</div>
                    </div>
                )}
            </div>
        </aside>
    );
}
