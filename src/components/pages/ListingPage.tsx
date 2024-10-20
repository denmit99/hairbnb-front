import { ReactComponentElement, ReactNode, useEffect, useState } from "react";
import { ErrorResponse, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";
import { PlaceType } from "../../constants/placeType";
import { PropertyType } from "../../constants/propertyType";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import TvIcon from "@mui/icons-material/Tv";
import Tv from "@mui/icons-material/Tv";
import "./Listing.css";

const GET_HOST_LISTINGS_URL = "/listings";

interface Bedroom {
  number: number;
  doubleNum: number;
  singleNum: number;
  queenNum: number;
  sofaNum: number;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  currency: string;
  propertyType: PropertyType;
  placeType: PlaceType;
  bedrooms: Bedroom[];
  numberOfBathrooms: number;
  numberOfGuests: number;
  amenities: string[];
}

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing>();
  const [loading, setLoading] = useState(true);

  const getListing = async () => {
    try {
      var response = await axiosInstance.get(GET_HOST_LISTINGS_URL + "/" + id);
      setListing(response.data);
      console.log(response);
    } catch (error: AxiosError<ErrorResponse> | unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const amenityToIcon = (code: string, component: ReactNode) => {
    return listing?.amenities.includes(code) ? component : <></>;
  };

  useEffect(() => {
    getListing();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) return <>oops</>;

  return (
    <div className="listing-page">
      <h1 className="listing-title">{listing.title}</h1>
      <p className="listing-address">{listing.address}</p>
      <div className="listing-info">
        {listing.numberOfGuests}{" "}
        {listing.numberOfGuests == 1 ? "guest" : "guests"}
        {" | "}
        {listing.numberOfBathrooms}{" "}
        {listing.numberOfBathrooms == 1 ? "bath" : "baths"}
      </div>

      <p className="listing-price">
        {listing.pricePerNight} {listing.currency} per night
      </p>
      <p className="listing-description">{listing.description}</p>
      <p>Property type: {listing.propertyType}</p>
      <p>Place type: {listing.placeType}</p>
      <h3>Amenities:</h3>
      {amenityToIcon(
        "WI_FI",
        <>
          <WifiIcon /> Wi-Fi
        </>
      )}
      {amenityToIcon(
        "AIR_CONDITIONING",
        <>
          <AcUnitIcon /> Air Conditioning
        </>
      )}
      {amenityToIcon(
        "WASHING_MACHINE",
        <>
          <LocalLaundryServiceIcon /> Washing Machine
        </>
      )}
      {amenityToIcon(
        "TV",
        <>
          <Tv /> TV
        </>
      )}
    </div>
  );
}
