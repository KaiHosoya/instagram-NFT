import axios from "axios";

export const sendImageToIPFS = async (formData) => {
  if (formData) {
      try {
          const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                  'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                  'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                  "Content-Type": "multipart/form-data"
              },
          });
          const ImgHash = `ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash); 
        console.log("https://gateway.pinata.cloud/" + ImgHash)
        const imageUrl = "https://gateway.pinata.cloud/" + ImgHash
        return imageUrl

//Take a look at your Pinata Pinned section, you will see a new file added to you list.   
      } catch (error) {
          console.log("Error sending File to IPFS: ")
          console.log(error)
      }
  }
}

export const pinJSONtoIPFS = async(JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
      }
    })
    .then(function(response) {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      }
    })
    .catch(function(error) {
      console.log(error);
      return {
        success: false,
        message: error.messages
      }
    })
}

