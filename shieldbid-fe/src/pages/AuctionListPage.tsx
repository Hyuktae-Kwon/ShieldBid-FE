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
    <div>
      <h1>Auction List</h1>
      <ul>
        {auctions.map((auction) => (
          <li
            key={auction.product_id}
            className={
              auction.auction_state === "Terminated" ? "terminated" : ""
            }
          >
            <h3>{auction.product_name}</h3>
            <p>{auction.product_description}</p>
            <p>{`Opening Bid: ${auction.min_price}`}</p>
            <p>{`Updated at: ${auction.updated_at.toLocaleString()}`}</p>
            {auction.auction_state === "Terminated" ? (
              <button onClick={() => handleNavigateToProve(auction.product_id)}>
                Prove
              </button>
            ) : (
              <Link to={`/auction/${auction.product_id}`}>
                <button>View Auction</button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionListPage;
