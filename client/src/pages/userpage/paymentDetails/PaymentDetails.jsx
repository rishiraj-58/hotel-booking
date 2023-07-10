import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./paymentDetails.css";

const PaymentDetails = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="privacyDetails">
      <div className="privacyContainer">
        <h2>Payment Details</h2>
      </div>
      <div className="privacyinfo">
        <p>Securely add or remove payment methods to make it easier when you book.</p>
      </div>
      <div className="line"></div>
      <div className="personalSettings">
        <ul>
          <li>
            <strong>Payment cards</strong> <span className="privacyInfo">pay with new card</span>
            <button className="manageButton">Add card</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentDetails;
