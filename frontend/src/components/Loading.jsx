import React, { useEffect, useState } from "react";
import "./styles/Loading.css";

function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner">
        <div className="half-spinner"></div>
      </div>      
    </div>
  );
}

export default Loading;
