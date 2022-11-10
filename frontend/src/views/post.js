import React, { useEffect, useState } from "react";

import { Card, CardContent,Typography, Button, TextField, Container, Stack, Input } from "@mui/material";
import { sendImageToIPFS } from "../lib/api/pinata";
import { mintNFT, connectWallet, getCurrentWalletConnected } from "../lib/api/interact";
import Header from "../components/Header/header";

const Post = () => {

  const [fileImage, setFileImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState()

  const [walletAddress, setWalletAddress] = useState();
  const [status, setStatus] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const GetCurrentWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWalletAddress(address);
    setStatus(status);
  }
  useEffect(() => {
    GetCurrentWalletConnected();

    addWalletListener();
    }, [])

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("acountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", fileImage);
    console.log(fileImage)
    const imageUrl = await sendImageToIPFS(formData)

    // make matadata
    const metadata = new Object();
    metadata.title = title;
    metadata.imageUrl = imageUrl;
    metadata.description = description
    metadata.create_at = new Date().toLocaleString();
    console.log(metadata)

    try {
      const { success, status } = await mintNFT(metadata); 
      setStatus(status)
      if (success) {
        setTitle("");
        setDescription("");
        setFileImage("");
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div style={styles.post}>
      <Header />
      <div style={styles.content}>
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress?.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
        <Card sx={{ minWidth: 275 }}>
          <form
            onSubmit={handleSubmit}
          >
            <Container>
              <Stack spacing={2}>
                <CardContent>
                  <Typography>画像や動画を投稿</Typography>
                </CardContent>
              {/* <CardActions> */}
                  <TextField
                    placeholder="タイトル"
                    onChange={(e) => {setTitle(e.target.value)}}
                  />
                  <Input
                    type="file"
                    onChange={(e) => {setFileImage(e.target.files[0])}}
                  />
                  <TextField
                    placeholder="つぶやき"
                    onChange={(e) => {setDescription(e.target.value)}}
                    // variant="standard" 
                    fullWidth required
                  />
                  <Button
                    type="submit"
                  >
                    投稿
                  </Button>
              </Stack>
              {/* </CardActions> */}
            </Container>
          </form>
        </Card>
        {status}
      </div>
    </div>
  )
}

export default Post

const styles = {

  content: {
    display: "block",
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    verticalAlign: "middle"
  }
}