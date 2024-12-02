import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { prove } from "../api/cryptoApi";

function ProveGroth16Page() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [scalars, setScalars] = useState(["", ""]);
  const [maxScalars, setMaxScalars] = useState(["", ""]);
  const [bases, setBases] = useState(["", "", "", ""]);
  const [maxBases, setMaxBases] = useState(["", "", "", ""]);
  const [commitment, setCommitment] = useState(["", ""]);
  const [maxCommitment, setMaxCommitment] = useState(["", ""]);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const proveData = {
        scalars: [scalars[0], scalars[1]] as [string, string], // 튜플로 명시적으로 변환
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

  return (
    <div>
      <h1>Prove Groth16 Page</h1>
      <h3>{`Auction ID: ${auctionId}`}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Scalars</h4>
          {scalars.map((val, i) => (
            <input
              key={`scalar-${i}`}
              value={val}
              onChange={(e) => handleInputChange(setScalars, i, e.target.value)}
              placeholder={`Scalar ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <h4>Max Scalars</h4>
          {maxScalars.map((val, i) => (
            <input
              key={`max-scalar-${i}`}
              value={val}
              onChange={(e) =>
                handleInputChange(setMaxScalars, i, e.target.value)
              }
              placeholder={`Max Scalar ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <h4>Bases</h4>
          {bases.map((val, i) => (
            <input
              key={`base-${i}`}
              value={val}
              onChange={(e) => handleInputChange(setBases, i, e.target.value)}
              placeholder={`Base ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <h4>Max Bases</h4>
          {maxBases.map((val, i) => (
            <input
              key={`max-base-${i}`}
              value={val}
              onChange={(e) =>
                handleInputChange(setMaxBases, i, e.target.value)
              }
              placeholder={`Max Base ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <h4>Commitment</h4>
          {commitment.map((val, i) => (
            <input
              key={`commitment-${i}`}
              value={val}
              onChange={(e) =>
                handleInputChange(setCommitment, i, e.target.value)
              }
              placeholder={`Commitment ${i + 1}`}
            />
          ))}
        </div>
        <div>
          <h4>Max Commitment</h4>
          {maxCommitment.map((val, i) => (
            <input
              key={`max-commitment-${i}`}
              value={val}
              onChange={(e) =>
                handleInputChange(setMaxCommitment, i, e.target.value)
              }
              placeholder={`Max Commitment ${i + 1}`}
            />
          ))}
        </div>
        <button type="submit">Submit Proof</button>
      </form>

      {response && (
        <div>
          <h3>Prove Response</h3>
          <p>
            <strong>Proof:</strong> {response.proof.join(", ")}
          </p>
          <p>
            <strong>Verification Key:</strong> {response.vk.join(", ")}
          </p>
          <p>
            <strong>Verify Inputs:</strong> {response.verify_inputs.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProveGroth16Page;
