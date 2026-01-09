import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setStatus("Please fill all the fields.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setStatus("Login successful!");

      setTimeout(() => navigate("/jokes"), 600);
    } catch (error) {
      setStatus(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-700 text-gray-300">
      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
      >
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-black focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-black focus:outline-none"
          />
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      {status && (
        <p className="mt-4 text-lg text-green-800">{status}</p>
      )}
    </div>
  );
}

export default Login;
