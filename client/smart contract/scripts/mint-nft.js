require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
console.log(JSON.stringify(contract.abi));
const contractAddress = "0x57Cd7E1d52Ab24767f3CFA69C4a82372D4A784E2";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 2999999987,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
      const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP");