import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="space-x-4">
          <Link className="text-blue-600 hover:underline" to="/passengers">
            Passengers
          </Link>
          <Link className="text-blue-600 hover:underline" to="/flagged">
            Flagged
          </Link>
          <Link className="text-blue-600 hover:underline" to="/analytics">
            Analytics
          </Link>
          <Link className="text-blue-600 hover:underline" to="/alerts">
            Send Alerts
          </Link>
        </div>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
