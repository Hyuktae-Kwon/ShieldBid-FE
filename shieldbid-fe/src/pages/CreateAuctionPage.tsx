// CreateAuctionPage.tsx
import React, { useState } from "react";

function CreateAuctionPage() {
  const [auctionName, setAuctionName] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auction Created:", {
      auctionName,
      startingBid,
      description,
    });
    // Add logic
  };

  return (
    <div>
      <h1>Create Auction</h1>
      <form onSubmit={handleCreateAuction}>
        <div>
          <label>Auction Name:</label>
          <input
            type="text"
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Starting Bid:</label>
          <input
            type="number"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}

export default CreateAuctionPage;
