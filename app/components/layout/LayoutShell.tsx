"use client";

import { useState } from "react";
import SideNav from "./SideNav";
import TopNav from "./Topnav";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSideOpen, setIsSideOpen] = useState(false);

    return (
        <html lang="en">
            <body>
                <TopNav onMenuClick={() => setIsSideOpen(true)} />

                <SideNav
                    isOpen={isSideOpen}
                    onClose={() => setIsSideOpen(false)}
                />

                {/* MAIN CONTENT */}
                <main className="pt-[72px] pl-64 p-4">{children}</main>
            </body>
        </html>
    );
}
