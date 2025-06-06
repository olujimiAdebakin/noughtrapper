// import { Card, CardBody } from "@nextui-org/react";
// import { useState, useEffect } from "react";
// import React from "react";

// export default function CampaignStats() {
//   const [selectedTab, setSelectedTab] = useState("today");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//       const endpoint = `${baseUrl}/get-recent-campaigns`;
//       const token = localStorage.getItem("token"); // Retrieve the token
  
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`${endpoint}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const result = await response.json();
        
//         if (response.ok) {
//           setData({
//             totalCampaignTypes: result.totalCampaignTypes,
//             totalCampaignsCreated: result.totalCampaignsCreated,
//             totalActiveCampaigns: result.totalActiveCampaigns,
//           });
//         } else {
//           throw new Error(result.message || "Failed to fetch data");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedTab]);

//   const list = data
//     ? [
//         { title: "Total Campaign Type", number: data.totalCampaignTypes },
//         { title: "Total Campaign Created", number: data.totalCampaignsCreated },
//         { title: "Total Active Campaign", number: data.totalActiveCampaigns },
//       ]
//     : [];

//   return (
//     <div>
//       <h5 className="font-semibold text-2xl mb-5">Top Statistics</h5>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       <div className="grid grid-cols-3 gap-3">
//         {list.map((item, index) => (
//           <Card
//             key={index}
//             isPressable
//             shadow="sm"
//             className="bg-white p-[10px] rounded-lg flex flex-col justify-between"
//           >
//             <CardBody className="overflow-visible p-0">
//               <div className="flex flex-col gap-3">
//                 <span className="text-sm text-[#1C1C1C] font-semibold">
//                   {item.title}
//                 </span>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-semibold text-blue-500">
//                     {item.number}
//                   </span>
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }













import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import React from 'react'

export default function ExamStats() {

    const [selectedTab, setSelectedTab] = useState("today");

    const dataByTab = {
        today: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
        last24hrs: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
        last7days: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
        last30days: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
        last12months: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
        alltime: [
          {
            title: "Total Exam Created",
            number: 0,
          },
          {
            title: "Total Exams Taken",
            number: 0,
          },
          {
            title: "Total Average Score",
            number: 0,
          },
          {
            title: "Pass Rate",
            number: 0,
          },
        ],
      };
    
      const list = dataByTab[selectedTab] || [];
    
  return (
    <div>
      <h5 className="font-semibold text-2xl mb-5">Top Statistics</h5>
      <div className="grid grid-cols-4 gap-3">
        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            shadow="sm"
            className="bg-white p-[10px] rounded-lg flex flex-col justify-between"
          >
            <CardBody className="overflow-visible p-0">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-[#1C1C1C] font-semibold">
                  {item.title}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-blue-500">
                    {item.number}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
