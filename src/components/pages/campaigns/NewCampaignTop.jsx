"use client";

import React, { useState, useEffect } from "react";

function NewCampaignTop({ campaignData, setCampaignData, errors }) {
  const [campaignType, setCampaignType] = useState([]);  

  useEffect(() => {
    // Mock API data
    const mockCampaignTypes = [
      { id: "1", name: "Promotional" },
      { id: "2", name: "Newsletter" },
      { id: "3", name: "Transactional" },
    ];

      setCampaignType(mockCampaignTypes);
 
    }, []);

  // ✅ Prevent errors if campaignData is undefined
  if (!campaignData) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-5 text-center">
        <h4 className="mb-2 font-semibold">Create New Email Campaign</h4>
        <p>Fill out these details to build your broadcast</p>
      </div>

      {/* Campaign Type Dropdown */}
      <div className="mb-5">
        <label htmlFor="campaignType" className="font-semibold">
          Campaign Type
        </label>
        <select
          id="campaignType"
          className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={campaignData?.campaignType}
          onChange={(e) =>
            setCampaignData((prev) => ({ ...prev, campaignType: e.target.value }))
          }
        >
          <option value="" disabled>Select Campaign</option>
          {campaignType.map((campaign) => (
            <option key={campaign.id} value={campaign.name}>
              {campaign.name}
            </option>
          ))}
        </select>
        {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

      </div>

      {/* Campaign Subject Input */}
      <div>
        <label htmlFor="emailSubject" className="font-semibold">
          Campaign Subject
        </label>
        <input
          type="text"
          id="emailSubject"
          className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Campaign Subject"
          value={campaignData?.subject}  // ✅ Safe access
          onChange={(e) =>
            setCampaignData((prev) => ({ ...prev, subject: e.target.value }))
          }
        />
        {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

      </div>

      {/* Client ID Input */}
      <div className="mt-5">
        <label htmlFor="clientId" className="font-semibold">
          Client ID
        </label>
        <input
          type="text"
          id="clientId"
          className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Client Id"
          value={campaignData?.clientId}  // ✅ Safe access
          onChange={(e) =>
            setCampaignData((prev) => ({ ...prev, clientId: e.target.value }))
          }
        />
        {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

      </div>

    </div>
  );
}

export default NewCampaignTop;
