import { FaSearch } from "react-icons/fa";
import "./HostListings.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";
import ConfirmButton from "../ui/ConfirmButon";

const HOST_LISTINGS_URL = "/host/listings";

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
      var response = await axiosInstance.get(HOST_LISTINGS_URL);
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

  const deleteListing = async (id: string) => {
    try {
      var response = await axiosInstance.delete(`${HOST_LISTINGS_URL}/${id}`);
      setListings((prev) => prev.filter((l) => l.id !== id));
      // window.location.reload();
    } catch (error: AxiosError<ErrorResponse> | unknown) {}
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="host-listing-page-box">
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
        <div className="host-listing-top-panel">
          {/* <button onClick={onClickCreateNew}>+ Create New Listing</button> */}
          <ConfirmButton onClick={onClickCreateNew}>
            + Create New Listing
          </ConfirmButton>
        </div>
        <div className="host-listing-list">
          {listings.map((l) => {
            return (
              <>
                <div
                  key={l.id}
                  className="host-listing-list-card"
                  onClick={() => {
                    console.log("CLICKED!");
                    navigate(`/listings/${l.id}`);
                  }}
                >
                  <div className="host-listing-card-content">
                    <p className="host-listing-title">{l.title}</p>
                    <p className="host-listing-description">{l.address}</p>
                    <p className="host-listing-description">{l.description}</p>
                    {/* <p className="listing-description">{l.beds}</p> */}
                    <div className="host-listing-price">
                      <p className="host-listing-price-sum">
                        {l.pricePerNight} {l.currency}
                      </p>
                      <p>per night</p>
                    </div>
                  </div>
                  <div className="host-listing-list-card-buttons">
                    <ConfirmButton
                      red
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        deleteListing(l.id);
                      }}
                    >
                      Delete
                    </ConfirmButton>
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
