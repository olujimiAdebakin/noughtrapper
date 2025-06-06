
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for multipart/form-data
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const companyId = formData.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        { message: "Company ID is missing" },
        { status: 400 }
      );
    }

    const csvFiles = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("csvFile") && value instanceof File) {
        csvFiles.push(value);
      }
    }

    if (csvFiles.length === 0) {
      return NextResponse.json(
        { message: "No CSV files uploaded" },
        { status: 400 }
      );
    }

    // Combine all CSV files into a single string
    const combinedCsvContent = await Promise.all(
      csvFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return Buffer.from(arrayBuffer).toString("utf8");
      })
    ).then((contents) => contents.join("\n")); // Join with newline

    // Encode combined CSV content as Base64
    const base64Encoded = Buffer.from(combinedCsvContent).toString("base64");

    console.log("Received form data on server:", {
      companyId,
      csvFiles: csvFiles.map((f) => f.name),
    });
    console.log("Base64 encoded CSV snippet:", base64Encoded.slice(0, 50) + "...");

    const payload = {
      step: "staff",
      companyId,
      isBase64Encoded: true,
      body: base64Encoded,
    };

    
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/add-cliemt`;
    console.log("Submitting payload to API Gateway:", payload);

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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server error:", { message: error.message, stack: error.stack });
    return NextResponse.json(
      { message: `Failed to upload staff CSV: ${error.message}` },
      { status: 500 }
    );
  }
}
