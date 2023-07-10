import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./bookingHistory.css";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bookingHistoryContainer">
      <h2>Booking History</h2>
      <div className="bookingTable">
        <div className="tableHeading">
          <div>Hotel</div>
          <div>Rooms</div>
          <div>Date Range</div>
        </div>
        {user.hotels.map((hotel, index) => (
          <div className="bookingItem" key={index}>
            <div className="hotelName">{hotel.name}</div>
            <div className="roomNumbers">
              <ul>
                {hotel.roomNumbers.map((roomNumber, index) => (
                  <li key={index}>{roomNumber}</li>
                ))}
              </ul>
            </div>
            <div className="dateRange">
              <ul>
                {hotel.Dates.map((date, index) => (
                  <li key={index}>{new Date(date).toLocaleDateString()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;