import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./otherTravellers.css";

const OtherTravellers = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="travellerDetails">
      <div className="travellerContainer">
        <h2>Other travellers</h2>
      </div>
      <div className="personalDetails">
        <p>Add or edit information about the people you’re travelling with.</p>
      </div>
      <div className="line"></div>
      <button className="button">+ Add New Traveller</button>
    </div>
  );
};

export default OtherTravellers;