import Header from "./components/Header";
import { Box } from "@mui/material";
import PostDialog from "./common/PostDialog";
import React, { useEffect, useState } from "react";
import { pinFileToIPFS } from "./utils/pinata";
import axios from 'axios';
import {
  connectWallet,
  getCurrentWalletConnected,
  mintThenList,
} from "./utils/interact";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MarketplaceAbi from "./Marketplace.json";
import NFTAbi from "./NFT.json";
import { ethers } from "ethers";
const pinataApiKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET;

// Contract deployed to address: 0x1cDeCb8a9d4D2Bbe44F054B45c069aa08b876cd7
// Marketplace contract address 0xef35F33b4922a326B87447b24798bA1e4FD599B1

const MarketplaceAddress = "0xef35f33b4922a326b87447b24798ba1e4fd599b1";
const NFTAddress = "0x1cdecb8a9d4d2bbe44f054b45c069aa08b876cd7";

function App() {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(``);
  const [isMinting, setIsMinting] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [marketplace, setMarketplace] = useState({});
  const [nft, setNFT] = useState({});
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setWallet(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    console.log(MarketplaceAddress);
    const marketplace = new ethers.Contract(
      MarketplaceAddress,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress, NFTAbi.abi, signer);
    setNFT(nft);
    console.log(nft, marketplace);
    setLoading(false);
  };

  // axios.defaults.withCredentials = true;
  axios.defaults.withCredentials = true
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (files, caption, price) => {
    const fileInfo = {
      files: files,
      fileUrl: fileUrl,
      setFileUrl: setFileUrl,
    };
    setIsMinting(true);
    console.log(files, caption, price);

    //upload file to ipfs through pinata
    const response = await pinFileToIPFS(
      files,
      pinataApiKey,
      pinataSecretApiKey
    );

    //make metadata
    const metadata = new Object();
    metadata.caption = caption;
    metadata.image = response.pinataUrl;

    console.log(response.pinataUrl);
    const { status, NFThash } = await mintThenList(
      response.pinataUrl,
      caption,
      price,
      nft,
      marketplace
    );
    setIsMinting(false);
    setStatus(status);
    console.log("NFT is minted. ✅ Check out your transaction on Etherscan. https://ropsten.etherscan.io/tx/" + NFThash.hash)
    console.log("Transation of flaoting an NFT with a price is complete. ✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + status.hash);
    setOpen(false);
  };

  const connectWalletPressed = async () => {
    
    try{
    const walletResponse = await connectWallet();
    const res = await axios.post("/login",{
      address: walletResponse.address
    });
    console.log(res.data)
    if(res.data.userExist){
      setStatus(walletResponse.status);
      console.log(walletResponse.status);
      console.log(walletResponse.address);
      setWallet(walletResponse.address);
    }else{

    }
    }catch(err){
      console.log(err);
    }
  };
  const verfifyUser = async () => {
    const res = await axios.get("/login");
    if(res){
      let address = res.data.address;
      setWallet(address);
    }
  }
  useEffect(() => {
    verfifyUser();
    // async function currentWalletConnect() {
    //   const { address, status } = await getCurrentWalletConnected();
    //   setWallet(address);
    //   setStatus(status);
    // }
  }, []);

  // function addWalletListener() {
  //   if (window.ethereum) {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       if (accounts.length > 0) {
  //         setWallet(accounts[0]);
  //         setStatus("👆🏽 Write a message in the text-field above.");
  //       } else {
  //         setWallet("");
  //         setStatus("🦊 Connect to Metamask using the top right button.");
  //       }
  //     });
  //   } else {
  //     setStatus(
  //       <p>
  //         {" "}
  //         🦊{" "}
  //         <a target="_blank" href={`https://metamask.io/download.html`}>
  //           You must install Metamask, a virtual Ethereum wallet, in your
  //           browser.
  //         </a>
  //       </p>
  //     );
  //   }
  // }
  return (

    <Box sx={{ height: "100vh" }}>
      <Header
        walletAddress={walletAddress}
        connectWalletPressed={web3Handler}
        handleClickOpen={handleClickOpen}
      />
      <PostDialog
        open={open}
        isMinting={isMinting}
        setIsMinting={setIsMinting}
        uploadFiles={handleUpload}
        handleClose={handleClose}
        handleUpload={handleUpload}
      />
    </Box>
  

  );



}

export default App;
