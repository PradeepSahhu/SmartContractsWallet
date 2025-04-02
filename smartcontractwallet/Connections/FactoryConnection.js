import { ethers } from "ethers";

async function FactoryConnection() {
  if (!window.ethereum) {
    console.log("Please install a wallet like MetaMask.");
    alert("Please install a wallet.");
    return;
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Create an ethers provider using the injected provider (MetaMask)
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Retrieve contract details from environment variables
    const contractAddress = process.env.FACTORY_CONTRACT_ADDRESS;
    const abi = JSON.parse(process.env.FACTORY_ABI); // Ensure ABI is parsed correctly

    console.log("CONTRACT ADDRESS:", contractAddress);
    console.log("Factory ABI:", abi);

    // Connect to the smart contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  } catch (error) {
    console.error("There was an error connecting to the contract:", error);
  }
}

export default FactoryConnection;
