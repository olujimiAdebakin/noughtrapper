// import { NextResponse } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false, // Required for multipart/form-data
//   },
// };

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const fields = {};
//     const files = {};

//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//         files[key] = value;
//       } else {
//         fields[key] = value;
//       }
//     }

//     console.log("Received form data on server:", fields);
//     console.log("Received files on server:", Object.keys(files));

//     if (!fields.companyId) {
//       return NextResponse.json(
//         { message: "Company ID is missing" },
//         { status: 400 }
//       );
//     }

//     const fileToBase64 = async (file) => {
//       const arrayBuffer = await file.arrayBuffer();
//       return Buffer.from(arrayBuffer).toString("base64");
//     };
//     const companyDocuments = {};
//     const processFile = async (file, key) => {
//       if (!file) return;
//       const base64File = await fileToBase64(file);
//       companyDocuments[key] = {
//         base64File,
//         fileName: file.name,
//       };
//     };

//     await Promise.all([
//       processFile(files.certIncorporation, "certificateOfIncorporation"),
//       processFile(files.businessLicense, "businessLicense"),
//       processFile(files.mou, "memorandumOfUnderstanding"),
//       processFile(files.nda, "nonDisclosureAgreement"),
//       processFile(files.sla, "serviceLevelAgreement"),
//       processFile(files.govId, "governmentIssuedID"),
//     ]);

//     const payload = {
//       step: "documents",
//       companyId: fields.companyId,
//       companyDocuments,
//     };

//     console.log("Submitting payload to API Gateway:", payload);

//     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/add-cliemt`;
    
//     const response = await fetch(
//       apiUrl,
     
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("API Gateway response:", data);

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Server error:", {
//       message: error.message,
//       stack: error.stack,
//     });
//     return NextResponse.json(
//       { message: `Failed to upload documents: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Debug logging
    console.log("Raw form data entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const companyId = formData.get("companyId");
    if (!companyId) {
      return NextResponse.json(
        { message: "Company ID is missing" },
        { status: 400 }
      );
    }

    // Map form fields to API expected field names
    const fieldMappings = {
      certIncorporation: "certificateOfIncorporation",
      businessLicense: "businessLicense",
      mou: "memorandumOfUnderstanding",
      nda: "nonDisclosureAgreement",
      sla: "serviceLevelAgreement",
      govId: "governmentIssuedID",
    };

    // Build the companyDocuments object
    const companyDocuments = {};

    // Process each document URL
    Object.keys(fieldMappings).forEach((formKey) => {
      const url = formData.get(formKey);
      if (url) {
        const apiKey = fieldMappings[formKey];
        companyDocuments[apiKey] = {
          url: url,
          fileName: `${apiKey}.pdf`, // Default filename since we don't have the original name
        };
      }
    });

    // Only proceed if we have at least one document
    if (Object.keys(companyDocuments).length === 0) {
      console.warn("Warning: No document URLs found in form data");
    }

    const payload = {
      step: "documents",
      companyId: companyId,
      companyDocuments: companyDocuments,
    };

    console.log(
      "Submitting payload to API Gateway:",
      JSON.stringify(payload, null, 2)
    );

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/add-cliemt`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Gateway error (${response.status}):`, errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Gateway response:", data);

    // Return the response with the companyId for the frontend to handle
    return NextResponse.json(
      {
        companyId: companyId,
        ...data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: `Failed to upload documents: ${error.message}` },
      { status: 500 }
    );
  }
}