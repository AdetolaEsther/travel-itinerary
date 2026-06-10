export interface ItineraryFlight {
    airline: string;
    flightCode: string;
    flightClass: string;
    departureTime: string;
    departureDate: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalAirport: string;
    duration: string;
    stopType: string;
    price: string;
    facilities: string[];
}

export interface ItineraryHotel {
    hotel_id: string;
    name: string;
    address: string;
    rating?: number;
    reviews?: number;
    roomType?: string;
    price?: string;
    totalPrice?: string;
    currency?: string;
    roomNightsSummary?: string;
    imageUrl?: string;
    checkIn?: string;
    checkOut?: string;
    facilities?: string[];
}

export interface ItineraryActivity {
    id: string;
    name: string;
    description: string;
    category?: string;
    location?: string;
    included?: string;
    price?: string;
    duration?: string;
    timeDate?: string;
    rating?: number;
    reviews?: number;
    day?: string;
}
