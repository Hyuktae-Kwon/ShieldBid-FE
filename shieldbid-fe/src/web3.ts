import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

window.ethereum.request({ method: "eth_requestAccounts" });

const web3: Web3 = new Web3(window.ethereum);

export default web3;
