"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login, logout } from "../../features/user/userSlice";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username) {
      dispatch(login(username));
      router.push("/");
    }
  }

  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-10 text-center">
        <h2 className="text-xl mb-4">You are logged in as <b>{username}</b></h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto py-12 px-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Sign in</h1>
      <input
        className="border rounded px-4 py-2 mb-4 w-full"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
}

