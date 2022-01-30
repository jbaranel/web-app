import React from 'react';
import UploadButton from '../components/UploadButton';
import ProfileCard from '../components/ProfileCard'
import "../components/styles/Main.css"

function Profile() {

  return <div className="main-container">
    <ProfileCard/>
    <UploadButton/>
  </div>;
}

export default Profile;
