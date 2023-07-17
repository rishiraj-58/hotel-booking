import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    isAdmin: false,
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setInfo((prev) => ({ ...prev, [id]: newValue }));
  };
  

  const handleClick = async (e) => {
    e.preventDefault(); //to prevent page to reload
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

      await axios.post("/auth/register", newUser);
      setRegistrationSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
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
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    {input.type === "checkbox" ? (
                      <input
                        onChange={handleChange}
                        type={input.type}
                        id={input.id}
                        checked={info[input.id] || false}
                      />
                    ) : (
                      <input
                        onChange={handleChange}
                        type={input.type}
                        placeholder={input.placeholder}
                        id={input.id}
                        value={info[input.id] || ""}
                      />
                    )}
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
                      <Link to="/users">Go to Users list</Link>
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

export default New;
