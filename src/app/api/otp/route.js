

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, code, session, token } = body;

    if (!email) {
      return NextResponse.json(
        {
          body: {
            success: false,
            message: "Email is required",
          },
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_OPEN_API_URL;

    // Determine if this is a verification request or a resend request
    const isVerification = code && session;
    const endpoint = isVerification
      ? `${baseUrl}/verify-account`
      : `${baseUrl}/verify-otp`;

    // Prepare the request body based on the operation
    const requestBody = isVerification
      ? JSON.stringify({ email, code, session })
      : JSON.stringify({ email });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.API_KEY,
        ...(token ? { Authorization: ` ${token}` } : {}),
      },
      body: requestBody,
    });

    const responseData = await response.json();
    console.log("API Response:", responseData);

    // const token =
    //   responseData.body?.data?.token ||
    //   responseData.data?.token ||
    //   responseData.token;

    // if (token) {
    //   console.log("✅ Token created:", token);
    // }

    if (!response.ok) {
      console.error("API Error:", responseData);
      return NextResponse.json(
        {
          body: {
            success: false,
            message:
              responseData.message ||
              (isVerification ? "Verification failed" : "Failed to send OTP"),
          },
        },
        { status: response.status }
      );
    }

    // Format response to match what the frontend expects
    return NextResponse.json(
      {
        body: {
          success: true,
          message: isVerification
            ? "Verification successful"
            : "OTP sent successfully",
          data: responseData.body?.data || responseData.data || {},
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP API Error:", error);
    return NextResponse.json(
      {
        body: {
          success: false,
          message: "An internal server error occurred",
        },
      },
      { status: 500 }
    );
  }
}
