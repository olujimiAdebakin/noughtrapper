'use client';

import React, { useState, useEffect } from "react";

export default function NewCampaignBottom({ campaignData, setCampaignData, errors, onNext }) {
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mockCampaignTypes = [
      { id: "1", name: "Company A" },
      { id: "2", name: "Company B" },
      { id: "3", name: "Company C" },
    ];
    setTimeout(() => {
      setCampaignTypes(mockCampaignTypes);
    }, 500);
  }, []);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div>
      <div className="flex gap-5">
        <div>
          <label htmlFor="fromName" className="font-semibold">"From" Name</label>
          <input
            type="text"
            id="fromName"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the name"
            value={campaignData.fromName}
            onChange={(e) => setCampaignData({ ...campaignData, fromName: e.target.value })}
          />
          {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

        </div>
        <div>
          <label htmlFor="fromEmail" className="font-semibold">"From" Email</label>
          <input
            type="email"
            id="fromEmail"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
            value={campaignData.fromEmail}
            onChange={(e) => setCampaignData({ ...campaignData, fromEmail: e.target.value })}
          />
          {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

        </div>
      </div>

      {/* Sent To Dropdown */}
      <div className='bg-white mt-5 rounded-xl'>
        <h4 className='font-semibold'>Sent To</h4>
        <div>
          <select
            id="campaignType"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={campaignData.sendTo}
            onChange={(e) => setCampaignData({ ...campaignData, sendTo: e.target.value })}
          >
            <option value="" disabled>Select Company</option>
            {campaignTypes.map((campaign) => (
              <option key={campaign.id} value={campaign.name}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Run only once per employee toggle */}
      <div className="flex justify-between items-center space-x-3 my-5 border-y py-5">
        <span className="font-semibold">Run only once per employee</span>
        <button
          onClick={toggleSwitch}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isEnabled ? "bg-red-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Buttons */}
      <div className='flex gap-5 mt-6'>
        <button className="border-2 border-red-700 text-red-700 px-4 py-2 rounded-lg w-1/3">
          Save Draft
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-lg w-2/3"
          onClick={() => onNext(campaignData)}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}






















// 'use client'

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function NewCampaignBottom() {
//     const router = useRouter();

//     const [isEnabled, setIsEnabled] = useState(false);

//   const toggleSwitch = () => {
//     setIsEnabled(!isEnabled);
//     // Optionally send API request or store the state
//     console.log("Toggle state:", !isEnabled);
//   };

//     const [campaignTypes, setCampaignTypes] = useState([]);
//       const [selectedCampaign, setSelectedCampaign] = useState("");

//     useEffect(() => {
//         // Temporary mock data
//         const mockCampaignTypes = [
//           { id: "1", name: "Promotional" },
//           { id: "2", name: "Newsletter" },
//           { id: "3", name: "Transactional" },
//         ];
    
//         // Simulating an API call with setTimeout
//         setTimeout(() => {
//           setCampaignTypes(mockCampaignTypes);
//         }, 500);
//       }, []);

//   return (
//     <div>
//         <div className="flex gap-5">
//             <div>
//               <label htmlFor="emailSubject" className="font-semibold">
//                 "From" Name
//               </label>
//               <input
//                 type="text"
//                 id="emailSubject"
//                 className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter the name"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="emailSubject" className="font-semibold">
//                     "From" Email
//                 </label>
//                 <input
//                 type="text"
//                 id="emailSubject"
//                 className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter email address"
//                 />
//             </div>
//         </div>
//         <div className='bg-white mt-5 rounded-xl'>
//               <h4 className='font-semibold'>Sent To</h4>    
//               <div>
//                 <select
//                 id="campaignType"
//                 className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={selectedCampaign}
//                 onChange={(e) => setSelectedCampaign(e.target.value)}
//                 >
//                   <option value="" disabled>
//                   Select Company
//                   </option>
//                   {campaignTypes.map((campaign) => (
//                   <option key={campaign.id} value={campaign.id}>
//                     {campaign.name}
//                   </option>
//                   ))}
//                 </select>
//               </div>
//         </div>
//         <div className="flex justify-between items-center space-x-3 my-5 border-y py-5">
//             <span className="font-semibold">Run only once per employee</span>
//             <button
//                 onClick={toggleSwitch}
//                 className={`relative w-12 h-6 rounded-full transition-colors ${
//                 isEnabled ? "bg-red-700" : "bg-gray-300"
//                 }`}
//             >
//             <span
//             className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
//                 isEnabled ? "translate-x-6" : "translate-x-0"
//             }`}
//             />
//             </button>
//         </div>
//         <div className='flex gap-5 mt-6'>
//         <button 
//           className="border-2 border-red-700 text-red-700 px-4 py-2 rounded-lg w-1/3"
//           > 
//           Save Draft 
//         </button>
//         <button 
//            className="bg-red-700 text-white px-4 py-2 rounded-lg w-2/3"
//            >
//            Next Step
//         </button>
//       </div>
//     </div>
//   )
// }
