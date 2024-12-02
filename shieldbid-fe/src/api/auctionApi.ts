import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_AUCTION_API_BASE_URL,
  timeout: 5000,
});

export const createAuction = async (auctionData: {
  ownerId: string;
  productName: string;
  productType: string;
  auctionTitle?: string;
  minimalPrice: string;
}) => {
  const response = await api.put("/auction", auctionData);
  return response.data;
};

export const finishAuction = async (auctionId: string) => {
  const response = await api.post("/auction/finish", { auctionId });
  return response.data;
};

export const offerBid = async (bidData: {
  auctionId: string;
  price: number;
}) => {
  const response = await api.post("/bid", bidData);
  return response.data;
};
