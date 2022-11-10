import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header/header";
import "./purchase.css"

const Purchase = () => {
  const location = useLocation()
  console.log(location.state)
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
            <div className="purchase-button">
              <p>購入する</p>
            </div>
          </center>

        </div>
      </div>
    </div>
  )
}

export default Purchase