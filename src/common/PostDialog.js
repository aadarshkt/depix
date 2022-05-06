import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Photodropzone from "./Photodropzone";

const PostDialog = ({ open, handleClose, uploadFiles, isMinting, setIsMinting}) => {

  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
        <Photodropzone isMinting={isMinting} setIsMinting={setIsMinting} uploadFiles={uploadFiles} handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDialog;
