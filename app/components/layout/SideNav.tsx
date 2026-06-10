"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const navItems = [
    { label: "Activities", icon: "mingcute:road-line", href: "/activities" },
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

    return (
        <aside
            className="
        fixed top-[72px] left-4
        w-54 h-[calc(100vh-88px)]
        bg-white
        rounded
        shadow-lg
        flex flex-col justify-between p-3 gap-4
    "
        >
            {" "}
            {/* TOP NAV ITEMS */}
            <div className="flex flex-col gap-6 mt-6">

                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3  px-3 py-2 rounded hover:bg-gray-100 text-gray-400"
                    >
                        <Icon icon={item.icon} width="20" height="20" />
                        {item.label}
                    </Link>
                ))}
            </div>
            <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#f3f4f6" }}
            >
                <p className="text-xs text-gray-500 mb-2 font-medium">
                    Personal Account
                </p>

                
            </div>
        </aside>
    );
}
