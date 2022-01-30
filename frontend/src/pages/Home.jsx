import { Container } from "@mui/material";
import React from "react";
import SearchUser from "../components/SearchUser";
import "../components/styles/Main.css"

export default function Home() {
  return (
    <div className="main-container">
      <Container>
        <SearchUser/>
      </Container>
    </div>
  );
}
