"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    ChartPieSlice,
    Wallet,
    ListChecks,
    HandCoins,
    MagnifyingGlass,
    Bell,
    Basket,
    PlusSquare,
    CaretDown,
    List as MenuIcon,
    type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { theme } from "@/app/theme";

interface TopNavProps {
    onMenuClick: () => void;
}

type NavItem = {
    label: string;
    href: string;
    icon: PhosphorIcon;
};

const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: House },
    { label: "Dashboard", href: "/dashboard", icon: ChartPieSlice },
    { label: "Wallet", href: "/wallet", icon: Wallet },
    { label: "Plan a trip", href: "/plan-a-trip", icon: ListChecks },
    { label: "Commission for life", href: "/commission", icon: HandCoins },
];

const TopNav = ({ onMenuClick }: TopNavProps) => {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
            <nav className="h-[112px] px-4 lg:px-10 flex items-center gap-6">
                {/* LEFT: menu (mobile) + logo + search */}
                <div className="flex items-center gap-7 shrink-0">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden flex items-center justify-center"
                        aria-label="Open menu"
                    >
                        <MenuIcon size={28} className="text-gray-700" />
                    </button>

                    <Link href="/" className="flex items-center">
                        <div
                            className="flex items-center justify-center w-[56px] h-[56px] rounded p-2"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-2 bg-[#f0f2f5] rounded px-3 h-[56px] w-[400px]">
                        <MagnifyingGlass
                            size={24}
                            className="text-[#647995] shrink-0"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-[16px] text-gray-700 placeholder-[#647995] outline-none w-full font-normal tracking-[-0.5px]"
                        />
                    </div>
                </div>

                {/* CENTER: nav items */}
                <div className="hidden lg:flex flex-1 items-start justify-center gap-6 pt-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-2 transition-colors group"
                            >
                                <Icon
                                    size={32}
                                    weight={isActive ? "fill" : "regular"}
                                    className={
                                        isActive
                                            ? "text-[#1D2433]"
                                            : "text-[#647995] group-hover:text-[#1D2433]"
                                    }
                                />
                                <span
                                    className={`text-[16px] font-medium leading-6 tracking-[-0.5px] whitespace-nowrap ${
                                        isActive
                                            ? "text-[#1D2433]"
                                            : "text-[#647995] group-hover:text-[#1D2433]"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* RIGHT: divider + subscribe + actions + profile */}
                <div className="flex items-center shrink-0">
                    <div className="hidden lg:block w-px h-12 bg-gray-200" />

                    <button
                        className="hidden md:flex items-center justify-center text-white text-sm font-medium px-4 h-[40px] rounded transition-opacity hover:opacity-90 whitespace-nowrap mx-8"
                        style={{ backgroundColor: "#0D6EFD" }}
                    >
                        Subscribe
                    </button>

                    <div className="hidden md:flex items-start gap-6 pt-1 mr-6">
                        <button className="flex flex-col items-center gap-2 transition group">
                            <Bell
                                size={32}
                                className="text-[#647995] group-hover:text-[#1D2433]"
                            />
                            <span className="text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#647995] group-hover:text-[#1D2433] whitespace-nowrap">
                                Notification
                            </span>
                        </button>

                        <button className="flex flex-col items-center gap-2 transition group">
                            <Basket
                                size={32}
                                className="text-[#647995] group-hover:text-[#1D2433]"
                            />
                            <span className="text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#647995] group-hover:text-[#1D2433] whitespace-nowrap">
                                Carts
                            </span>
                        </button>

                        <button className="flex flex-col items-center gap-2 transition group">
                            <PlusSquare
                                size={32}
                                className="text-[#647995] group-hover:text-[#1D2433]"
                            />
                            <span className="text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#647995] group-hover:text-[#1D2433] whitespace-nowrap">
                                Create
                            </span>
                        </button>
                    </div>

                    <button className="flex items-center gap-[15px]">
                        <img
                            src="https://i.pravatar.cc/100"
                            className="w-[52px] h-[52px] rounded-full object-cover"
                            alt="avatar"
                        />
                        <CaretDown
                            size={24}
                            className="text-[#647995] shrink-0"
                        />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default TopNav;
