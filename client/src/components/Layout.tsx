import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex gap-6">
        <Link to="/" className="text-gray-700 font-medium hover:text-blue-600">
          Home
        </Link>
        <Link
          to="/health-check"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Health Check
        </Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
