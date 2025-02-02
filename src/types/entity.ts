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
export interface CommonRoomDetailInterface {
    title: string;
    country: string;
    city: string;
}

export interface RoomInterface{
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
}


export interface HotelInterface extends CommonRoomDetailInterface {
    listingRoom: RoomInterface[]
}

export interface Result<T= any> {
    code: number;
    message: string;
    data?: T;
}
