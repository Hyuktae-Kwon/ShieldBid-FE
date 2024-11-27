import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AuctionDetailProps {
  product_id: number;
  auction_state: string;
  product_name: string;
  product_type: string;
  product_description: string;
  created_at: Date;
  updated_at: Date;
  min_price: number;
}

interface User {
  id: string;
  isConsignor: boolean;
}

const now = new Date(Date.now());

const dummyAuctionData: AuctionDetailProps[] = [
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

function AuctionDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bidPrice, setBidPrice] = useState<number | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const dummyUser: User = {
        id: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
        isConsignor: false,
      };
      setUser(dummyUser);
    };

    fetchUser();
  }, []);

  const auction = dummyAuctionData.find(
    (item) => item.product_id === Number(productId)
  );

  if (!auction) {
    return (
      <div>
        <h1>Auction Not Found</h1>
        <button onClick={() => navigate("/auction-list")}>Go Back</button>
      </div>
    );
  }

  const handleBidSubmit = () => {
    if (bidPrice !== null) {
      alert(`Your bid of ${bidPrice} has been submitted!`);
      setBidPrice(null);
    } else {
      alert("Please enter a valid bid price.");
    }
  };

  const handleTerminateAuction = () => {
    alert("Auction terminated!");
  };

  return (
    <div>
      <h1>{auction.product_name}</h1>
      <p>
        <strong>Description:</strong> {auction.product_description}
      </p>
      <p>
        <strong>Status:</strong> {auction.auction_state}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(auction.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(auction.updated_at).toLocaleString()}
      </p>

      {user?.isConsignor && auction.auction_state === "Started" && (
        <div>
          <button onClick={handleTerminateAuction}>Terminate auction</button>
        </div>
      )}

      {!user?.isConsignor && auction.auction_state === "Started" && (
        <div>
          <h3>Place Your Bid</h3>
          <input
            type="number"
            placeholder="Enter your bid price"
            value={bidPrice || ""}
            onChange={(e) => setBidPrice(Number(e.target.value))}
          />
          <button onClick={handleBidSubmit}>Submit Bid</button>
        </div>
      )}

      <button onClick={() => navigate("/auction-list")}>
        Back to Auction List
      </button>
    </div>
  );
}

export default AuctionDetailPage;
