import { useState } from "react";
import AdminPanel from "./AdminPanel.jsx";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Simple check — you can change credentials here
    if (adminId === "admin" && password === "pankaj@123") {
      setIsLoggedIn(true);
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  if (isLoggedIn) {
    return <AdminPanel />; // 👑 Redirects to Admin Panel
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">👑 Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
