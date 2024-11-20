import React, { useState, useEffect } from "react";
import "./AuctionListPage.css";
import { Link } from "react-router-dom";

interface Auction {
  product_id: number;
  product_name: string;
  product_type: string;
  product_description: string;
  is_terminated: boolean;
  created_at: Date;
  updated_at: Date;
}

function AuctionListPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const now = new Date(Date.now());

  useEffect(() => {
    const fetchAuctions = async () => {
      const dummyData: Auction[] = [
        {
          product_id: 1,
          product_name: "Antique Vase",
          product_type: "A",
          product_description: "A rare antique vase.",
          is_terminated: false,
          created_at: now,
          updated_at: now,
        },
        {
          product_id: 2,
          product_name: "Vintage Watch",
          product_type: "B",
          product_description: "A classic vintage watch.",
          is_terminated: false,
          created_at: now,
          updated_at: now,
        },
        {
          product_id: 3,
          product_name: "Artwork",
          product_type: "A",
          product_description: "Beautiful painting by a famous artist.",
          is_terminated: true,
          created_at: now,
          updated_at: now,
        },
      ];
      setAuctions(dummyData);
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h1>Auction List</h1>
      <ul>
        {auctions.map((auction) => (
          <li
            key={auction.product_id}
            className={auction.is_terminated ? "terminated" : ""}
          >
            <h3>{auction.product_name}</h3>
            <p>{auction.product_description}</p>
            <p>{auction.updated_at.toLocaleString()}</p>
            <Link to={`/auction/${auction.product_id}`}>
              <button>View Auction</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionListPage;
