import { pinJSONtoIPFS } from "./pinata";
require("dotenv")
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract/contract-abi.json");
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
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

// async function loadContract() {
//   return new web3.eth.Contract(contractABI, contractAddress);
// }

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

  console.log(window.ethereum.selectedAddress)

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const getNFT = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  console.log(window.contract.methods)
  window.contract.methods.viewNFT()
}