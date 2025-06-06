// 'use client';

// import React, { useState, useEffect } from 'react';

// export default function ClientDetails({ clientName, children }) {
// 	const [clientData, setClientData] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

	

// 	useEffect(() => {
// 		if (!clientName) return;

// 		async function fetchClientDetails() {
// 			setLoading(true);
// 			try {
// 				const decodedClientName = decodeURIComponent(
// 					clientName.replace(/-/g, ' ')
// 				);
// 				const response = await fetch(
// 					`/api/clientDetails?clientName=${encodeURIComponent(
// 						decodedClientName
// 					)}`,
// 					{
// 						method: 'GET',
// 						headers: { 'Content-Type': 'application/json' },
// 					}
// 				);

// 				if (!response.ok) {
// 					throw new Error(
// 						`Failed to fetch client details: ${response.status}`
// 					);
// 				}

// 				const data = await response.json();
// 				if (data.error) {
// 					throw new Error(data.error);
// 				}

// 				setClientData(data);
// 			} catch (err) {
// 				setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		}

// 		fetchClientDetails();
// 	}, [clientName]);

// 	if (loading) return <div>Loading...</div>;
// 	if (error) return <div>Error: {error}</div>;
// 	if (!clientData)
// 		return <div>No client data available for {clientName}</div>;

// 	// Pass clientData to children
// 	return children(clientData);
// }


"use client";

import React, { useState, useEffect } from "react";

export default function ClientDetails({ clientName, children }) {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientName) {
      console.log("ClientDetails - No clientName provided");
      setLoading(false); // Exit loading state if no clientName
      return;
    }

    async function fetchClientDetails() {
      console.log("ClientDetails - Starting fetch for:", clientName);
      setLoading(true);
      try {
        const decodedClientName = decodeURIComponent(
          clientName.replace(/-/g, " ")
        );
        console.log("ClientDetails - Decoded clientName:", decodedClientName);
        const response = await fetch(
          `/api/clientDetails?clientName=${encodeURIComponent(
            decodedClientName
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.API_KEY, 
            },
          }
        );
        console.log("ClientDetails - Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch client details: ${response.status}`);
        }

        const data = await response.json();
        console.log("ClientDetails - Fetched data:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setClientData(data);
      } catch (err) {
        console.error("ClientDetails - Fetch error:", err.message);
        setError(err.message);
      } finally {
        console.log("ClientDetails - Fetch complete");
        setLoading(false);
      }
    }

    fetchClientDetails();
  }, [clientName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clientData) return <div>No client data available for {clientName}</div>;

  return children(clientData);
}