import React, { useContext, useEffect } from "react";
import { Grid, Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./home.css"

import IndexCard from "../components/Card/indexCard";
import Header from "../components/Header/header";
import { NFTContext } from "../App";

const Home = () => {
  const { metadatas, open, setOpen } = useContext(NFTContext)
  // console.log(metadatas[2].create_at)


  useEffect(() => {

  },[])

  return (
    <div className="home">
      <Header />
      {/* <img src={metadata["imageUrl"]} alt="NFTimage"/> */}
      {/* <p>{metadata["title"]}</p> */}
      <Box>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            購入しました！
          </Alert>
        </Collapse>
      </Box>
      <div className="content">
        <Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center" className="NFT_index">
          {/* 現状では写真が表示できないのでパス:  src={metadata.imageUrl}*/}
          {/* <IndexCard title={metadata["title"]} description={metadata["description"]}/> */}
          {metadatas.map((metadata, key) => {
            return (
                <Grid item xs={4} key={key} className="item">
                  <IndexCard id={key} title={metadata.title} description={metadata.description} create_at={metadata.create_at} src={metadata.imageUrl}/>
                </Grid>
            )
          })}
        </Grid>
        </Box>
      </div>
    </div>
  )
};

export default Home;



