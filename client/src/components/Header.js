import { Box, Typography, IconButton, Button, AppBar, Toolbar } from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Home from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';


const Header = ({ handleClickOpen, walletAddress, connectWalletPressed }) => {

  


  return (

    <React.Fragment>
      <AppBar sx ={{
        background:'#fff7',
      }}>
        
        <Toolbar>
        <Box m={1}
        sx={{
          
        }}>

             <Typography variant="h4" color="#072953" fontSize="2.125rem">
              DivMiners
            </Typography>
        </Box>

        <Box ml={2}
           sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
            height: 50,
            fontSize:"2rem",
            alignContent: "center",
            backgroundColor: "inherit",
            alignItems: "center",
          }}
          >  
                      <Box>
        
                       <Button sx={{ color:"#128cffa3",
                        fontSize:"1.4rem",
                        }} mr={1} ml={1}>
                        <Home sx={{ 
                        color:"#574ff4",
                        width:"2rem",
                        height:"2rem",
                         }} mr={1} ml={1}/>

                      <Box ml={1}> 
                         Home
                      </Box> </Button>

                      <Button sx={{ color:"#128cffa3",
                        fontSize:"1.4rem",
                        }} mr={1} ml={1}>
                        <InfoIcon sx={{ 
                        color:"#574ff4",
                        width:"2rem",
                        height:"2rem",
                         }} mr={1} ml={1}/>

                      <Box ml={1}> 
                         About
                      </Box> </Button>

                      <Button sx={{ color:"#128cffa3",
                        fontSize:"1.4rem",
                        }} mr={1} ml={1}>
                        <ContactsIcon sx={{ 
                        color:"#574ff4",
                        width:"2rem",
                        height:"2rem",
                         }} mr={1} ml={1}/>

                      <Box ml={1}> 
                      Contact Us
                      </Box> </Button>

                      </Box>
                     
          </Box>
          <Box
            sx={{
              display: "flex",
              // marginLeft:"1rem",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "40%",
              height: 50,
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="create post" onClick={handleClickOpen}>
              <AddCircleOutlineRoundedIcon fontSize="large" color="white" />
            </IconButton>
            <Button color="info" ml={2} variant="contained" onClick={connectWalletPressed}>
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
        </Toolbar>
      </AppBar>
    </React.Fragment>

    

    // <Box
    //   sx={{
    
    //     display: "flex",
    //     flexDirection: "row",
    //     p: 2,
    //   }}
    // >

    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "flex-start",
    //           width: "50%",
    //           height: 50,
    //           backgroundColor: "white",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Typography variant="h4" color="grey">
    //           Depix
    //         </Typography>
    //       </Box>
    //       <Box
    //        sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "flex-start",
    //         width: "50%",
    //         height: 50,
    //         alignContent: "center",
    //         backgroundColor: "white",
    //         alignItems: "center",
    //       }}
    //       >    <Home/>

    //        <Button
    //        style={homeStyle}>Home</Button>

    //       </Box>

    //       <Box
    //        sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "flex-start",
    //         width: "50%",
    //         height: 50,
    //         backgroundColor: "white",
    //         alignItems: "center",
    //       }}
    //       >    <CategoryIcon/>  
          
    //        <Button>Category</Button>

    //       </Box>

    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "flex-end",
    //           width: "50%",
    //           height: 50,
    //           backgroundColor: "white",
    //           alignItems: "center",
    //         }}
    //       >
    //         <IconButton aria-label="create post" onClick={handleClickOpen}>
    //           <AddCircleOutlineRoundedIcon fontSize="large" color="white" />
    //         </IconButton>
    //         <Button variant="outlined" onClick={connectWalletPressed}>
    //           {" "}
    //           {walletAddress.length > 0 ? (
    //             "Connected: " +
    //             String(walletAddress).substring(0, 6) +
    //             "..." +
    //             String(walletAddress).substring(38)
    //           ) : (
    //             <span>Connect Wallet</span>
    //           )}
    //         </Button>
    //       </Box>
    // </Box>
  );
};

export default Header;
