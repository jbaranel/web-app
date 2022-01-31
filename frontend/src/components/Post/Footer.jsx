import {React, useContext} from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PostContext } from "../../pages/Feed";

function Footer() {
  const divStyle = {
    width: '3em',        
  };

  const userLiked = false;
  return (
    <div>
      <div className="row justify-content-start">
          <div style={divStyle} align="center">
            <IconButton >
              {userLiked ? 
              <FaHeart style={{ color: "red" }} />
              :
              <FaRegHeart style={{ color: "red" }} />}
            </IconButton>
          </div>
          <div style={divStyle} align="center">
            <IconButton>
              <FaRegComment style={{ color: "#1a83ff" }}/>
            </IconButton>
          </div>
          <div className="w-100"></div>
          <div style={divStyle} align="center">2</div>
          <div style={divStyle} align="center">3</div>        
      </div>
    </div>
  );
}

export default Footer;
