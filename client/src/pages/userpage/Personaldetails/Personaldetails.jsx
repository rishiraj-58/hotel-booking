import React, { useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import "./personalDetails.css";
import axios from 'axios';

const PersonalDetails = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [editingField, setEditingField] = useState(null);
  const [name, setName] = useState(user.username);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        username: name,
        city,
        country,
        email,
        phone
      };
      const response = await axios.put(`http://localhost:8800/api/users/${user._id}`, updatedUser);
      dispatch({ type: "UPDATE_USER", payload: response.data });
    } catch (error) {
      console.log(error);
    }

    setEditingField(null);
  };

  return (
    <div className="userDetails">
      <div className="userImageContainer">
        <h2>Personal Details</h2>
        <div className="userImage">
          <img src={user.img} alt="User" />
        </div>
      </div>
      <div className="personalDetails">
        <p>Update your information and find out how it's used.</p>
      </div>
      <div className="line"></div>
      <div className="personalDetails">
        <ul>
          <li>
            <strong>Name:</strong>
            {editingField === 'name' ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="manageButton" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span className="info">{name}</span>
                <button className="manageButton" onClick={() => handleEdit('name')}>Edit</button>
              </>
            )}
          </li>
          <li>
            <strong>City:</strong>
            {editingField === 'city' ? (
              <>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button className="manageButton" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span className="info">{city}</span>
                <button className="manageButton" onClick={() => handleEdit('city')}>Edit</button>
              </>
            )}
          </li>
          <li>
            <strong>Country:</strong>
            {editingField === 'country' ? (
              <>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <button className="manageButton" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span className="info">{country}</span>
                <button className="manageButton" onClick={() => handleEdit('country')}>Edit</button>
              </>
            )}
          </li>
          <li>
            <strong>Email:</strong>
            {editingField === 'email' ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="manageButton" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span className="info">{email}</span>
                <button className="manageButton" onClick={() => handleEdit('email')}>Edit</button>
              </>
            )}
          </li>
          <li>
            <strong>Phone:</strong>
            {editingField === 'phone' ? (
              <>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="manageButton" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <span className="info">{phone}</span>
                <button className="manageButton" onClick={() => handleEdit('phone')}>Edit</button>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalDetails;