"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login, logout } from "../../features/user/userSlice";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("userAuth");
    return !!user;
  });
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 1 || password.length > 8) {
      setError("Password must be 1 to 8 characters.");
      return;
    }
    localStorage.setItem("userAuth", JSON.stringify({ username, password }));
    dispatch(login(username));
    setIsAuthenticated(true);
    router.push("/");
  }

  function handleLogout() {
    localStorage.removeItem("userAuth");
    dispatch(logout());
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  }

  if (isAuthenticated) {
    const user = JSON.parse(localStorage.getItem("userAuth") || "{}");
    return (
      <div className="max-w-md mx-auto py-10 text-center">
        <h2 className="text-xl mb-4">You are logged in as <b>{user.username}</b></h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="max-w-md w-full py-12 px-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <input
          className="border rounded px-4 py-2 mb-4 w-full"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          className="border rounded px-4 py-2 mb-4 w-full"
          type="password"
          placeholder="Enter password (1-8 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

