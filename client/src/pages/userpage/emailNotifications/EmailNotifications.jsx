import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./emailNotifications.css";

const EmailNotifications = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="privacyDetails">
      <div className="privacyContainer">
        <h2>EmailNotifications</h2>
      </div>
      <div className="privacyinfo">
        <p>Decide what you want to be notified about, and unsubscribe from what you don't.</p>
      </div>
      <div className="line"></div>
      <div className="personalSettings">
        <ul>
          <li>
            <strong>Email Preferences</strong> <span className="privacyInfo">{user.email}</span>
            <button className="manageButton">Manage</button>
          </li>
          <li>
            This is the email address you use to sign in. Its also where we send your booking confirmation.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmailNotifications;
