import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (isLoading) return <p className="text-gray-500">Loading profile...</p>;
  if (isError || !user) return <p className="text-red-600">Could not load profile.</p>;

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-1">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-200 text-gray-800 rounded px-4 py-2 font-medium hover:bg-gray-300"
      >
        Log Out
      </button>
    </div>
  );
}
