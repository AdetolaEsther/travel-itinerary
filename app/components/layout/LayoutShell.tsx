"use client";

import { useState } from "react";
import TopNav from "./Topnav";
import SideNav from "./Sidenav";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSideOpen, setIsSideOpen] = useState(false);

    return (
        <html lang="en">
            <body className="">

                <div className="flex">
                    <SideNav
                        isOpen={isSideOpen}
                        onClose={() => setIsSideOpen(false)}
                    />

                    <div className="flex-1">
                        <TopNav onMenuClick={() => setIsSideOpen(true)} />
                        <main className="p-4">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
