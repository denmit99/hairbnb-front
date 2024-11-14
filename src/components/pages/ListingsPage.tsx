import "./RegLog.css";
import "./Listings.css";
//REMOVE FA change to MUI
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

const LISTINGS_URL = "/listings";

interface Listing {
  id: string;
  title: string;
  address: string;
  description: string;
  pricePerNight: string;
  currency: string;
}

interface ListingSearchParameters {
  city: string;
  minPrice: number | null;
  maxPrice: number | null;
  numberOfGuests: number | null;
}

function ListingsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);

  const [searchParameters, setSearchParameters] =
    useState<ListingSearchParameters>({
      city: "",
      minPrice: null,
      maxPrice: null,
      numberOfGuests: null,
    });

  const getListings = async () => {
    try {
      var response = await axiosInstance.post(
        LISTINGS_URL,
        JSON.stringify({
          citySubstring: searchParameters.city,
          minPrice: searchParameters.minPrice,
          maxPrice: searchParameters.maxPrice,
          numberOfGuests: searchParameters.numberOfGuests,
          currency: "EUR",
        })
      );
      setListings(response.data);
      console.log(response.data);
    } catch (error: AxiosError<ErrorResponse> | unknown) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  useEffect(() => {
    getListings();
  }, [searchParameters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="listing-box">
        <section className="search-bar-container">
          <div className="search-bar">
            <div className="search-bar-segment search-bar-segment-wide">
              <label>City</label>
              <input
                className="search-input"
                placeholder="Where?"
                maxLength={100}
                onChange={(e) => {
                  setSearchParameters({
                    ...searchParameters,
                    city: e.target.value,
                  });
                }}
              />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>Price from (€)</label>
              <input
                className="search-input"
                placeholder="Min Price"
                onChange={(e) => {
                  setSearchParameters({
                    ...searchParameters,
                    minPrice: parseFloat(e.target.value),
                  });
                }}
              />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>To</label>
              <input
                className="search-input"
                placeholder="Max Price"
                onChange={(e) => {
                  setSearchParameters({
                    ...searchParameters,
                    maxPrice: parseFloat(e.target.value),
                  });
                }}
              />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>№ of Guests</label>
              <input
                className="search-input"
                placeholder="How Many Guests?"
                onChange={(e) => {
                  setSearchParameters({
                    ...searchParameters,
                    numberOfGuests: parseFloat(e.target.value),
                  });
                }}
              />
            </div>

            {/* <button className="search-button">
              <FaSearch className="search-icon" />
              Search
            </button> */}
          </div>
        </section>
        <div className="listing-grid">
          {listings.map((l) => {
            return (
              <>
                <div
                  key={l.id}
                  className="card-container"
                  onClick={() => {
                    console.log("CLICKED!");
                    navigate(`/listings/${l.id}`);
                  }}
                >
                  <div className="listing-card">
                    <div className="listing-card-content">
                      <p className="listing-title">{l.title}</p>
                      <p className="listing-description">{l.description}</p>
                      <p className="listing-description">{l.address}</p>
                      <div className="listing-price">
                        <p className="listing-price-sum">€{l.pricePerNight}</p>
                        <p>per night</p>
                      </div>
                    </div>
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

export default ListingsPage;
