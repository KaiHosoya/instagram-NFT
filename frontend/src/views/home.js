import React from "react";

import SideBar from "../components/SideBar/sideBar";

const Home = () => {
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