import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import { Box, CircularProgress, TextField } from "@mui/material";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function Photodropzone({ uploadFiles, handleClose, isMinting }) {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    console.log(files);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img width="100%" height="100%" src={file.preview} alt={file.name} />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      console.log(files);
    },
    [files]
  );

  const handleUpload = () => {
    uploadFiles(files, caption);
  };

  return (
    <div>
      {files.length === 0 ? (
        <section>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div>Drag and drop your images here.</div>
          </div>{" "}
        </section>
      ) : (
        <div>
          <aside>{thumbs}</aside>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          maxWidth: "100%",
          widht: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          pt: 5,
        }}
      >
        <TextField
          label="Caption"
          variant="standard"
          size="small"
          sx={{
            width: "100%",
            pb: 5,
          }}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleClose} sx={{ pr: 2 }}>
            Close
          </Button>
          <Button
            onClick={handleUpload}
            style={{
              color: "white",
              backgroundColor: "blue",
            }}
          >
            {isMinting ? (
              <Box sx={{ display: "flex", width: "100%" }}>
                <CircularProgress style={{ color: "white" }} />{" "}
              </Box>
            ) : (
              <p>Upload & Mint</p>
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Photodropzone;
