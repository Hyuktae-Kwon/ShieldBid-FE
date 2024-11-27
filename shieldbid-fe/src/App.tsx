import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VerifyGroth16Page from "./pages/VerifyGroth16Page";
import SignupPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
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
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-proof" element={<VerifyGroth16Page />} />
          <Route path="/create-auction" element={<CreateAuctionPage />} />
          <Route path="/auction-list" element={<AuctionListPage />} />
          <Route path="/auction/:productId" element={<AuctionDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
