import axios from "axios";
const FormData = require("form-data");

export const pinFileToIPFS = async (
  files,
  pinataApiKey,
  pinataSecretApiKey
) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const file = files[0];

  let data = new FormData();
  data.append("file", file);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
        const ipfsHash = response.data.IpfsHash
        console.log(ipfsHash)
        return {
            success: true,
            pinataUrl: 'https://gateway.pinata.cloud/ipfs/' + ipfsHash
        }
    })
    .catch(function (error) {
      console.log(error);
    });
};
