import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex gap-6">
        <Link to="/" className="text-gray-700 font-medium hover:text-blue-600">
          Home
        </Link>
        <Link to="/health-check" className="text-gray-700 font-medium hover:text-blue-600">
          Health Check
        </Link>

        {token ? (
          <Link to="/profile" className="text-gray-700 font-medium hover:text-blue-600">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 font-medium hover:text-blue-600">
              Log In
            </Link>
            <Link to="/register" className="text-gray-700 font-medium hover:text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
