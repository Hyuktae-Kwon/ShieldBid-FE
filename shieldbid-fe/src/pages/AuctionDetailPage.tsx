import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { finishAuction, queryAuction } from "../api/auctionApi";
import { commit } from "../api/cryptoApi";
import { AuctionDto } from "../dto/AuctionDto";
import { Cookies } from "react-cookie";
import { UserDto } from "../dto/UserDto";

interface User {
  id: string;
  isConsignor: boolean;
}

const now = new Date(Date.now());

function AuctionDetailPage() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [auction, setAuction] = useState<AuctionDto | null>(null);
  const [bidPrice, setBidPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { auctionId } = useParams<{ auctionId: string }>();
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuction = async () => {
      const id = !auctionId ? "" : auctionId;
      const user = cookies.get("user") as UserDto
      setUser(user)
      
      queryAuction(id)
      .then(auction => {
        setLoading(false) //* FIXME
        if (!auction) {
          return (
            <div>
              <h1>Auction Not Found</h1>
              <button onClick={() => navigate("/auction-list")}>Go Back</button>
            </div>
          );
        }
        setAuction(auction)
      })
    }

    fetchAuction();
  }, []);

  const handleBidSubmit = async () => {
    if (bidPrice !== null) {
      try {
        const response = await commit(bidPrice.toString());
        console.log("Commit Response:", response);
        console.log(`Commit successful! Commitment: ${response}`);
        // todo: post commitment

        navigate("/auction-list");
      } catch (error) {
        console.error("Error committing bid:", error);
        alert("Failed to commit bid. Please try again.");
      } finally {
        setBidPrice(null);
      }
    } else {
      alert("Please enter a valid bid price.");
    }
  };

  const handleTerminateAuction = async () => {
    try {
      await finishAuction(String(auction?.status));
      alert("Auction terminated successfully!");
      navigate("/auction-list");
    } catch (error) {
      alert("Failed to terminate the auction. Please try again.");
    }
  };

  return (
    loading ? <></> : <div className="flex flex-col w-full min-h-svh p-8">
    <h1 className="text-5xl text-white font-bold font-dream text-center my-12">
      {auction?.product.name}
    </h1>

    <div className="flex flex-col w-full px-32 space-y-6 text-white">
      <div>
        <h3 className="text-2xl font-dream mb-2">Description:</h3>
        <p className="text-white/80">{auction?.product.description}</p>
      </div>

      <div>
        <h3 className="text-2xl font-dream mb-2">Status:</h3>
        <p>{auction?.status}</p>
      </div>

      <div>
        <h3 className="text-2xl font-dream mb-2">Created At:</h3>
        <p>{auction?.createdAt.toLocaleString()}</p>
      </div>

      <div>
        <h3 className="text-2xl font-dream mb-2">Updated At:</h3>
        <p>{auction?.updatedAt.toLocaleString()}</p>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        {user?.id === auction?.product.owner && auction?.status === "START" && (
          <button 
            className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
            onClick={handleTerminateAuction}
          >
            Terminate Auction
          </button>
        )}

        {user?.id !== auction?.product.owner && auction?.status === "START" && (
          <div className="flex flex-col items-center space-y-4">
            <input
              type="number"
              value={!bidPrice ? 0 : bidPrice}
              onChange={(e) => setBidPrice(Number(e.target.value))}
              className="bg-transparent border-b-white border-b-2 text-white text-center w-full"
              placeholder="Enter Bid Price"
            />
            <button 
              className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
              onClick={handleBidSubmit}
            >
              Submit Bid
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button 
          className="text-xl text-white font-dream px-4 py-2 border-b-2 border-white hover:bg-white/20 transition-colors"
          onClick={() => navigate("/auction-list")}
        >
          Back to Auction List
        </button>
      </div>
    </div>
  </div>
  );
}

export default AuctionDetailPage;
