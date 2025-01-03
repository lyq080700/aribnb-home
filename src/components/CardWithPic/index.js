import ImageRatio from "../ImageRatio";
import { StarFilled } from "@ant-design/icons";
export default function Card({ className, hotel }) {
  return (
    <a className={`card cursor-pointer ${className}`}>
      <ImageRatio
        src={hotel.img}
        alt={hotel.title}
        ratio="100%"
        className="card-img  rounded-lg h-[300px]"
        round={true}
      />
      <div className="card-content text-ellipsis text-[#6a6a6a] text-nowrap mt-2">
        <div className="card-title text-[#222] flex items-center justify-between flex-wrap">
          <div>{hotel.name}</div>
          <div>
            <StarFilled />
            {hotel.avgRating}
          </div>
        </div>
        <div className="card-address">{hotel.mapInfo}</div>
        <div className="card-time">
          {hotel.checkin + " - " + hotel.checkout}
        </div>
        <div className="card-time truncate">{hotel.review}</div>

        <div className="card-desc truncate">{hotel.description}</div>
        <div className="card-price text-[16px] mt-2 text-[#222] font-bold">
          {hotel.price}
        </div>
      </div>
    </a>
  );
}
