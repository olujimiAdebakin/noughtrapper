

// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const { email, old_password, new_password } = await request.json();

//     // Validate the input
//     if (!email || !old_password || !new_password) {
//       return NextResponse.json(
//         { message: "Email, old password, and new password are required" },
//         { status: 400 }
//       );
//     }

//     // External API endpoint
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const endpoint = `${baseUrl}/change-password`;

//     // Forward the request to the external API
//     const response = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         old_password,
//         new_password,
//       }),
//     });

//     // Handle the response from the external API
//     const result = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(
//         // { message: result.body?.message || "Failed to change password" },
//         { message: result?.message || result?.error || "Failed to change password" },

//         { status: response.status }
//       );
//     }

//     // Return success response
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     return NextResponse.json(
//       { message: "An error occurred while changing the password" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, old_password, new_password } = await request.json();

    if (!email || !old_password || !new_password) {
      return NextResponse.json(
        {
          message: "Email, old password, and new password are required",
          body: {
            error: true,
            success: false,
            message: "Email, old password, and new password are required",
            data: null,
          },
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_OPEN_API_URL;
    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }
    const endpoint = `${baseUrl}/change-password`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, old_password, new_password }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Return the error with the expected structure
      return NextResponse.json(
        {
          message: result.body?.message || "Failed to change password",
          body: {
            error: true,
            success: false,
            message: result.body?.message || "Failed to change password",
            data: null,
          },
        },
        { status: response.status }
      );
    }

    // Return the successful response preserving the structure
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      {
        message: "An error occurred while changing the password",
        body: {
          error: true,
          success: false,
          message: "An error occurred while changing the password",
          data: null,
        },
      },
      { status: 500 }
    );
  }
}
