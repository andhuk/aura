"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authState, signIn } = useAuth();
  const { isLoading, error } = authState;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);

    // Navigate after a brief delay to allow auth state to update
    setTimeout(() => {
      if (!error) {
        router.push("/");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
