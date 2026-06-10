import { NextRequest, NextResponse } from "next/server";

const ALLOWED_SERVICES = new Set(["flights", "hotels", "attraction"]);

function readEnv(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback ?? "";
    return value.trim().replace(/^['"]|['"]$/g, "");
}

const RAPID_API_KEY = readEnv("RAPID_API_KEY");
const RAPID_API_HOST = readEnv(
    "RAPID_API_HOST",
    "booking-com15.p.rapidapi.com",
);

async function proxyRapidApi(
    request: NextRequest,
    service: string,
    path: string[],
) {
    if (!ALLOWED_SERVICES.has(service)) {
        return NextResponse.json(
            { message: `Unsupported RapidAPI service: ${service}` },
            { status: 400 },
        );
    }

    if (!RAPID_API_KEY) {
        return NextResponse.json(
            { message: "RapidAPI key is not configured on the server." },
            { status: 500 },
        );
    }

    const endpoint = path.join("/");
    const search = request.nextUrl.search;
    const url = `https://${RAPID_API_HOST}/api/v1/${service}/${endpoint}${search}`;

    const response = await fetch(url, {
        method: request.method,
        headers: {
            "x-rapidapi-key": RAPID_API_KEY,
            "x-rapidapi-host": RAPID_API_HOST,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        cache: "no-store",
    });

    const data = await response.json().catch(() => ({
        message: "Invalid response from RapidAPI",
    }));

    return NextResponse.json(data, { status: response.status });
}

type RouteContext = {
    params: Promise<{ service: string; path: string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
    const { service, path } = await context.params;
    return proxyRapidApi(request, service, path);
}
