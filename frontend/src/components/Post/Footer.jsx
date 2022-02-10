import {React, useContext} from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PostContext } from "../../components/Post";
import API from "../../apiHelper";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate()
  const {post, likecount, setLikecount, userLiked, setUserliked} = useContext(PostContext)
  
  const updateLikes = () => {
    if (userLiked) {
      API.DELETE(`post/${post.post_id}/like`)
      setLikecount(likecount - 1);
      setUserliked(false);
    } else {
      API.POST(`post/${post.post_id}/like`)
      setLikecount(likecount + 1);
      setUserliked(true);
    }
    return;
  };

  const handleClick = () => {
    navigate(`/post/${post.post_id}`);
  };

  const divStyle = {
    width: '3em',        
  };

  return (
    <div>
      <div className="row justify-content-start m--1">
          <div style={divStyle} align="center" className="p-0">
            <IconButton onClick={updateLikes}>
              {userLiked ? 
              <FaHeart style={{ color: "red" }} />
              :
              <FaRegHeart style={{ color: "red" }} />}
            </IconButton>
          </div>
          <div style={divStyle} align="center" className="p-0">
            <IconButton onClick={handleClick}>
              <FaRegComment style={{ color: "#1a83ff" }}/>
            </IconButton>
          </div>
          <div className="w-100"></div>
          <div style={divStyle} align="center">{likecount ? likecount : 0}</div>
          <div style={divStyle} align="center">{post?.comments?.length || 0}</div>        
      </div>
    </div>
  );
}

export default Footer;
