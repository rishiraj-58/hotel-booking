import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./security.css";

const Security = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="privacyDetails">
      <div className="privacyContainer">
        <h2>Security</h2>
      </div>
      <div className="privacyinfo">
        <p>Adjust your security settings and set up two-factor authentication.</p>
      </div>
      <div className="line"></div>
      <div className="personalSettings">
        <ul>
          <li>
            <strong>Password</strong> <span className="privacyInfo">Reset your password regularly to keep your account secure</span>
            <button className="manageButton">Reset</button>
          </li>
          <li>
            <strong>Delete account</strong> <span className="privacyInfo">Permanently delete your Booking.com account</span>
            <button className="manageButton">Delete account</button>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Security;
