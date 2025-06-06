'use client';

import React, { useState, useEffect } from "react";

export default function NewExamBottom({ campaignData, setCampaignData, onNext }) {
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
      <div className="flex gap-5 mb-5">
        <div>
          <label htmlFor="duration" className="font-semibold">Duration</label>
          <input
            type="text"
            id="duration"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Duration"
            value={campaignData.duration}
            onChange={(e) => setCampaignData({ ...campaignData, duration: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="totalPoints" className="font-semibold">Total Points</label>
          <input
            type="text"
            id="totalPoints"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Total Points"
            value={campaignData.totalPoints}
            onChange={(e) => setCampaignData({ ...campaignData, totalPoints: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div>
          <label htmlFor="averagePoints" className="font-semibold">Average Points.</label>
          <input
            type="text"
            id="averagePoints"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Average Points."
            value={campaignData.averagePoints}
            onChange={(e) => setCampaignData({ ...campaignData, averagePoints: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="passPoints" className="font-semibold">Pass Points.</label>
          <input
            type="text"
            id="passPoints"
            className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pass Points."
            value={campaignData.passPoints}
            onChange={(e) => setCampaignData({ ...campaignData, passPoints: e.target.value })}
          />
        </div>
      </div>

      {/* Run only once per employee toggle
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
      </div> */}

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

