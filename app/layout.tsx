import LayoutShell from "./components/layout/LayoutShell";
import "./globals.css";
import { StoreProvider } from "./store/provider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <LayoutShell>{children}</LayoutShell>
                </StoreProvider>
            </body>
        </html>
    );
}
