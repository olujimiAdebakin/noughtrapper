"use client";

import { useState } from "react";
import Navigation from "../../../../components/pages/settings/Navigation";

const Security = () => {
  
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Password:", password);
    // Add API call here to update password
  };

  return (
    <div className="min-h-screen p-6 bg-default-50 shadow-md rounded-lg">
      <div>
        <h2 className="text-xl font-semibold">Account Information</h2>
        <p className="text-gray-500 text-sm mb-6">Update your account information</p>
      </div>

      {/* Navigation Tabs */}
      <Navigation />

      {/* Personal Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
        <div className="border-b-2 pb-4 border-dashed">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-gray-500">Setting your company account to change the data.</p>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password || 'Tosin'}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-default-50 mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Update Button */}
        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default Security;
