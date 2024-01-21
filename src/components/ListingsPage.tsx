import "./RegLog.css";
import "./Listings.css";
import { FaSearch } from "react-icons/fa";

function ListingsPage() {
  const listings = [
    {
      id: 1,
      name: "Apartment, Barcelona",
      description: "Apartment Casa Nanit near Camp Nou",
      beds: "1 queen size bed",
      price: 101,
      src: "apartment1.jpg",
    },
    {
      id: 2,
      name: "Apartment, Barcelona",
      description: "Cozy studio Barcelona Center",
      beds: "1 queen size bed",
      price: 121,
      src: "apartment2.jpg",
    },
    {
      id: 1,
      name: "Apartment, Barcelona",
      description: "Apartment Casa Nanit near Camp Nou",
      beds: "1 queen size bed",
      price: 77,
      src: "apartment3.jpg",
    },
    {
      id: 2,
      name: "Apartment, Barcelona",
      description: "Apartment Casa Nanit near Camp Nou",
      beds: "1 queen size bed",
      price: 55,
      src: "apartment4.jpg",
    },
    {
      id: 1,
      name: "Apartment, Barcelona",
      description: "Apartment Casa Nanit near Camp Nou",
      beds: "1 queen size bed",
      price: 35,
      src: "apartment5.jpg",
    },
    {
      id: 2,
      name: "House, Barcelona",
      description: "Apartment Casa Nanit near Camp Nou",
      beds: "1 queen size bed",
      price: 230,
      src: "apartment6.jpg",
    },
  ];

  return (
    <>
      {/* <div className="listings-box">
        <h1>Listings</h1>
        <div className="listing">hello</div>
        <div className="listing">hello</div>
      </div> */}
      <div className="listing-box">
        <section className="search-bar-container">
          <div className="search-bar">
            <div className="search-bar-segment search-bar-segment-wide">
              <label>Where</label>
              <input
                className="search-input"
                placeholder="Where?"
                maxLength={100}
              />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>Check in</label>
              <input type="date" className="search-input" placeholder="When?" />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>Check out</label>
              <input type="date" className="search-input" placeholder="When?" />
            </div>
            <div className="search-bar-segment left-bordered">
              <label>Who</label>
              <input className="search-input" placeholder="Who?" />
            </div>

            <button className="search-button">
              <FaSearch className="search-icon" />
              Search
            </button>
          </div>
        </section>

        <div className="listing-grid">
          {listings.map((l) => {
            return (
              <>
                <div className="card-container">
                  <div className="listing-card">
                    {/* <img src={require("../static/apartment2.jpg")} /> */}
                    <img src={`images/${l.src}`} />
                    {/* <button className="like-button">OK</button> */}
                    <div className="listing-card-content">
                      <p className="listing-title">{l.name}</p>
                      <p className="listing-description">{l.description}</p>
                      <p className="listing-description">{l.beds}</p>
                      <div className="listing-price">
                        <p className="listing-price-sum">€{l.price}</p>
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
