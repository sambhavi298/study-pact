import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch, ApiError } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: (data: LoginForm) =>
      apiFetch<{ token: string }>("/auth/login", { method: "POST", body: data }),
    onSuccess: (data) => {
      login(data.token);
      // Clear any stale cached user data from a previous session before navigating.
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/profile");
    },
  });

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Log In</h1>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email")} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" {...register("password")} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {mutation.isError && (
          <p className="text-red-600 text-sm">
            {mutation.error instanceof ApiError ? mutation.error.message : "Something went wrong"}
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600">Sign up</Link>
      </p>
    </div>
  );
}
