async function main() {
    // Grab the contract factory 
    const MyNFT = await ethers.getContractFactory("NFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy(); // Instance of the contract 

    const Marketplace = await ethers.getContractFactory("Marketplace")
    const marketplace = await Marketplace.deploy(1)
    console.log("Contract deployed to address:", myNFT.address);
    console.log('Marketplace contract address', marketplace.address)
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });