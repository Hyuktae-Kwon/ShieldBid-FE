import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { UserDto } from "../dto/UserDto";
import { createAuction } from "../api/auctionApi";

function CreateAuctionPage() {
  const [auctionName, setAuctionName] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [buttonName, setButtonName] = useState("Create Auction")
  const navigate = useNavigate();
  const cookie = new Cookies();
  
  const handleCreateAuction = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserDto = cookie.get("user") as UserDto;
    await createAuction({
      ownerId: user.id,
      productName: productName,
      auctionTitle: auctionName,
      productType,
      productDescription: description,
      minimalPrice: startingBid
    })
    setButtonName("Creating...")
    await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Navigate after 5 seconds
    navigate("/auction-list");
  };

  return (
    <div className="flex flex-col w-full h-svh">
      <h1 className="text-5xl text-white font-bold font-dream text-center my-24">Create Auction</h1>
      <form onSubmit={handleCreateAuction} className="flex flex-col items-center">
        <div className="flex w-full px-32 my-4 items-center justify-center">
          <label className="text-xl font-dream text-white text-center mr-4">Auction Name:</label>
          <input
            type="text"
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
            required
            className="bg-transparent border-b-white border-b-2 text-white text-center w-1/2"
          />
        </div>
        <div className="flex w-full px-32 my-4 items-center justify-center">
          <label className="text-xl font-dream text-white text-center mr-4">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="bg-transparent border-b-white border-b-2 text-white text-center w-1/2"
          />
        </div>
        <div className="flex w-full px-32 my-4 items-center justify-center">
          <label className="text-xl font-dream text-white text-center mr-4">Product Type:</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            className="bg-transparent border-b-white border-b-2 text-white text-center w-1/2"
          />
        </div>
        <div className="flex w-full px-32 my-4 items-center justify-center">
          <label className="text-xl font-dream text-white text-center mr-4">Starting Bid:</label>
          <input
            type="number"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
            className="bg-transparent border-b-white border-b-2 text-white text-center w-1/2"
          />
        </div>
        <div className="flex w-full px-32 my-4 items-center justify-center">
          <label className="text-xl font-dream text-white text-center mr-4">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-transparent border-b-white border-2 w-1/2 text-white text-center h-24"
          />
        </div>
        <button 
          type="submit" 
          className="text-2xl mt-12 text-white font-dream"
        >
          {buttonName}
        </button>
      </form>
    </div>
  );
}

export default CreateAuctionPage;
