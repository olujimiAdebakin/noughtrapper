"use client";

import React from "react";

export default function PreviewCampaign({ campaignData, onBack, onLaunch }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <div className="relative">
        <h2 className="text-center text-xl font-semibold mb-2">Preview Campaign</h2>
        <button
            className="absolute top-0 right-0 text-red-600"
            onClick={onBack}
          >
            x
          </button>
      </div>

        <p className="text-center text-gray-500 mb-6">
          Ensure Accuracy and Effectiveness Before Launching Your Campaign
        </p>

      {/* Campaign Message */}
      <div className="p-3 rounded-md mt-4">
        <div dangerouslySetInnerHTML={{ __html: campaignData.message }} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-20 mt-6 pt-5">
        <button
          className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg w-1/3"
        
        >
          Save Draft
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-lg w-2/3"
          onClick={onLaunch}
        >
          Launch Campaign
        </button>
      </div>
    </div>
  );
}
