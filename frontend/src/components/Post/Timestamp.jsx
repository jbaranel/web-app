import React from "react";
import { Typography } from "@mui/material";
import { convertToLocalDate } from "../../utils.js"

function Timestamp({ timestamp }) {
    const localTime = convertToLocalDate(timestamp)
  return (
    <div>
      <Typography variant="caption" display="block" gutterBottom>
        {localTime}
      </Typography>
    </div>
  );
}

export default Timestamp;
