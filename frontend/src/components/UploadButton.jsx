import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  //TODO clean up this function
  useEffect(() => {
    if (selectedImage?.name) {      
      const getUrl = async () => {
        const token = localStorage.getItem("auth");
        let payload = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { url } = await fetch(
          `${process.env.REACT_APP_API_URL}/user/avatarUpload`,
          payload
        ).then((res) => res.json());
 
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
        },
        body: selectedImage          
      })

      const avatarUrl = url.split('?')[0]      
      
      payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          avatar_url:avatarUrl
        })
      }     

      await fetch(
        `${process.env.REACT_APP_API_URL}/user`,
        payload
      )
    }

    getUrl()
  }
    
  }, [selectedImage]);
  return (
    <div className="mt-3">
      <Typography variant="subtitle">
        Upload Profile Picture
      </Typography>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
