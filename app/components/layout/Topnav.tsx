"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { theme } from "@/app/theme";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface TopNavProps {
    onMenuClick: () => void;
}

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: "material-symbols-light:home-outline-rounded",
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: "stash:chart-pie",
    },
    { label: "Wallet", href: "/wallet", icon: "iconoir:wallet" },
    {
        label: "Plan a Trip",
        href: "/plan-a-trip",
        icon: "solar:checklist-bold",
    },
    {
        label: "Commission for Life",
        href: "/commission",
        icon: "ph:hand-coins",
    },
];

const TopNav = ({ onMenuClick }: TopNavProps) => {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white  shadow-sm">
            {" "}
            <nav className="h-[72px] px-4 lg:px-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden flex items-center justify-center"
                    >
                        <Icon
                            icon="mdi:menu"
                            width="28"
                            height="28"
                            className="text-gray-700"
                        />
                    </button>

                    <Link href="/" className="flex items-center">
                        <div
                            className="flex items-center justify-center w-10 h-10 rounded"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-7 w-auto object-contain"
                            />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded px-4 py-2 w-[400px]">
                        <Icon
                            icon="mdi:magnify"
                            width="18"
                            height="18"
                            className="text-gray-400 shrink-0"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded transition-all duration-200 min-w-[64px] ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    }`}
                                    style={
                                        isActive
                                            ? {
                                                  backgroundColor:
                                                      theme.colors.primary,
                                              }
                                            : {}
                                    }
                                >
                                    <Icon
                                        icon={item.icon}
                                        width="22"
                                        height="22"
                                    />
                                    <span className="text-[11px] font-medium leading-tight whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden lg:block w-px h-8 bg-gray-200 mx-2" />
                    <button
                        className="hidden md:block text-white text-sm font-semibold px-4 py-2 rounded transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        Subscribe
                    </button>

                    <button className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition relative">
                        <div className="relative">
                            <Icon
                                icon="mingcute:notification-line"
                                width="22"
                                height="22"
                                className="text-gray-600"
                            />
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium hidden lg:block">
                            Notifications
                        </span>
                    </button>

                    <button className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition">
                        <Icon
                            icon="akar-icons:shopping-bag"
                            width="22"
                            height="22"
                            className="text-gray-600"
                        />
                        <span className="text-[10px] text-gray-500 font-medium hidden lg:block">
                            Carts
                        </span>
                    </button>

                    <button className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition">
                        <Icon
                            icon="qlementine-icons:new-16"
                            width="22"
                            height="22"
                            className="text-gray-600"
                        />
                        <span className="text-[10px] text-gray-500 font-medium hidden lg:block">
                            Creates
                        </span>
                    </button>

                    <button className="flex flex-col items-center gap-0.5 px-1 py-1 rounded hover:bg-gray-100 transition">
                        <img
                            src="https://i.pravatar.cc/100"
                            className="w-12 h-12 rounded-full border-2 border-white shadow object-cover"
                            alt="avatar"
                        />
                    </button>
                    <Icon
                        icon="ep:arrow-down"
                        width="18"
                        height="18"
                        className="text-gray-400 shrink-0"
                    />
                </div>
            </nav>
        </header>
    );
};

export default TopNav;
