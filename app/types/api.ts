export interface ApiResponse<T> {
    status: boolean;
    message?: string | Array<{ [key: string]: string }>;
    timestamp?: number;
    data: T;
}

// --- Flights ---

export interface FlightDestination {
    id?: string;
    dest_id?: string;
    name?: string;
    type?: string;
}

export interface FlightPriceTotal {
    units?: number;
    nanos?: number;
}

export interface FlightOffer {
    flightKey?: string;
    segments?: FlightSegment[];
    priceBreakdown?: {
        total?: FlightPriceTotal;
    };
}

export interface FlightSegment {
    departureTime?: string;
    arrivalTime?: string;
    departureAirport?: { code?: string };
    arrivalAirport?: { code?: string };
    legs?: FlightLeg[];
}

export interface FlightLeg {
    carriersData?: Array<{ name?: string }>;
    flightInfo?: { flightNumber?: string };
    cabinClass?: string;
    totalTime?: number;
    flightStops?: unknown[];
    amenities?: string[];
}

export interface FlightSearchData {
    flightOffers?: FlightOffer[];
}

export interface FlightDetailsData {
    [key: string]: unknown;
}

// --- Hotels ---

export interface HotelDestination {
    dest_id: string;
    search_type?: string;
    name?: string;
    label?: string;
}

export interface HotelPrice {
    value?: number;
    currency?: string;
}

export interface HotelProperty {
    name?: string;
    reviewScore?: number;
    reviewCount?: number;
    propertyClass?: number;
    wishlistName?: string;
    photoUrls?: string[];
    priceBreakdown?: {
        grossPrice?: HotelPrice;
        excludedPrice?: HotelPrice;
        strikethroughPrice?: HotelPrice;
    };
}

export interface HotelSearchResult {
    hotel_id: number | string;
    property?: HotelProperty;
}

export interface HotelSearchData {
    hotels?: HotelSearchResult[];
    meta?: Array<{ title?: string }>;
}

export interface HotelDetailsData {
    [key: string]: unknown;
}

// --- Attractions ---

export interface AttractionProduct {
    id: string;
    title: string;
    productId: string;
    productSlug: string;
    taxonomySlug: string;
    cityName: string;
    countryCode?: string;
}

export interface AttractionDestination {
    id: string;
    ufi?: number;
    country?: string;
    cityName?: string;
    productCount?: number;
    cc1?: string;
}

export interface AttractionLocationData {
    products?: AttractionProduct[];
    destinations?: AttractionDestination[];
}

export interface AttractionDetailsData {
    [key: string]: unknown;
}
