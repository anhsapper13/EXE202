"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getProfile, login } from "@/store/slices/userSlice";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error, isLoading, currentUser } = useAppSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      dispatch(getProfile());
    }
  }, [isAuthenticated, currentUser, dispatch]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role?.toUpperCase() === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (currentUser.role?.toUpperCase() === "CUSTOMER") {
        router.push("/");
      } else if (currentUser.role?.toUpperCase() === "SERVICE_PROVIDER") {
        router.push("/service-provider/dashboard");
      }
      else {
        router.push("/unauthorized");
      }
    }
  }, [currentUser, router]);
  console.log("Current User:", currentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url('https://wallpaperfx.com/view_image/beautiful-australian-shepherd-1920x1080-wallpaper-14732.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="login-page flex flex-col space-y-4 border p-8 rounded shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        {error && (
          <div className="text-red-500 text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-username border p-2 w-80 h-12 border-gray-300 rounded text-black placeholder-gray-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-username p-2 border w-80 h-12 border-gray-300 rounded text-black placeholder-gray-500"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-white p-2 rounded button-login text-black hover:bg-gray-100 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link
              className="text-white underline hover:text-gray-300"
              href="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
