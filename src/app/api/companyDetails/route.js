// app/api/companyDetails/route.js
export async function POST(request) {
  const payload = await request.json();
  console.log("Received payload on server:", payload);
  
  try {
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
    console.log("API Gateway response:", data);
    
    return Response.json(data);
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}


// pages/api/updateClientDetails.js
// export default async function handler(req, res) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const {
//     clientId,
//     companyName,
//     companyEmail,
//     totalEmployees,
//     spokesperson,
//     spokespersonPhone,
//     address,
//     country,
//     state,
//     city,
//     logo,
//   } = req.body;

//   if (!clientId) {
//     return res.status(400).json({ error: "clientId is required" });
//   }

//   const baseUrl = "https://enm2jqkwz5.execute-api.us-east-1.amazonaws.com/dev";

//   try {
//     const response = await fetch(`${baseUrl}/v1/update-client-details/${clientId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
//       body: JSON.stringify({
//         companyName,
//         companyEmail,
//         totalEmployees,
//         spokesperson,
//         spokespersonPhone,
//         address,
//         country,
//         state,
//         city,
//         logo,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to update client details: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Updated client details:", result);
//     return res.status(200).json({ message: "Client details updated successfully", data: result });
//   } catch (error) {
//     console.error("Error updating client details:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }
