import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import "./home.css"

import SideBar from "../components/SideBar/sideBar";
import { tokenURI } from "../lib/api/interact";
import IndexCard from "../components/Card/indexCard";

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
      <SideBar className="sidebar"/>
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



