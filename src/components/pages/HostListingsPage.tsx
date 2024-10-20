import { FaSearch } from "react-icons/fa";
import "./Listings.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";

const GET_HOST_LISTINGS_URL = "/host/listings";

interface Listing {
  id: string;
  title: string;
  address: string;
  description: string;
  pricePerNight: string;
  currency: string;
}

export default function HostListingsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);

  const getHostListings = async () => {
    try {
      var response = await axiosInstance.get(GET_HOST_LISTINGS_URL);
      setListings(response.data);
      console.log(response);
    } catch (error: AxiosError<ErrorResponse> | unknown) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHostListings();
  }, []);

  const onClickCreateNew = () => {
    navigate("/listings/create");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="listing-page-box">
        {/* <section className="search-bar-container">
          <div className="search-bar">
            <div className="search-bar-segment search-bar-segment-wide">
              <label>Search</label>
              <input
                className="search-input"
                placeholder="Search by name, description, address etc"
                maxLength={100}
              />
            </div>
            <button className="search-button">
              <FaSearch className="search-icon" />
              Search
            </button>
          </div>
        </section> */}
        <button onClick={onClickCreateNew}>+ Create New Listing</button>
        <div className="listing-list">
          {listings.map((l) => {
            return (
              <>
                <div
                  key={l.id}
                  className="listing-list-card"
                  onClick={() => {
                    console.log("CLICKED!");
                    navigate(`/listings/${l.id}`);
                  }}
                >
                  <div className="listing-card-content">
                    <p className="listing-title">{l.title}</p>
                    <p className="listing-description">{l.address}</p>
                    <p className="listing-description">{l.description}</p>
                    {/* <p className="listing-description">{l.beds}</p> */}
                    <div className="listing-price">
                      <p className="listing-price-sum">
                        {l.pricePerNight} {l.currency}
                      </p>
                      <p>per night</p>
                    </div>
                  </div>
                  <div className="listing-list-card-buttons">
                    <button className="listing-list-card-button">Edit</button>
                    <button className="listing-list-card-button-remove">
                      Remove
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
