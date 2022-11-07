import React, { useState } from "react";

import SideBar from "../components/SideBar/sideBar";

import { Card, CardContent,Typography, CardActions, Button, TextField } from "@mui/material";
import { sendImageToIPFS } from "../lib/api/pinata";
import { mintNFT } from "../lib/api/interact";

const Post = () => {

  const [fileImage, setFileImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState()

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

    try {
      mintNFT(metadata)
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div style={styles.post}>
      <SideBar />
      <div style={styles.content}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography>画像や動画を投稿</Typography>
            </CardContent>

            <CardActions>
              <form
                onSubmit={handleSubmit}
              >
                <TextField
                  placeholder="タイトル"
                  onChange={(e) => {setTitle(e.target.value)}}
                />
                <input
                  type="file"
                  onChange={(e) => {setFileImage(e.target.files[0])}}
                />
                <TextField
                  placeholder="つぶやき"
                  onChange={(e) => {setDescription(e.target.value)}}
                />
                <Button
                  type="submit"
                >
                  投稿
                </Button>
              </form>
            </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default Post

const styles = {
  post: {
    display: "flex"
  },

  content: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center"
  }
}