import React from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AuctionDetailProps {
  product_id: number;
  product_name: string;
  product_type: string;
  product_description: string;
  is_terminated: boolean;
  created_at: Date;
  updated_at: Date;
}

const now = new Date(Date.now());

const dummyAuctionData: AuctionDetailProps[] = [
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
    product_description: "A rare antique vase.",
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

function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>(); // Get auction ID from route params
  const navigate = useNavigate();

  const auction = dummyAuctionData.find(
    (item) => item.product_id === Number(id)
  );

  if (!auction) {
    return (
      <div>
        <h1>Auction Not Found</h1>
        <button onClick={() => navigate("/auction-list")}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{auction.product_name}</h1>
      <p>
        <strong>Description:</strong> {auction.product_description}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {auction.is_terminated ? "Terminated" : "Active"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(auction.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(auction.updated_at).toLocaleString()}
      </p>
      <button onClick={() => navigate("/auction-list")}>
        Back to Auction List
      </button>
    </div>
  );
}

export default AuctionDetailPage;
