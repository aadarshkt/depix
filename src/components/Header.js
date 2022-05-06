import { Box, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const Header = ({ handleClickOpen, walletAddress, connectWalletPressed }) => {

  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "50%",
          height: 50,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="grey">
          Depix
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "50%",
          height: 50,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <IconButton aria-label="create post" onClick={handleClickOpen}>
          <AddCircleOutlineRoundedIcon fontSize="large" color="white" />
        </IconButton>
        <Button variant="outlined" onClick={connectWalletPressed}>
          {" "}
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
