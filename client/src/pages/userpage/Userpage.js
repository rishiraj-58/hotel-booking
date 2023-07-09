import "./userpage.css";
import { useContext, useState } from "react";
import axios from "axios";
import {userOutputs} from "../../formSource"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";



const Register = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
    const{user} = useContext(AuthContext)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); //to prevent page to reload
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    navigate()
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

      await axios.post("http://localhost:8800/api/auth/register", newUser);
      

    } catch (err) {
      console.log(err);
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
                  Image: <FontAwesomeIcon icon={faUpload}  className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  className="icon"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userOutputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <div id={input.id}>
                      {user`.${input.info}`}
                  </div>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
        </div>
        </div>
    )
}

export default Register;