import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios";

import { ownerTokenURIs, tokenURI } from "./lib/api/interact";

import Home from "./views/home";
import Post from "./views/post";
import Profile from "./views/profile";
import Test from "./views/test";

export const NFTContext = createContext()

function App() {
  // const [counts, setCounts] = useState()
  const [metadatas, setMetadatas] = useState([])

  const getCounts = async() => {
    await ownerTokenURIs()
    .then((res) => {
      console.log(res)
      setMetadatas(res)
    })
    .catch((err) => {
      console.log(err)
    })
  } 
  
  useEffect(() => {
    getCounts()
    // getMetadas()
  }, [])


  return (
    <BrowserRouter>
      <NFTContext.Provider value={{ metadatas }}>
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="/post" element={ <Post />} />
            <Route path="/profile" element={ <Profile />} />
            <Route path="/test" element={ <Test />} />
        </Routes>
      </NFTContext.Provider>
    </BrowserRouter>
  );
}

export default App;
