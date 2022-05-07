import Header from "./components/Header";
import { Box } from "@mui/material";
import PostDialog from "./common/PostDialog";
import React, { useEffect, useState } from "react";
import { pinFileToIPFS } from "./utils/pinata";
import axios from 'axios';
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact";
const pinataApiKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET;

function App() {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(``);
  const [isMinting, setIsMinting] = useState(false)
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  // axios.defaults.withCredentials = true;
  axios.defaults.withCredentials = true
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (files, caption) => {
    const fileInfo = {
      files: files,
      fileUrl: fileUrl,
      setFileUrl: setFileUrl,
    };
    setIsMinting(true)
    console.log(fileInfo);
    //upload file to ipfs through pinata
    const response = await pinFileToIPFS(
      files,
      pinataApiKey,
      pinataSecretApiKey
    );
    console.log(response.pinataUrl)
    const { status } = await mintNFT(response.pinataUrl, caption);
    setIsMinting(false)
    setStatus(status);
    console.log(status)
    setOpen(false);
  };

  const connectWalletPressed = async () => {
    
    
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

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }





  return (

    <Box sx={{ height: "100vh" }}>
      <Header
        walletAddress={walletAddress}
        connectWalletPressed={connectWalletPressed}
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
