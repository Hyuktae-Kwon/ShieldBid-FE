import React, { useState, useEffect } from "react";
import "./AuctionListPage.css";
import { Link, useNavigate } from "react-router-dom";

interface Auction {
  product_id: number;
  auction_state: string;
  product_name: string;
  product_type: string;
  product_description: string;
  created_at: Date;
  updated_at: Date;
  min_price: number;
}

function AuctionListPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const now = new Date(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      const dummyData: Auction[] = [
        {
          product_id: 1,
          product_name: "Antique Vase",
          product_type: "A",
          product_description: "A rare antique vase.",
          auction_state: "Started",
          created_at: now,
          updated_at: now,
          min_price: 100,
        },
        {
          product_id: 2,
          product_name: "Vintage Watch",
          product_type: "B",
          product_description: "A classic vintage watch.",
          auction_state: "pending",
          created_at: now,
          updated_at: now,
          min_price: 1000,
        },
        {
          product_id: 3,
          product_name: "Artwork",
          product_type: "A",
          product_description: "Beautiful painting by a famous artist.",
          auction_state: "Terminated",
          created_at: now,
          updated_at: now,
          min_price: 10000,
        },
      ];
      setAuctions(dummyData);
    };

    fetchAuctions();
  }, []);

  const handleNavigateToProve = (auctionId: number) => {
    navigate(`/proveGroth16/${auctionId}`);
  };

  return (
    <div className="flex flex-col w-full min-h-svh">
      <h1 className="text-5xl text-white font-bold font-dream text-center my-24">Auction List</h1>
      <div className="w-full px-8 md:px-32">
        <ul className="space-y-6">
          {auctions.map((auction) => (
            <li
              key={auction.product_id}
              className={`
                flex flex-col p-6 border-b-2 border-white/30 
                ${auction.auction_state === "Terminated" ? "opacity-50" : ""}
              `}
            >
              <h3 className="text-2xl text-white font-dream mb-4">{auction.product_name}</h3>
              <p className="text-white/80 mb-2">{auction.product_description}</p>
              <p className="text-white mb-2">{`Opening Bid: ${auction.min_price}`}</p>
              <p className="text-white/60 mb-4">{`Updated at: ${auction.updated_at.toLocaleString()}`}</p>
              <div className="self-center">
                {auction.auction_state === "Terminated" ? (
                  <button 
                    onClick={() => handleNavigateToProve(auction.product_id)}
                    className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
                  >
                    Prove
                  </button>
                ) : (
                  <Link to={`/auction/${auction.product_id}`}>
                    <button 
                      className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
                    >
                      View Auction
                    </button>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AuctionListPage;
