import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext"
import { useContext } from "react";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=Kochi,Thiruvananthapuram,Banglore"
  );
  let destination = "";

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const dates = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]
  const options = {
    adult: 1,
    children: 0,
    room: 1,
  }
  const handleSearch = (dest) => { 
    destination = dest
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options  } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              onClick={() => handleSearch("Kochi")}
              src="https://t-cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kochi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              onClick={() => handleSearch("Thiruvananthapuram")}
              src="https://t-cf.bstatic.com/xdata/images/city/square250/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Trivandrum</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              onClick={() => handleSearch("Banglore")}
              src="https://t-cf.bstatic.com/xdata/images/city/square250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Banglore</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
