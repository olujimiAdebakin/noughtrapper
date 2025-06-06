"use client";

import { Card, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function TwoFactorAuth() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [session, setSession] = useState("");
  const [countdown, setCountdown] = useState(120);

  const router = useRouter();

  useEffect(() => {
    // Retrieve the email and temporary session from cookies
    const userEmail = Cookies.get("email");
    const tempSession = Cookies.get("tempSession");

    if (!userEmail || !tempSession) {
      // If either is missing, redirect back to login
      router.push("/login");
      return;
    }

    setEmail(userEmail);
    setSession(tempSession);

    // Setup countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          // Redirect to login when timer expires
          router.push("/login");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/otp", {
        email,
        code: otp,
        session,
      });

      if (response.data.body && response.data.body.success) {
        // Extracting tokens from response
        const responseData = response.data;
        let access_token, refresh_token;

        // Check different possible paths where tokens might be located
        if (responseData.body?.data?.access_token) {
          access_token = responseData.body.data.access_token;
          refresh_token = responseData.body.data.refresh_token;
        } else if (responseData.data?.access_token) {
          access_token = responseData.data.access_token;
          refresh_token = responseData.data.refresh_token;
        } else if (responseData.body?.data?.id_token) {
          // If using id_token instead of access_token (from API docs)
          access_token = responseData.body.data.id_token;
          refresh_token = responseData.body.data.refresh_token;
        }

        if (!access_token || !refresh_token) {
          throw new Error("Auth tokens not found in the response");
        }

        // Set cookies first before navigation
        Cookies.set("authToken", access_token, {
          // expires: new Date(new Date().getTime() + 15 * 60 * 1000), // 15 minutes
          expires: 1,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        Cookies.set("refreshToken", refresh_token, {
          expires: 1, // 1 day
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        // Clear temporary session
        Cookies.remove("tempSession");

        toast.success("Verification successful!");

        // Add immediate visual feedback
        document.body.style.cursor = "wait";

        setTimeout(() => {
          // Double checking the cookie is set before redirecting
          if (Cookies.get("authToken")) {
            toast.success("Welcome back! Redirecting to dashboard...");
            router.push("/admin-dashboard");
          } else {
            toast.error("Authentication failed. Please try again.");
            setError("Token not saved properly. Please try again.");
          }
        }, 1000);
      } else {
        setError(response.data.body?.message || "Verification failed");
        toast.error(response.data.body?.message || "Verification failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.body?.message ||
        err.message ||
        "An error occurred during verification";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");

    try {
      const response = await axios.post("/api/otp", {
        email,
        code: otp,
        session,
        token: accessToken,
      });
      if (response.data.body.success) {
        // Reset countdown to 2 minutes
        setCountdown(120);
        // Update the session if a new one is provided
        if (response.data.body.data?.session) {
          setSession(response.data.body.data.session);
          Cookies.set("tempSession", response.data.body.data.session, {
            expires: 1, // expires in exactly 1 day
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });
        }
        toast.success("Verification code sent successfully!");
      } else {
        setError(response.data.body.message || "Failed to resend OTP");
        toast.error(response.data.body.message || "Failed to resend OTP");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.body?.message ||
        "An error occurred when resending OTP";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
        <img src="/nought-logo.svg" alt="Noughttrapper Logo" className="h-10" />
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

        {/* OTP Verification Card */}
        <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
          <h2 className="text-center text-2xl font-bold mb-6">
            Two-Factor Authentication
          </h2>
          <p className="text-center text-sm mb-6">
            A verification code has been sent to {email}. Please enter the code
            below to continue.
          </p>

          <div className="text-center mb-4">
            <span className="text-red-500">
              Code expires in: {formatTime(countdown)}
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleVerify}>
            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-red-500">
                Verification Code
              </label>
              <input
                type="text"
                className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 text-center text-xl tracking-wider focus:outline-1 focus:outline-white focus:border-4 focus:border-red-600"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/[^0-9]/g, "").substring(0, 6))
                }
                maxLength={6}
                autoFocus
                required
              />
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md mb-4 hover:bg-red-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>

          {/* Resend OTP */}
          <div className="text-center">
            <button
              onClick={handleResendOTP}
              className={`w-full text-red-500 font-semibold py-2 rounded-lg shadow-md ${
                countdown < 90
                  ? "hover:bg-red-200"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={countdown > 90}
            >
              Resend verification code
            </button>
          </div>

          <p className="text-center text-xs text-blue-400 mt-4">
            🔒 All information is safely secured
          </p>
        </Card>
      </div>
    </div>
  );
}
