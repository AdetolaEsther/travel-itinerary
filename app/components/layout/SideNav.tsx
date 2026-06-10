"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    RoadHorizon,
    Buildings,
    AirplaneTilt,
    Student,
    NewspaperClipping,
    SuitcaseRolling,
    FirstAidKit,
    Package,
    CaretUpDown,
    type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

type NavItem = {
    label: string;
    href: string;
    icon: PhosphorIcon;
};

const navItems: NavItem[] = [
    { label: "Activities", href: "/activities", icon: RoadHorizon },
    { label: "Hotels", href: "/hotels", icon: Buildings },
    { label: "Flights", href: "/flights", icon: AirplaneTilt },
    { label: "Study", href: "/study", icon: Student },
    { label: "Visa", href: "/visa", icon: NewspaperClipping },
    { label: "Immigration", href: "/immigration", icon: SuitcaseRolling },
    { label: "Medical", href: "/medical", icon: FirstAidKit },
    { label: "Vacation Packages", href: "/packages", icon: Package },
];

export default function SideNav({ isOpen, onClose }: SideNavProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed lg:sticky
                    top-[112px] left-0
                    z-40
                    lg:h-auto h-[calc(100vh-112px)]
                    w-[300px] shrink-0
                    px-6 py-6
                    bg-white rounded
                    shadow-[0_1px_2px_rgba(16,24,40,0.06)]
                    flex flex-col gap-4
                    transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <nav className="flex flex-col gap-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`
                                    flex items-center gap-2
                                    px-3.5 py-3 rounded
                                    w-[252px]
                                    transition-colors
                                    ${
                                        isActive
                                            ? "bg-[#e6f0ff] text-[#0A6DE4]"
                                            : "bg-white text-[#647995] hover:bg-gray-50"
                                    }
                                `}
                            >
                                <Icon
                                    size={32}
                                    weight={isActive ? "fill" : "regular"}
                                />
                                <span className="font-medium text-[16px] leading-6 tracking-[-0.5px] whitespace-nowrap">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Personal Account card */}
                <button
                    type="button"
                    className="
                        flex items-center justify-between
                        bg-[#f0f2f5] rounded
                        w-[252px] h-[86px]
                        px-3.5
                        hover:bg-gray-200/70 transition-colors
                    "
                >
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded bg-[#0A6DE4]">
                            <span className="text-white font-semibold text-[16px] leading-6">
                                Go
                            </span>
                        </div>
                        <span className="font-medium text-[14px] leading-[22px] tracking-[-0.5px] text-[#647995]">
                            Personal Account
                        </span>
                    </div>
                    <CaretUpDown size={24} className="text-[#647995]" />
                </button>
            </aside>
        </>
    );
}
