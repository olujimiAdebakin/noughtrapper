"use client";

import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call our internal API route instead of the external endpoint directly
      const response = await axios.post("/api/auth", { email, password });

      console.log()

      if (response.data.body.success) {
        const { session, email: userEmail } = response.data.body.data;

        // Store the temporary session for OTP verification
        Cookies.set("tempSession", session, {
          expires: 1 , // Expires in 1 hour
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        Cookies.set("email", userEmail, {
          expires: 1 , // Expires in 1 hour
          path: "/",
        });

        // Redirect to OTP verification page

        router.push("/login/two_factor_auth");
        toast.success("Login successfull! redirecting to 2fa page");
      } else {
        setError(response.data.body.message || "Login failed");
      }
    } catch (err) {
      const status = err.response?.status;
      const apiMessage = err.response?.data?.body?.message;

      let userFriendlyMessage =
        "An unexpected error occurred. Please try again.";

      if (status === 400) {
        userFriendlyMessage =
          "Invalid email or password. Please check your credentials.";
      } else if (status === 403) {
        userFriendlyMessage =
          "Your account is not authorized. Please contact support.";
      } else if (status === 500) {
        userFriendlyMessage = "Server error. Please try again later.";
      } else if (apiMessage) {
        userFriendlyMessage = apiMessage;
      }

      toast.error(userFriendlyMessage);

      setError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    return name[0] + "***@" + domain;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
        <img src="/nought-logo.svg" alt="Noughtrapper Logo" className="h-10" />
        <h4 className="text-white font-semibold ms-2 text-xl">Noughttrapper</h4>
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {/* Background Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/nought-logo.svg"
            alt="Nought Logo"
            width={430}
            height={430}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
          />
        </div>

        {/* Login Card */}
        <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
          <h2 className="text-center text-2xl font-bold mb-6">Sign in</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-red-500">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
                  size={20}
                />
                <input
                  type="email"
                  className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 focus:outline-1 focus:outline-white focus:border-4 focus:border-red-600"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-red-400">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
                  size={20}
                />
                <input
                  className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 pr-10 focus:outline-1 focus:outline-white focus:border-4 focus:border-red-600"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
             
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox accent-red-500 mr-2"
                />{" "}
                Remember me
              </label>
              <button
                onClick={() => router.push("/login/forgot_password")}
                className="text-red-500"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md"
              isLoading={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-xs text-blue-400 mt-4">
            🔒 All information is safely secured
          </p>
        </Card>
      </div>
    </div>
  );
}
