import "./RegLog.css";
import "./Listings.css";

function ListingsPage() {
  const listings = [
    {
      id: 1,
      name: "Cozy apartment 1",
      price: 25,
      src: "../static/apartment1.jpg",
    },
    {
      id: 2,
      name: "Cozy apartment 2",
      price: 121,
      src: "../static/apartment2.jpg",
    },
  ];

  return (
    <>
      {/* <div className="listings-box">
        <h1>Listings</h1>
        <div className="listing">hello</div>
        <div className="listing">hello</div>
      </div> */}

      <div className="listing-container">
        {listings.map((l) => {
          return (
            <>
              <div className="listing-card">
                <img src={require("../static/apartment2.jpg")} />
                <div className="listing-card-content">
                  <p className="listing-title">{l.name}</p>
                  <p className="listing-price">{l.price} EUR</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ListingsPage;
