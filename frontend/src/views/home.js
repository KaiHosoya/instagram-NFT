import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import "./home.css"

import { tokenURI } from "../lib/api/interact";
import IndexCard from "../components/Card/indexCard";
import Header from "../components/Header/header";

const Home = () => {

  const getNFT = async() => {
    const response = await tokenURI(1)
    console.log(response)
  } 
  getNFT()

  useEffect(() => {

  },[])

  return (
    <div className="home">
      <Header />
      <div className="content">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid container spacing={3}>
            <Grid item >
              <IndexCard></IndexCard>
            </Grid>
            <Grid item >
              <IndexCard></IndexCard>
            </Grid>
            <Grid item >
              <IndexCard></IndexCard>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  )
};

export default Home;



