import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminPanel from "./AdminPanel.jsx";
import { useState, useEffect } from "react";

function EmployeeApp() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [remarks, setRemarks] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timing, setTiming] = useState("");
  const [duration, setDuration] = useState("");
  const [completed, setCompleted] = useState(false);
  const [reports, setReports] = useState([]);

  const BACKEND_URL =
    "https://redesigned-capybara-xv6pr9wjrpv29p59-5000.app.github.dev";

  const fetchReports = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URL}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          task,
          remarks,
          quantity,
          timing,
          duration,
          completed,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      await fetchReports();
      alert("✅ Report submitted successfully!");
      setName("");
      setTask("");
      setRemarks("");
      setQuantity("");
      setTiming("");
      setDuration("");
      setCompleted(false);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Server connection error. Please check backend URL!");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏭 Warehouse Daily Work Report</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Task</option>
          <option>RTO OPEN</option>
          <option>Packing of D-Fame</option>
          <option>Packing of Viral</option>
          <option>Labeling</option>
          <option>Filling</option>
          <option>Capping</option>
          <option>Cleaning</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Timing (e.g. 10 AM - 5 PM)"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Duration (e.g. 2 hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span>Completed</span>
        </label>

        <textarea
          placeholder="Remarks (optional)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">📋 Submitted Reports</h2>
      <ul className="space-y-2">
        {reports.map((r, i) => (
          <li key={i} className="border p-2 rounded">
            <strong>{r.name}</strong> — {r.task}
            <br />
            Quantity: {r.quantity} | Timing: {r.timing} | Duration: {r.duration}
            <br />
            {r.completed ? "✅ Completed" : "❌ Pending"}
            <br />
            Remarks: {r.remarks}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<EmployeeApp />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
