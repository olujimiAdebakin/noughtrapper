// app/api/staff/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized: No auth token found" },
        { status: 401 }
      );
      }
      
      console.log(
        "POST URL:",
        `${process.env.NEXT_PUBLIC_OPEN_API_URL}/invite-staff`
      );

      console.log("authToken:", authToken);
 

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OPEN_API_URL}/invite-staff`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    //   const data = await response.json();
      const data = await response.json();
      console.log("POST /api/invite-staff response:", {
        status: response.status,
        data,
      });

    if (!response.ok) {
      return NextResponse.json(
        { error: data.body?.message || "Failed to send invitation" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
      console.error("Error in invite-staff:", error);
      console.error("Error in POST /api/invite-staff:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const authToken = cookieStore.get("authToken")?.value;

//     if (!authToken) {
//       return NextResponse.json(
//         { error: "Unauthorized: No auth token found" },
//         { status: 401 }
//       );
//     }

//          console.log(
//            "GET URL:",
//            `${process.env.API_GATEWAY_URL}v1/list-admin-staff`
//          );

//       console.log("authToken:", authToken);

//     const response = await fetch(
//       `${process.env.API_GATEWAY_URL}v1/list-admin-staff`,
//     //   "https://sms41xl3c6.execute-api.us-east-1.amazonaws.com/dev/v1/list-admin-staff",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `${authToken}`,
//         },
//       }
//     );

//     //   const data = await response.json();
//       const data = await response.json();
//       console.log("GET /api/invite-staff response:", {
//         status: response.status,
//         data,
//       });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: data.body?.message || "Failed to fetch staff list" },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error in list-staff:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      console.error("GET /api/invite-staff: No auth token found");
      return NextResponse.json(
        { error: "Unauthorized: No auth token found" },
        { status: 401 }
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/list-admin-staff`;
    console.log("GET /api/invite-staff: Sending request", {
      apiUrl,
      authToken: authToken.substring(0, 10) + "...",
    });

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${authToken}`,
      },
    });

    const data = await response.json();
    console.log("GET /api/invite-staff response:", {
      status: response.status,
      data: JSON.stringify(data, null, 2),
    });

    if (!response.ok || data.statusCode >= 400) {
      const errorMessage =
        data.body?.message || data.message || "Failed to fetch staff list";
      console.error("GET /api/invite-staff failed:", {
        httpStatus: response.status,
        innerStatus: data.statusCode,
        message: errorMessage,
      });
      return NextResponse.json(
        { error: errorMessage },
        { status: data.statusCode || response.status }
      );
    }

    // Return the nested body for successful responses
    return NextResponse.json(data.body || data);
  } catch (error) {
    console.error("Error in GET /api/invite-staff:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}