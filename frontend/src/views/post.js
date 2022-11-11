import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Card, CardContent,Typography, Button, TextField, Container, Stack, Input } from "@mui/material";
import { sendImageToIPFS } from "../lib/api/pinata";
import { mintNFT, connectWallet, getCurrentWalletConnected } from "../lib/api/interact";
import Header from "../components/Header/header";
import "./post.css"

const Post = () => {
  // pinataに送るようの画像データ
  const [fileImage, setFileImage] = useState();
  // 表示用の画像データ
  const [image, setImage] = useState()
  const [title, setTitle] = useState();
  const [description, setDescription] = useState()

  const [walletAddress, setWalletAddress] = useState();
  const [status, setStatus] = useState();

  const navigate = useNavigate()

  const onChangeImage = (e) => {
    setFileImage(e.target.files[0])
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload  = (e) => {
        // console.log(e.target.result)
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
        navigate("/", { state: {message: "投稿しました！"}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post">
      <Header />
      <div className="post_content">
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
        <form
            onSubmit={handleSubmit}
        >
          <Card className="post_card">
              <Container>
                <Stack spacing={2}>
                  <CardContent>
                    <Typography style={{fontFamily: "Times New Roman"}}>画像や動画を投稿</Typography>
                  </CardContent>
                {/* <CardActions> */}
                    <TextField
                      placeholder="タイトル"
                      onChange={(e) => {setTitle(e.target.value)}}
                    />
                    <Input
                      type="file"
                      // onChange={(e) => {setFileImage(e.target.files[0])}}
                      onChange={onChangeImage}
                    />
                    <img className="post_picture" src={image} alt="写真"/>
                    <TextField
                      placeholder="つぶやき"
                      onChange={(e) => {setDescription(e.target.value)}}
                      // variant="standard" 
                      fullWidth required
                    />
                    <Button
                      className="post_button"
                      type="submit"
                    >
                      投稿
                    </Button>
                </Stack>
                {/* </CardActions> */}
              </Container>
          </Card>
        </form>
        {status}
      </div>
    </div>
  )
}

export default Post
