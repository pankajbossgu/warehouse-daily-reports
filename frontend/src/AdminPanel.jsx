import { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL =
    "https://redesigned-capybara-xv6pr9wjrpv29p59-5000.app.github.dev";

  // Fetch all users and reports
  const fetchData = async () => {
    try {
      const [userRes, reportRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/users`),
        fetch(`${BACKEND_URL}/api/reports`),
      ]);

      const usersData = await userRes.json();
      const reportsData = await reportRes.json();

      setUsers(usersData);
      setReports(reportsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Failed to connect to backend!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Approve user
  const approveUser = async (email) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/approve/${email}`, {
        method: "PUT",
      });
      const data = await res.json();
      alert(data.message);
      fetchData();
    } catch (err) {
      console.error("Error approving user:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Admin Panel</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Users</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Approved</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.approved ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border p-2">
                {!u.approved && (
                  <button
                    onClick={() => approveUser(u.email)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-4 mb-2">Reports</h2>
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

export default AdminPanel;
