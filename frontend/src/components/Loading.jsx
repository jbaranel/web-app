import React, { useEffect, useState } from "react";
import "./Loading.css";

function Loading() {
  return (
    <div class="d-flex justify-content-center">
      <div className="spinner">
        <div className="half-spinner"></div>
      </div>      
    </div>
  );
}

export default Loading;
