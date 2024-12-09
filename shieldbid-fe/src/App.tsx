import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VerifyGroth16Page from "./pages/VerifyGroth16Page";
import SignupPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import ProveGroth16Page from "./pages/ProveGroth16Page";
import { useState } from "react";
import MainPage from "./pages/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="flex flex-col">
        <nav className="flex">
          <ul className="flex w-full justify-center items-center h-24 text-white gap-24 font-dream">
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/">Home</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <Link to="/create-auction">Create Auction</Link>
            </li>
            <li>
              <Link to="/verify-proof">Verify Proof</Link>
            </li>
            <li>
              <Link to="/auction-list">Auction List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-proof" element={<VerifyGroth16Page />} />
          <Route path="/create-auction" element={<CreateAuctionPage />} />
          <Route path="/auction-list" element={<AuctionListPage />} />
          <Route path="/auction/:auctionId" element={<AuctionDetailPage />} />
          <Route
            path="/proveGroth16/:auctionId"
            element={<ProveGroth16Page />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
