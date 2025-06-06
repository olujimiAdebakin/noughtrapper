
// import { NextResponse } from "next/server";

// // Export a named function for the GET method
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const clientName = searchParams.get("clientName");

//   console.log("API /clientDetails - Received clientName:", clientName);

//   if (!clientName) {
//     return NextResponse.json(
//       { error: "clientName is required" },
//       { status: 400 }
//     );
//   }

//   const baseUrl = process.env.API_GATEWAY_URL;

//   try {
//     // Fetch client list to find the matching clientId
//     const listResponse = await fetch(`${baseUrl}/v1/list-clients`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": process.env.API_KEY,
//       },
//     });

//     if (!listResponse.ok) {
//       throw new Error(`Failed to fetch client list: ${listResponse.status}`);
//     }

//     const listData = await listResponse.json();
//     const clients = listData.data || listData;
//     const client = clients.find((c) => c.clientName === clientName);

//     if (!client) {
//         console.error(`No client found with name: ${clientName}`);
//       throw new Error(`No client found with name: ${clientName}`);
//     }

//     const clientId = client.clientId;
//     console.log("Found clientId:", clientId);

//     // Fetch detailed data with clientId
//     const detailsResponse = await fetch(
//       `${baseUrl}/v1/get-client-details/${clientId}`,
//       {
//         method: "GET",
//         headers: {
//           // "Content-Type": "application/json",
//           // "Cache-Control": "no-cache",
//         },
//       }
//     );
    
// console.error("Details Response Status:", detailsResponse.status);
//     console.error("Details Response Body:", await detailsResponse.text());
    
//     if (!detailsResponse.ok) {
//       throw new Error(
//         `Failed to fetch client details: ${detailsResponse.status}`
//       );
//     }

//     const result = await detailsResponse.json();
//     if (result.statusCode !== 200) {
//       throw new Error(result.message || "Error fetching client");
//     }

//     console.log("API /clientDetails - Fetched data:", result.data);
//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error("Error fetching client details:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

// Export a named function for the GET method
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientName = searchParams.get("clientName");

  console.log("API /clientDetails - Received clientName:", clientName);

  if (!clientName) {
    return NextResponse.json(
      { error: "clientName is required" },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Fetch client list to find the matching clientId
    const listResponse = await fetch(`${baseUrl}/v1/list-clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.API_KEY,
      },
    });

    if (!listResponse.ok) {
      throw new Error(`Failed to fetch client list: ${listResponse.status}`);
    }

    const listData = await listResponse.json();
    const clients = listData.data || listData;
    const client = clients.find((c) => c.clientName === clientName);

    if (!client) {
      console.error(`No client found with name: ${clientName}`);
      throw new Error(`No client found with name: ${clientName}`);
    }

    const clientId = client.clientId;
    console.log("Found clientId:", clientId);

    // Fetch detailed data with clientId
    const detailsResponse = await fetch(
      `${baseUrl}/v1/get-client-details/${clientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.API_KEY,
        },
      }
    );

    console.log("Details Response Status:", detailsResponse.status);

    // Read the response body once
    const detailsResponseBody = await detailsResponse.text();
    console.log("Details Response Body:", detailsResponseBody);

    if (!detailsResponse.ok) {
      console.error("Details Response Status:", detailsResponse.status);
      console.error("Details Response Body:", detailsResponseBody);
      throw new Error(
        `Failed to fetch client details: ${detailsResponse.status}`
      );
    }

    // Parse the response body as JSON
    const result = JSON.parse(detailsResponseBody);

    // Check the status code in the response body
    if (result.statusCode !== 200) {
      console.error("Error in API response:", result.message);
      throw new Error(result.message || "Error fetching client");
    }

    console.log("API /clientDetails - Fetched data:", result.data);
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error fetching client details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
