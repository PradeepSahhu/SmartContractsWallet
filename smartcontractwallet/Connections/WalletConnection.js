import { ethers } from "ethers";

async function WalletConnection(contractAddress) {
  if (!window.ethereum) {
    console.log("Please install a wallet like MetaMask.");
    alert("Please install a wallet.");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Create an ethers provider using the injected provider (MetaMask)
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Retrieve contract ABI from environment variables
    const abi = JSON.parse(process.env.SMARTWALLET_ABI); // Ensure ABI is parsed correctly

    console.log("Connecting to contract at:", contractAddress);
    console.log("Smart Wallet ABI:", abi);

    // Connect to the smart contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  } catch (error) {
    console.error("There was an error connecting to the contract:", error);
  }
}

export default WalletConnection;
