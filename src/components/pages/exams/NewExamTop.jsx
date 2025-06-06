import React from "react";

function NewExamTop({ campaignData, setCampaignData }) {

  // ✅ Prevent errors if campaignData is undefined
  if (!campaignData) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-5 text-center">
        <h4 className="mb-2 font-semibold">Create New Exam</h4>
        <p>Fill out these details to create your cybersecurity exam</p>
      </div>

      {/* Campaign Subject Input */}
      <div>
        <label htmlFor="emailSubject" className="font-semibold">
          Exam Title
        </label>
        <input
          type="text"
          id="examTitle"
          className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Exam Title"
          value={campaignData?.subject || ""}  // ✅ Safe access
          onChange={(e) =>
            setCampaignData((prev) => ({ ...prev, subject: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

export default NewExamTop;
