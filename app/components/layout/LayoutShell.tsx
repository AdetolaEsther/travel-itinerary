"use client";

import { useState } from "react";
import TopNav from "./Topnav";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <html lang="en">
            <body className="">
                {/* <SideNav open={open} setOpen={setOpen} /> */}

                <div className=" min-h-screen">
                    <TopNav onMenuClick={() => setOpen(true)} />

                    <main className="p-4">{children}</main>
                </div>
            </body>
        </html>
    );
}
