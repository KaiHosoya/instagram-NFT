import React from "react";
import { Card, Box, CardMedia, CardActions, Button } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


import "./profile.css"
import Header from "../../components/Header/header";

const Test = () => {

  const Bio = () => {
    return (
      <div className="bio">
        <h1 className="Name">Kai Hosoya</h1>
        <p className="Bio">entrepreneur</p>
        <div className="Quote">
          <blockquote>&ldquo; “Help young people. Help small guys. Because small guys will be big. Young people will have the seeds you bury in their minds, and when they grow up, they will change the world.” &rdquo;</blockquote>
          <div className="byline">&mdash; Jack Ma</div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <Header/>
      <div className="content">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="90vh"
        >
          <Card sx={{ maxWidth: 800 }} className="card">
            <CardMedia
              className="cardmedia"
              component="img"
              src="https://gateway.pinata.cloud/ipfs/QmbPqm8vPuQFnRLw1CJoMnLUeMyfiJqHVKioXEV79KHCjz"
            />
            <Bio />
            <CardActions>
              <Button size="small" color="primary">
                <TwitterIcon />
              </Button>
              <Button size="small" color="primary">
                <InstagramIcon />
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  )
}

export default Test
