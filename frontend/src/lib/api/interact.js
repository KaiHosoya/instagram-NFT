import axios from "axios";
import { pinJSONtoIPFS } from "./pinata";
require("dotenv")
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract/contract-abi.json");
const contractAddress = "0x1Ddd82aA2012F86A4BB249Ce2b3986D83EAE9549";
// const contractAddress = "0xd5e8B397f1Aa6059b2f81ef52b26e07B6c1b164c"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

// const testAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// const testPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj;
    } catch (err) {
      return {
        status: "😥 " + err.message,
        address: "",
      };
    }
  } else {
    return {
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
      address: "",
    }
  }
}

export const getCurrentWalletAddress = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0]
        }
      }
    } catch (err) {
      return {
        address: ""
      }
    }
  }
}
 
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


// TODO：　pinataに画像が保存できなかったときに処理を中止する
export const mintNFT = async (metadata) => {
  if (!metadata) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  const pinataResponse = await pinJSONtoIPFS(metadata)
  console.log("pinataResponse is ", pinataResponse)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  console.log("contract is", window.contract)

  // console.log(window.ethereum.selectedAddress)

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };
  console.log("--------------")
  console.log("transactionParameters is: ", transactionParameters)
  console.log("--------------")

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    console.log("failed")
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const tokenURI = async(id) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const response = await window.contract.methods.tokenURI(id).call()
  .then((res) => {
    return res
  })
  return response
}

// 全てのNFTのURIを取得
export const allTokenURIs = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const counts =
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    return(res)
  })
  .catch((err) => {
    console.log(err)
  })
  const URIs = Array()
  for (let i = 0; i < counts; i++) {
    await tokenURI(i)
    .then((res) => {
      axios
        .get(res)
        .then((res) => {
          URIs.push(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return URIs
}

// 特定のアドレスが所有しているNFTのURIを取得
export const ownerTokenURIs = async(walletAddress) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const counts =
  await window.contract.methods.balanceOf(walletAddress).call()
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  const URIs = Array()
  for (let i = 0; i < counts; i++) {
    await tokenURI(i)
      .then((res) => {
        // console.log(res);
        axios
          .get(res)
          .then((res) => {
            // console.log(res.data);
            URIs.push(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return URIs
}

export const transferNFT = async(walletAddress ,tokenId) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  const OwnerAddress = await getOwner(tokenId)
  console.log("wallet address is: ", walletAddress)
  console.log("owner address is: ", OwnerAddress)
  await window.contract.methods.TransferNFT(OwnerAddress, walletAddress, tokenId).call()
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}

export const getOwner = async(id) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  const response = await window.contract.methods.ownerOf(id).call()
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  return response
}

export const getLatestTokenId = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

export const test = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

  // console.log(window.contract.methods)
}