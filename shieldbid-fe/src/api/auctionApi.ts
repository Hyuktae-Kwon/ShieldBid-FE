import axios from "axios";
import { AuctionDto } from "../dto/AuctionDto";

const api = axios.create({
  baseURL: "http://localhost:9424",//process.env.REACT_APP_AUCTION_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createAuction = async (auctionData: {
  ownerId: string;
  productName: string;
  productType: string;
  minimalPrice: string;
  auctionTitle?: string;
  productDescription: string;
}) => {
  const response = await api.put("/auction", auctionData);
  return response.data;
};

export const queryAllAuctions = async (): Promise<AuctionDto[] | null> => {
  const response = await api.get("/auction/lists")

  if (response.data.ok === false) return null;
  return response.data.data as AuctionDto [];
}

export const queryAuction = async (auctionId: string): Promise<AuctionDto | null> => {
  const response = await api.get(`/auction/list:${auctionId}`)

  if (response.data.ok === false) return null;

  return response.data.data as AuctionDto;
}

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
