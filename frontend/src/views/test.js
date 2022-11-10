import React from "react";


import "./test.css"
import Header from "../components/Header/header";
// import { transferNFT, getOwner, test } from "../lib/api/interact";

const Test = () => {
  // transferNFT()
  // test()
  // getOwner(0)
  return (
    <div className="profile">
      <Header/>

    </div>
  )
}

export default Test


// メモ サーバーに持たせるもの
// サーバー側には1.ユーザー名 2.アイコン画像 3.所持しているtokenId 