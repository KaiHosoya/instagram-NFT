import React from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NFTContext } from "../App";

import Header from "../components/Header/header";
import { transferNFT } from "../lib/api/interact";
import "./purchase.css"

const Purchase = () => {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state)
  const { setOpen, walletAddress } = useContext(NFTContext)

  const handleSubmit = async() => {
    await transferNFT(walletAddress, location.state.id)
    .then((res) => {
      console.log(res)
      navigate("/")
      setOpen(true)
    })
    .catch((err) => {
      console.log(err)
      alert("問題が発生しました😭")
    })
  }

  return (
    <div>
      <Header />
      <div className="purchase">
        <div className="purchase-left">
          <img className="purchase-image" src={location.state.src} alt="NFTimage" width="60%" height="50%"/>
        </div>
        <div className="purchase-right">
          <h3>
            {location.state.title}
          </h3>
          <p>
            {location.state.description}
          </p>
          <center>
            <div className="purchase-button" onClick={handleSubmit}>
              <p>購入する</p>
            </div>
          </center>

        </div>
      </div>
    </div>
  )
}

export default Purchase