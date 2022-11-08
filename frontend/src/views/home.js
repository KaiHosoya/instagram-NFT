import React, { useEffect } from "react";

import SideBar from "../components/SideBar/sideBar";
// import { getAllNfts } from "../lib/api/getNFT";

const Home = () => {

  useEffect(() => {
    // getAllNfts()
  },[])

  return (
    <div style={styles.home}>
      <SideBar />
      <h1>Home</h1>

    </div>
  )
};

export default Home;

const styles = {
  home: {
    display: "flex"
  }
}