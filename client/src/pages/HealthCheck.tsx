import { useEffect, useState } from "react";

type HealthResponse = {
  success: boolean;
  data: { status: string; timestamp: string };
};

export function HealthCheck() {
  const [result, setResult] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch(() => setError("Could not reach the backend"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Backend Health Check</h1>

      {loading && <p className="mt-4 text-gray-500">Checking...</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-green-800 font-medium">Status: {result.data.status}</p>
          <p className="text-green-700 text-sm mt-1">
            Server time: {result.data.timestamp}
          </p>
        </div>
      )}
    </div>
  );
}
