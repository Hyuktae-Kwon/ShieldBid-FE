import axios from "axios";
import { UserDto } from "../dto/UserDto";

const api = axios.create({
  baseURL: "http://localhost:9422",//process.env.REACT_APP_AUCTION_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
export const loginWithAddr = async (addr: string): Promise<UserDto | null> => {
  const response = await api.post("/user/auth/addr", {
    addr
  })

  if(!response.data) return null;
  return response.data as UserDto;
}

