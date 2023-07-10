import React from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./privacy.css";

const Privacy = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="privacyDetails">
      <div className="privacyContainer">
        <h2>Privacy</h2>
      </div>
      <div className="privacyinfo">
        <p>Exercise your privacy rights and control how your data is used.</p>
      </div>
      <div className="line"></div>
      <div className="personalSettings">
        <ul>
          <li>
            <strong>Privacy Settings:</strong> <span className="privacyInfo">{user.email}</span>
            <button className="manageButton">Manage</button>
          </li>
          <li>
            Select "Manage" to change your privacy settings and exercise your rights using our request form.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;
