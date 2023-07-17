import "./register.css";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/deja3dgff/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("https://booking-backend-5rvn.onrender.com/api/auth/register", newUser);
      setRegistrationSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <FontAwesomeIcon icon={faUpload} className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  className="icon"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="button-container">
                  <button onClick={handleClick}>Send</button>
                  {registrationSuccess && (
                    <p className="success-message">
                      Registration successful!
                    </p>
                  )}
                  {error && <p className="error-message">{error}</p>}
                  {registrationSuccess && (
                    <p className="go-to-home-link">
                      <Link to="/">Go to Home</Link>
                    </p>
                  )}
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
