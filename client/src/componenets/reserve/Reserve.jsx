import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId, hotelName }) => {
  const { dispatch } = useContext(AuthContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `https://booking-backend-5rvn.onrender.com/api/hotels/room/${hotelId}`
  );
  

  const { dates } = useContext(SearchContext);
  const {user} = useContext(AuthContext);
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const startDate = dates && dates[0] && dates[0].startDate ? new Date(dates[0].startDate) : currentDate;

  // Use tomorrow's date as the default end date if dates[0].endDate is not defined
  const endDate = dates && dates[0] && dates[0].endDate ? new Date(dates[0].endDate) : tomorrowDate;
 
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(startDate, endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const [allRooms, setAllRooms] = useState([]);
  const allhotels = [{"name":hotelName,
	"roomNumbers": allRooms,
  "Dates":alldates}
  ]
  
  const handleSelect = (e, number) => {
    const checked = e.target.checked;
    const value = e.target.value; 
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]        
        : selectedRooms.filter((item) => item !== value)     
    );
    setAllRooms(
      checked
        ? [...allRooms, number]        
        : allRooms.filter((item) => item !== number)     
    );
    console.log(allhotels)
  };

  const navigate = useNavigate()
  
  const handleClick = async () => {
    console.log(allhotels)
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://booking-backend-5rvn.onrender.com/api/rooms/availability/${roomId}`,
            { dates: alldates }
          );
          return res.data;
        })
      );
      axios.put(`https://booking-backend-5rvn.onrender.com/api/users/addhotels/${user._id}`, {hotels: allhotels})
      dispatch({ type: "UPDATE_HOTELS", payload: allhotels });

      setOpen(false)
      navigate("/")
    } catch (err) {}
  };


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={e=>handleSelect(e, roomNumber.number)}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
