import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { allTokenURIs, getCurrentWalletAddress } from "./lib/api/interact";

import Home from "./views/Home/home";
import Post from "./views/Post/post";
import Profile from "./views/Profile/profile";
import Test from "./views/test";
import Purchase from "./views/Purchase/purchase";
import Contents from "./views/Content/contents";

export const NFTContext = createContext()

function App() {
  const [metadatas, setMetadatas] = useState([])
  const [open, setOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const getCounts = async() => {
    await allTokenURIs()
    .then((res) => {
      // console.log(res)
      setMetadatas(res)
    })
    .catch((err) => {
      console.log(err)
    })
  } 

  const getWalletAddress = async() => {
    await getCurrentWalletAddress()
    .then((res) => {
      setWalletAddress(res.address)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCounts()
    getWalletAddress()
  }, [])


  return (
    <BrowserRouter>
      <NFTContext.Provider value={{ metadatas, open, setOpen, walletAddress, setWalletAddress }}>
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="/post" element={ <Post />} />
            <Route path="/profile" element={ <Profile />} />
            <Route path="/purchase" element={ <Purchase />} />
            <Route path="/contents" element={ <Contents />} />
            <Route path="/test" element={ <Test />} />
        </Routes>
      </NFTContext.Provider>
    </BrowserRouter>
  );
}

export default App;
