import { ethers } from "ethers";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require("../contract-abi.json");
const contractAddress = "0x57cd7e1d52ab24767f3cfa69c4a82372d4a784e2";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (error) {
      return {
        address: "",
        status: "😥 " + error.message,
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
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

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
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintThenList = async (url, caption, price, nft, marketplace) => {
  if (url.trim() === "" || caption.trim() === "" || price.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  // add nft to marketplace
  const listingPrice = ethers.utils.parseEther(price.toString());

  // mint nft
  const responseNFT = await nft.mint(url);
  // get tokenId of new nft
  console.log(responseNFT);
  const id = await nft.tokenCount();
  const response = await marketplace.makeItem(nft.address, id, listingPrice);
  console.log(response);

  return {
    success: true,
    status: response,
    NFThash: responseNFT
  };

  // const tokenURI = url;

  // window.contract = new web3.eth.Contract(contractABI, contractAddress);

  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: window.ethereum.selectedAddress, // must match user's active address.
  //   data: window.contract.methods
  //     .mintNFT(window.ethereum.selectedAddress, tokenURI)
  //     .encodeABI(), //make call to NFT smart contract
  // };

  // try {
  //   const txHash = await window.ethereum.request({
  //     method: "eth_sendTransaction",
  //     params: [transactionParameters],
  //   });
  //   return {
  //     success: true,
  //     status:
  //       "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
  //       txHash,
  //   };
  // } catch (error) {
  //   return {
  //     success: false,
  //     status: "😥 Something went wrong: " + error.message,
  //   };
  // }
};
