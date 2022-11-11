import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { getCurrentWalletAddress, ownerTokenURIs } from "./lib/api/interact";

import Home from "./views/home";
import Post from "./views/post";
import Profile from "./views/profile";
import Test from "./views/test";
import Purchase from "./views/purchase";

export const NFTContext = createContext()

function App() {
  const [metadatas, setMetadatas] = useState([])
  const [open, setOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const getCounts = async() => {
    await ownerTokenURIs()
    .then((res) => {
      setMetadatas(res)
    })
    .catch((err) => {
      console.log(err)
    })
  } 

  const getWalletAddress = async() => {
    await getCurrentWalletAddress()
    .then((res) => {
      console.log(res.address)
      setWalletAddress(res.address)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    getCounts()
    getWalletAddress()
    // getMetadas()
  }, [])


  return (
    <BrowserRouter>
      <NFTContext.Provider value={{ metadatas, open, setOpen, walletAddress, setWalletAddress }}>
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="/post" element={ <Post />} />
            <Route path="/profile" element={ <Profile />} />
            <Route path="/purchase" element={ <Purchase />} />
            <Route path="/test" element={ <Test />} />
        </Routes>
      </NFTContext.Provider>
    </BrowserRouter>
  );
}

export default App;
