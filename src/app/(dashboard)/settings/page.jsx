"use client";

import { useState } from "react";
import Navigation from "../../../components/pages/settings/Navigation";

const Profile = () => {

  const [formData, setFormData] = useState({
    firstName: "Tosin",
    lastName: "Fakile",
    email: "fakiletosin@noughtaegis.secure",
    mobileNumber: "10,000",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // Add API call here to update user details
  };

  return (
    <div className="mx-auto p-6 bg-default-50 shadow min-h-screen">
      <h2 className="text-xl font-semibold">Account Information</h2>
      <p className="text-gray-500 text-sm mb-6">Update your account information</p>

      {/* Navigation Tabs */}
      <Navigation />

      {/* Personal Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white px-10 py-6 rounded-lg">
        <div className="border-b-2 border-dashed pb-4">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-gray-500">Setting your company account to change the data.</p>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email & Mobile Number Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="bg-gray-50 mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Update Button */}
        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
