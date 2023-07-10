import "./userpage.css";
import { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../../componenets/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import PersonalDetails from "./personalDetails/PersonalDetails";
import BookingHistory from "./bookingHistory/BookingHistory";
import Security from "./security/Security";
import PaymentDetails from "./paymentDetails/PaymentDetails";
import Privacy from "./privacy/Privacy";
import EmailNotifications from "./emailNotifications/EmailNotifications";
import OtherTravellers from "./otherTravellers/OtherTravellers";

const Userpage = () => {
  const { user } = useContext(AuthContext);
  const [selectedComponent, setSelectedComponent] = useState("personalDetails");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "personalDetails":
        return <PersonalDetails />;
      case "bookingHistory":
        return <BookingHistory />;
      case "security":
        return <Security />;
      case "paymentDetails":
        return <PaymentDetails />;
      case "privacy":
        return <Privacy />;
      case "emailNotifications":
        return <EmailNotifications />;
      case "otherTravellers":
        return <OtherTravellers />;
      default:
        return <PersonalDetails />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="userContainer">
        <div className="userSidebar">
          <ul>
            <li
              onClick={() => setSelectedComponent("personalDetails")}
              className={selectedComponent === "personalDetails" ? "active" : ""}
            >
              Personal Details
            </li>
            <li
              onClick={() => setSelectedComponent("bookingHistory")}
              className={selectedComponent === "bookingHistory" ? "active" : ""}
            >
              Booking History
            </li>
            <li
              onClick={() => setSelectedComponent("security")}
              className={selectedComponent === "security" ? "active" : ""}
            >
              Security
            </li>
            <li
              onClick={() => setSelectedComponent("paymentDetails")}
              className={selectedComponent === "paymentDetails" ? "active" : ""}
            >
              Payment Details
            </li>
            <li
              onClick={() => setSelectedComponent("privacy")}
              className={selectedComponent === "privacy" ? "active" : ""}
            >
              Privacy
            </li>
            <li
              onClick={() => setSelectedComponent("emailNotifications")}
              className={selectedComponent === "emailNotifications" ? "active" : ""}
            >
              Email Notifications
            </li>
            <li
              onClick={() => setSelectedComponent("otherTravellers")}
              className={selectedComponent === "otherTravellers" ? "active" : ""}
            >
              Other Travellers
            </li>
          </ul>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Userpage;
