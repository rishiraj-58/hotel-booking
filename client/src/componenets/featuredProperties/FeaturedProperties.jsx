import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"
import {Link} from "react-router-dom"

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch(
        "https://booking-backend-5rvn.onrender.com/api/hotels?featured=true&limit=4",
      );

    return (
        <div className="fp">
            {loading ? "Loading" : <>
            {data.map(item=>(
               <div className="fpItem" key={item._id}> 
            <Link to={`/hotels/${item._id}`}>   
           <img src={item.photos[0]} alt="" className="fpImg" />
           </Link>
            <span className="fpCity">{item.name}</span>
            <span className="fpName">{item.city}</span>
            <span className="fpPrice">Staring from ₹{item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Fabulous</span>
            </div>}
            </div>
            ))}
            </>}
        </div>
    )
}

export default FeaturedProperties


