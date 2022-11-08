// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "v1512wg4B_dK8HDikgpBaCX6F_Bnundb",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export const getNFT = async () => {
  // Contract address
  const address = "0x6d36cdbC1f2D96A057961aB752E9B1e550498F7c";

  // Flag to omit metadata
  const omitMetadata = false;

  const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [ensContractAddress],
    omitMetadata: omitMetadata,
  })
  console.log(nfts)

  let i = 1;

  for (let nft of nfts) {
    console.log(`${i}. ${nft.rawMetadata.image}`);
    i++;
  }
};