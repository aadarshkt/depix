import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box,Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {

  
  return (
    <Card sx={{ maxWidth: 345 ,}}>
      <CardActionArea sx={{
        // padding:"2rem",
        backgroundColor:"#e2e8fbc4",
        
      }}>
        <CardContent sx={{
          textAlign:"center",
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"600",
          fontSize:"1.6rem",
          color:"#000"
          }}>
            Lizard
          </Typography>
      
        </CardContent>
        <CardMedia sx={{
          width:"100%",
        }}
          component="img"
          height="250"
          image="https://preview.redd.it/2co01585e8k81.jpg?width=507&format=pjpg&auto=webp&s=a91fe1395e27f9d9654f2dac6bd8e9337982d022"
          alt="Enter Your IMG Here"
        />
        <CardContent sx={{
          alignContent:"center",
          width:"100%",
        }}>

          <Typography sx={{
            fontSize:"2rem"
          }} >
            Owner Name
          </Typography>
          
          <Typography variant="body2" color="text.secondary" text-align="center">
            Info about NTF should be written here and description also
            can be written here.
          </Typography>
        </CardContent>

      </CardActionArea>
      <Box sx={{
        backgroundColor:"#e2e8fbc4",
        padding:"0",
        display:"flex",
        justifyContent:"space-evenly"
      }}>
      <CardActions
      sx={{
        width:"100%",
        margin:"0",
        padding:"0",
        alignItems:"center",
      }}>
        <Button size="medium" variant="contained"
        sx={
          {
            backgroundColor:"#e2e8fbc4",
            color:"#000",
            width:"100%",
          }
        }>
          Buy 
        </Button>
      </CardActions>
      
      </Box>
    </Card>
  );
}
