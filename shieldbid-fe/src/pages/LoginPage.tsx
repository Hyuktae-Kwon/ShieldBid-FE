import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { address });
    onLogin();
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full h-svh">
      <h2 className="text-5xl text-white font-bold font-dream text-center my-24">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="flex flex-col w-full px-32">
          <label className="text-xl font-dream text-white text-center my-4">Enter user address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="bg-transparent border-b-white border-b-2 text-white text-center"
          />
        </div>
        <button type="submit" className="text-2xl mt-12 text-white font-dream">Proceed Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
