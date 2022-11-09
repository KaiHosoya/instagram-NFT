import React, { useEffect, useState } from "react";
import axios from "axios"
import { Grid, Box } from "@mui/material";
import "./home.css"

import { tokenURI } from "../lib/api/interact";
import IndexCard from "../components/Card/indexCard";
import Header from "../components/Header/header";

const Home = () => {
  const [metadata, setMetadata] = useState()

  // interact.jsに移行したいがうまくデータを返せない
  const getNFT = async() => {
    await tokenURI(1)
    .then((response) => {
      axios
      .get(response)
      .then((res) => {
        console.log(res.data)
        setMetadata(res.data)
      })
    })
  } 

  useEffect(() => {
    getNFT()
  },[])

  return (
    <div className="home">
      <Header />
      {/* <img src={metadata["imageUrl"]} alt="NFTimage"/> */}
      {/* <p>{metadata["title"]}</p> */}
      <div className="content">
        <Box>
          <Grid container spacing={3} >
            <Grid item >
              <IndexCard src={metadata["imageUrl"]}></IndexCard>
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



