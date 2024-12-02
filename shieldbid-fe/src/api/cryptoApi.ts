import axios from "axios";

const api = axios.create({
  //   baseURL: process.env.REACT_APP_CRYPTO_API_BASE_URL,
  baseURL: "http://localhost:13000",
  timeout: 100000,
});

export const commit = async (bidPrice: string) => {
  try {
    const response = await api.post("/commit", {
      bid_price: bidPrice,
    });
    return response.data;
  } catch (error) {
    console.error("Error in commit:", error);
    throw error;
  }
};

export const prove = async (proveRequest: {
  scalars: [string, string];
  max_scalars: [string, string];
  bases: [string, string, string, string];
  max_bases: [string, string, string, string];
  commitment: [string, string];
  max_commitment: [string, string];
}) => {
  try {
    const response = await api.post("/prove", proveRequest);
    return response.data;
  } catch (error) {
    console.error("Error in prove:", error);
    throw error;
  }
};
