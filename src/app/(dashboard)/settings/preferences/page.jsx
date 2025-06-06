"use client";

import { useState, useEffect } from "react";
import Navigation from "../../../../components/pages/settings/Navigation";

const Preferences = () => {

  const toggleItems = [
    { id: 'threeMonthsPlan', label: 'Three Months Plan', description: 'Sent automatically to the client after they register' },
    { id: 'sixMonthsPlan', label: 'Six Months Plan', description: 'Sent to the client after their registration has been completed (if you select this option).' },
    { id: 'oneYearPlan', label: 'One Year Plan', description: 'Sent automatically to the client if their registration is cancelled (if you select this option).' },
    { id: 'registrationConfirmation', label: 'Registration Confirmation', description: 'Sent automatically to the client after they register' },
    { id: 'registrationCompleted', label: 'Registration Completed', description: 'Sent to the client after their registration has been completed (if you select this option).' },
    { id: 'registrationCancelled', label: 'Registration Cancelled', description: 'Sent automatically to the client if their registration is cancelled (if you select this option).' },
    { id: 'smsReminders', label: 'Service expiration reminders via SMS', description: 'By enabling, you consent to phone number use for sending reminders as per our Privacy Policy.' },
    { id: 'emailReminders', label: 'Service expiration reminders via Email', description: 'By enabling, you consent to email use for sending reminders as per our Privacy Policy.' },
    { id: 'whatsappReminders', label: 'Service expiration reminders via WhatsApp', description: 'By enabling, you consent to phone number use for sending reminders as per our Privacy Policy.' },
    { id: 'productUpdates', label: 'Updates about our products and special offers via email', description: 'Receive discounts and be the first to know about our latest offers.' },
  ];

  const [toggles, setToggles] = useState({});

  useEffect(() => {
    const storedToggles = JSON.parse(localStorage.getItem("preferences")) || {};
    setToggles(storedToggles);
  }, []);

  const handleToggle = (id) => {
    const updatedToggles = { ...toggles, [id]: !toggles[id] };
    setToggles(updatedToggles);
    localStorage.setItem("preferences", JSON.stringify(updatedToggles));
  };

  return (
    <div className="p-6 bg-default-50 shadow-md rounded-lg">
      <div>
        <h2 className="text-xl font-semibold">Account Information</h2>
        <p className="text-gray-500 text-sm mb-6">Update your account information</p>
      </div>

      {/* Navigation Tabs */}
      <Navigation />

      <div className="bg-white p-6 rounded-lg">
        {/* Communication Permissions */}
        <div className="space-y-6">
          <div className="border-b-2 pb-2 border-dashed">
            <h3 className="text-lg font-medium">Company Registration & Legal Documents</h3>
            <p className="text-gray-500 text-sm mb-6">Upload the necessary files to verify your company's legal status.</p>            
          </div>

          {toggleItems.map(({ id, label, description }) => (
            <ToggleSwitch key={id} id={id} label={label} description={description} toggled={toggles[id]} onToggle={handleToggle} />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-gray-100 text-gray-500 border border-gray-80 rounded-md hover:bg-gray-200">Save as Draft</button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md border border-black hover:bg-gray-200">Cancel</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Submit</button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ id, label, description, toggled, onToggle }) => {
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${toggled ? "bg-blue-600" : "bg-gray-300"}`}
        onClick={() => onToggle(id)}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${toggled ? "translate-x-6" : ""}`}></div>
      </button>
    </div>
  );
};

export default Preferences;
