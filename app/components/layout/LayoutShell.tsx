"use client";

import { useState } from "react";
import TopNav from "./Topnav";
import SideNav from "./SideNav";

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSideOpen, setIsSideOpen] = useState(false);

    return (
        
        <div className="min-h-screen bg-[#f5f6f8]">
            <TopNav onMenuClick={() => setIsSideOpen(true)} />

            <div className="h-[112px]" />

            <div className="flex items-start gap-[4rem] px-4 lg:px-10 pb-10 mt-[2.4375rem]">
                <SideNav
                    isOpen={isSideOpen}
                    onClose={() => setIsSideOpen(false)}
                />

                <main className="flex-1 min-w-0">
                    <div className="bg-white rounded shadow-[0_1px_2px_rgba(16,24,40,0.06)] p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
