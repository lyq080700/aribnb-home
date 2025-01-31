export interface SearchParamsInterface {
    address: {
        city: string;
        country: string;
    };
    time: {
        start: string;
        end: string;
    };
    people: {
        adult: number;
        child: number;
        infant: number;
        pet: number;
    };
}

export interface RoomInterface {
    name: string;
    adults: number;
    mapInfo: string;
    checkin: string;
    checkout: string;
    avgRating: string;
    children: number;
    infants: number;
    pets: number;
    price: string;
    img: string;
    description: string;
    review: string;
    title: string;
    country: string;
    city: string;
}

export interface HotelInterface {
    title: string;
    country: string;
    city: string;
   listingRoom: RoomInterface[]
}
