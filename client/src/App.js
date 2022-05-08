import Header from "./components/Header";
import NFTcard from "./components/NFTcard";
import { Box} from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import PostDialog from "./common/PostDialog";
import React, { useEffect, useState } from "react";
import { pinFileToIPFS } from "./utils/pinata";
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
    setStatus(walletResponse.status);
    console.log(walletResponse.status);
    console.log(walletResponse.address);
    setWallet(walletResponse.address);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    async function currentWalletConnect() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
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
      <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{
    justifyContent:"center",
  }}>
    <Item><NFTcard/></Item>
  </Grid>
  
</Grid>
    </Box>
    

  );



}

export default App;
