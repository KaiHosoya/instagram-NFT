import {React, useEffect, useContext} from "react";


import "./test.css"
import Header from "../components/Header/header";
import IndexCard from "../components/Card/indexCard";
import { NFTContext } from "../App" 
import { Box, Grid } from "@mui/material";

const Test = () => {

  const { metadatas } = useContext(NFTContext)
  console.log(metadatas)

  useEffect(() => {
  },[])

  return (
    // <div>
    //   <Header />
    //   <Box>
    //     <Grid container spacing={3} alignItems="center" justify="center">
    //     {/* 現状では写真が表示できないのでパス:  src={metadata["imageUrl"]}*/}
    //     {/* <IndexCard title={metadata["title"]} description={metadata["description"]}/> */}
    //     {metadatas.map((metadata, key) => {
    //       return (
    //         <Grid item xs={4}>
    //           <IndexCard key={key} title={metadata.title} description={metadata.description} src={metadata}/>
    //         </Grid>
    //       )
    //     })}
    //     </Grid>
    //   </Box>
    // </div>
    <h1>テスト</h1>
  )
}

export default Test