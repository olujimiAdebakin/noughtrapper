

// app/api/account-settings/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the incoming JSON payload
    const payload = await request.json();

    // Log the incoming payload to the terminal
    console.log("Received payload on server:", payload);

    // Send the payload to the API Gateway endpoint\
     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/add-cliemt`;
    const response = await fetch(
       apiUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Log the successful response to the terminal
    console.log("API Gateway response:", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Log any errors to the terminal
    console.error("API error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: `Failed to save account settings: ${error.message}` },
      { status: 500 }
    );
  }
}
