// app/api/clients/route.js
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  // Extract the client ID from the URL path
  
    const { clientId } = params;
  
  if (!clientId) {
    return NextResponse.json(
      { message: 'Client ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get API URL from environment variables, with fallbacks
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const endpoint = `/v1/delete-client/${clientId}`;
    const apiUrl = `${baseUrl}${endpoint}`;

    console.log("Deleting client with URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.API_KEY || "",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || `Failed to delete client (Status: ${response.status})` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred while deleting the client" },
      { status: 500 }
    );
  }
}
