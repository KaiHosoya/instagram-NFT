// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "v1512wg4B_dK8HDikgpBaCX6F_Bnundb",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export const getAllNfts = async () => {
  // Contract address
  // 生成させたら書き換える
  const address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const response = await alchemy.nft.getNftsForContract(address, {
    omitMetadata: omitMetadata,
  });
  // console.log(JSON.stringify(response, null, 2));
  const nfts = response.nfts

  const imageUrls = []
  for (let i = 0; i < nfts.length; i++) {
    const IPFS = nfts[i].rawMetadata.image;
    imageUrls[i] = "https://gateway.pinata.cloud/" + IPFS
  }
  console.log(imageUrls)
  return imageUrls
};

// "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
