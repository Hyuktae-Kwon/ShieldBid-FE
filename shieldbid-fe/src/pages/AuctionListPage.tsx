import React, { useState, useEffect } from "react";
import "./AuctionListPage.css";
import { Link, useNavigate } from "react-router-dom";
import { queryAllAuctions } from "../api/auctionApi";
import _ from "lodash";

interface Auction {
  auction_id: string,
  product_id: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const now = new Date(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      queryAllAuctions()
      .then((auctions)=>{
        console.log(auctions)
        const parsed: Auction[] = _.map(auctions, (auction) => {
          return {
            auction_id: auction.id,
            product_id: auction.product.id,
            auction_state: auction.status,
            product_name: auction.product.name,
            product_type: auction.product.type,
            product_description: auction.product.description,
            created_at: auction.createdAt,
            updated_at: auction.updatedAt,
            min_price: auction.minPrice
          }
        })
        setAuctions(parsed);
        setLoading(false)
      })
      
    };

    fetchAuctions();
  }, []);

  const handleNavigateToProve = (auctionId: string) => {
    navigate(`/proveGroth16/${auctionId}`);
  };

  return (
    loading ? <></> : <div className="flex flex-col w-full min-h-svh">
    <h1 className="text-5xl text-white font-bold font-dream text-center my-24">Auction List</h1>
    <div className="w-full px-8 md:px-32">
      <ul className="space-y-6">
        {auctions.map((auction) => (
          <li
            key={auction.auction_id}
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
              {auction.auction_state === "TERMINATED" ? (
                <button 
                  onClick={() => handleNavigateToProve(auction.auction_id)}
                  className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
                >
                  Prove
                </button>
              ) : (
                <Link to={`/auction/${auction.auction_id}`}>
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
