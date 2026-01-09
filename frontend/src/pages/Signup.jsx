import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate(); // ✅ FIXED

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setStatus("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/signup",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setStatus("Signup successful!");

      navigate("/jokes"); // ✅ works now

    } catch (error) {
      setStatus(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-700 text-gray-300">
      <h1 className="text-4xl font-bold mb-6">Create Account</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-black focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Login here
          </Link>
        </p>
      </form>

      {status && (
        <p className="mt-4 text-lg text-green-800">{status}</p>
      )}
    </div>
  );
}

export default Signup;
