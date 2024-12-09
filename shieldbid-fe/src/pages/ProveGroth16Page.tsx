import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { prove } from "../api/cryptoApi";
import proveDataJson from "../prove_data/prove_data.json";
import "./ProveGroth16Page.css";

function ProveGroth16Page() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [scalars, setScalars] = useState(["", ""]);
  const [maxScalars, setMaxScalars] = useState(["", ""]);
  const [bases, setBases] = useState(["", "", "", ""]);
  const [maxBases, setMaxBases] = useState(["", "", "", ""]);
  const [commitment, setCommitment] = useState(["", ""]);
  const [maxCommitment, setMaxCommitment] = useState(["", ""]);
  const [response, setResponse] = useState<any>(null);

  const initializeData = () => {
    setScalars(proveDataJson.scalars);
    setMaxScalars(proveDataJson.max_scalars);
    setBases(proveDataJson.bases);
    setMaxBases(proveDataJson.max_bases);
    setCommitment(proveDataJson.commitment);
    setMaxCommitment(proveDataJson.max_commitment);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const proveData = {
        scalars: [scalars[0], scalars[1]] as [string, string],
        max_scalars: [maxScalars[0], maxScalars[1]] as [string, string],
        bases: [bases[0], bases[1], bases[2], bases[3]] as [
          string,
          string,
          string,
          string
        ],
        max_bases: [maxBases[0], maxBases[1], maxBases[2], maxBases[3]] as [
          string,
          string,
          string,
          string
        ],
        commitment: [commitment[0], commitment[1]] as [string, string],
        max_commitment: [maxCommitment[0], maxCommitment[1]] as [
          string,
          string
        ],
      };

      const proveResponse = await prove(proveData);
      console.log("Prove Response:", proveResponse);
      setResponse(proveResponse);
    } catch (error) {
      console.error("Error submitting proof:", error);
      alert("Failed to submit proof. Please try again.");
    }
  };

  const handleInputChange = (
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setState((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleCopyProof = () => {
    if (!response) {
      alert("No proof data to copy.");
      return;
    }

    const formattedResponse = JSON.stringify(response, null, 2);

    navigator.clipboard
      .writeText(formattedResponse)
      .then(() => {
        alert("Proof data copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy proof data:", err);
        alert("Failed to copy proof data.");
      });
  };

  return (
    <div className="flex flex-col w-full h-svh">
      <h2 className="text-5xl text-white font-bold font-dream text-center my-12">
        Prove Page
      </h2>
      <hr className="border-white w-full opacity-50 mb-8" />
      
      <h3 className="text-2xl text-white font-dream text-center mb-4">
        {`Auction ID: ${auctionId}`}
      </h3>
      
      <button 
        onClick={initializeData}
        className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors mx-auto mb-8"
      >
        Load Data
      </button>
      
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col w-full"
      >
        {/* Scalars */}
        <div className="flex flex-col w-full px-32 my-4">
          <label className="text-xl font-dream text-white text-center mb-4">
            Scalars
          </label>
          <div className="grid grid-cols-4 gap-4">
            {scalars.map((val, i) => (
              <input
                key={`scalar-${i}`}
                value={val}
                onChange={(e) => handleInputChange(setScalars, i, e.target.value)}
                placeholder={`Scalar ${i + 1}`}
                className="bg-transparent border-b-white border-b-2 text-white text-center"
              />
            ))}
          </div>
        </div>
  
        {/* Bases */}
        <div className="flex flex-col w-full px-32 my-4">
          <label className="text-xl font-dream text-white text-center mb-4">
            Bases
          </label>
          <div className="grid grid-cols-4 gap-4">
            {bases.map((val, i) => (
              <input
                key={`base-${i}`}
                value={val}
                onChange={(e) => handleInputChange(setBases, i, e.target.value)}
                placeholder={`Base ${i + 1}`}
                className="bg-transparent border-b-white border-b-2 text-white text-center"
              />
            ))}
          </div>
        </div>
  
        {/* Commitment */}
        <div className="flex flex-col w-full px-32 my-4">
          <label className="text-xl font-dream text-white text-center mb-4">
            Commitment
          </label>
          <div className="grid grid-cols-4 gap-4">
            {commitment.map((val, i) => (
              <input
                key={`commitment-${i}`}
                value={val}
                onChange={(e) => handleInputChange(setCommitment, i, e.target.value)}
                placeholder={`Commitment ${i + 1}`}
                className="bg-transparent border-b-white border-b-2 text-white text-center"
              />
            ))}
          </div>
        </div>
  
        {/* Hidden Inputs */}
        <div className="hidden">
          {/* Max Scalars */}
          {maxScalars.map((val, i) => (
            <input
              key={`max-scalar-${i}`}
              value={val}
              onChange={(e) => handleInputChange(setMaxScalars, i, e.target.value)}
              placeholder={`Max Scalar ${i + 1}`}
            />
          ))}
          
          {/* Max Bases */}
          {maxBases.map((val, i) => (
            <input
              key={`max-base-${i}`}
              value={val}
              onChange={(e) => handleInputChange(setMaxBases, i, e.target.value)}
              placeholder={`Max Base ${i + 1}`}
            />
          ))}
          
          {/* Max Commitment */}
          {maxCommitment.map((val, i) => (
            <input
              key={`max-commitment-${i}`}
              value={val}
              onChange={(e) => handleInputChange(setMaxCommitment, i, e.target.value)}
              placeholder={`Max Commitment ${i + 1}`}
            />
          ))}
        </div>
  
        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
            className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
          >
            Prove
          </button>
        </div>
      </form>
  
      {response && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCopyProof}
            className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
          >
            Copy Proof
          </button>
        </div>
      )}
    </div>
  );
}

export default ProveGroth16Page;
