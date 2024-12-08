import formatVk from "../types/types";

import React, { useState } from "react";
import web3 from "../web3";
import gro from "../contract";
import { Uint256 } from "web3";

function VerifyGroth16Page() {
  const [proof, setProof] = useState<Uint256[]>([]);
  const [input, setInput] = useState<Uint256[]>([]);
  const [vk, setVk] = useState<(string[] | string[][])[]>();
  const [message, setMessage] = useState("");

  const handleProofChange = (index: number, value: string) => {
    const updatedProof = [...proof];
    updatedProof[index] = value;
    setProof(updatedProof);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInput = [...input];
    updatedInput[index] = value;
    setInput(updatedInput);
  };

  async function fillIn() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const parsedData = JSON.parse(clipboardText);
      console.log("Parsed data:", parsedData.proof);
      setProof(parsedData.proof);
      setInput(parsedData.verify_inputs);
      setVk(formatVk(parsedData.vk));

      console.log("Parsed proof:", parsedData.proof);
      console.log("Parsed inputs:", parsedData.verify_inputs);
      console.log("Parsed vk:", formatVk(parsedData.vk));
    } catch (error) {
      console.error("Failed to parse clipboard data:", error);
      alert(
        "Failed to parse clipboard data. Ensure the data is in the correct JSON format."
      );
    }
  }

  async function verifyProof() {
    if (!vk) {
      setMessage("Verifying key is not set. Please fill in the data.");
      return;
    }

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    try {
      await gro.methods.verifyProof(proof, input, vk).send({
        from: accounts[0],
        data: web3.eth.abi.encodeFunctionSignature("verifyProof()"),
      });
      const res = await gro.methods.getPairingResult().call();
      setMessage(res ? "Valid auction" : "Invalid auction");
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  }

  return (
    <div className="flex flex-col w-full h-svh">
      <h2 className="text-5xl text-white font-bold font-dream text-center my-12">Verify Proof</h2>
      <hr className="border-white w-full opacity-50 mb-8" />
      <form onSubmit={verifyProof} className="flex flex-col">
        <h4 className="text-2xl text-white font-dream text-center mb-8">Input Proof and Inputs</h4>
        <div className="flex flex-col w-full px-32 my-4">
          <label className="text-xl font-dream text-white text-center mb-4">Proof:</label>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <input
                key={i}
                value={proof[i] || ""}
                onChange={(event) => handleProofChange(i, event.target.value)}
                placeholder={`Proof ${i + 1}`}
                className="bg-transparent border-b-white border-b-2 text-white text-center"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full px-32 my-4">
          <label className="text-xl font-dream text-white text-center mb-4">Inputs:</label>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <input
                key={i}
                value={input[i] || ""}
                onChange={(event) => handleInputChange(i, event.target.value)}
                placeholder={`Input ${i + 1}`}
                className="bg-transparent border-b-white border-b-2 text-white text-center"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button 
            onClick={fillIn}
            className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
          >
            Fill in Data
          </button>
          <button 
            onClick={verifyProof}
            className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
          >
            Verify Proof
          </button>
        </div>
        <h1 className="text-2xl text-white font-dream text-center mt-8">{message}</h1>
      </form>
    </div>
  );
}

export default VerifyGroth16Page;
