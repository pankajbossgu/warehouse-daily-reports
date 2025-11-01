import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">🏭 Warehouse Daily Report System</h1>
      <p className="mb-8 text-gray-600">Select your login type below:</p>

      <div className="flex flex-col gap-4">
        <Link
          to="/employee"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
        >
          👷 Employee Login
        </Link>

        <Link
          to="/admin"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
        >
          👑 Admin Login
        </Link>
      </div>
    </div>
  );
}
