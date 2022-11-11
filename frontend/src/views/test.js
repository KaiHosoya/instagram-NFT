import React, { useState, useContext } from "react";


import "./test.css"
import Header from "../components/Header/header";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { NFTContext } from "../App";
import { transferNFT, getOwner, test } from "../lib/api/interact";


const Test = () => {
  const { open, setOpen, walletAddress} = useContext(NFTContext)
  const handleSubmit = async() => {
    await transferNFT(walletAddress, 1)
    .then((res) => {
      console.log(res)
    })
  }
  return (
    <div className="profile">
      <Header/>
      <Box>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Close me!
          </Alert>
        </Collapse>
      </Box>
      <button onClick={handleSubmit}>
        購入する
      </button>
    </div>
  )
}

export default Test


// メモ サーバーに持たせるもの
// サーバー側には1.ユーザー名 2.アイコン画像 3.所持しているtokenId 