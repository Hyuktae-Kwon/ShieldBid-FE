/// <reference types="react-scripts" />

window.ethereum?.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

export default web3;
