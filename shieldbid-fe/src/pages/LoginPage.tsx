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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Enter user address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
