import React, { useEffect, useState } from "react";
import web3 from "../web3";
import { Uint256 } from "web3";
import proofData from "../proof_data/proof.json";
import vkData from "../proof_data/vk.json";
import verifyInputsData from "../proof_data/verify_inputs.json";
import gro from "../contract";
import formatVk from "../types/types";

const proofArr = proofData.proof;
const verifyInputsArr = verifyInputsData.verifyInputs;

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
    const _vk = formatVk(vkData.vk);
    setProof(proofArr);
    setInput(verifyInputsArr);
    setVk(_vk);
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
      setMessage(res ? "Pairing check passed" : "Pairing check failed");
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  }

  return (
    <div>
      <h2>Groth16VerifyBn254 contract</h2>
      <hr />
      <form onSubmit={verifyProof}>
        <h4>Input proof and inputs</h4>
        <div>
          <label>Proof:</label>
          {Array.from({ length: 8 }).map((_, i) => (
            <input
              key={i}
              value={proof[i] || ""}
              onChange={(event) => handleProofChange(i, event.target.value)}
              placeholder={`Proof ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <label>Inputs:</label>
          {Array.from({ length: 12 }).map((_, i) => (
            <input
              key={i}
              value={input[i] || ""}
              onChange={(event) => handleInputChange(i, event.target.value)}
              placeholder={`Input ${i + 1}`}
            />
          ))}
        </div>
      </form>
      <hr />
      <button onClick={fillIn}>Fill in data</button>
      <hr />
      <button onClick={verifyProof}>Verify proof</button>
      <h1>{message}</h1>
    </div>
  );
}

export default VerifyGroth16Page;
