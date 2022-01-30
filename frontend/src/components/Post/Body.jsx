import React from "react";
import { Typography } from "@mui/material";

function Body({ body }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {body}
      </Typography>
    </div>
  );
}

export default Body;
