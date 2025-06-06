import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import {  MdKey } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const EmployeeInfo = ({ employee }) => {
  return (
    <div className="w-full">
      <div>
        <div className="grid grid-cols-2">
          <InfoRow label="Email Address" value={employee.email} icon={<MdOutlineEmail className="text-red-600 mt-1" />} />
          <InfoRow label="Password" value={employee.password} icon={<MdKey className="text-red-600 mt-1" />} />
          <InfoRow 
            label="User ID" 
            value={employee.userId}
          />
          <InfoRow label="IP Address" value={employee.ipAddress} />
          <InfoRow label="IP Type" value={employee.ipType} />
          <InfoRow label="User OS" value={employee.os} />
          <InfoRow label="Browser Name" value={employee.browser} />
          <InfoRow label="CPU Name" value={employee.cpu} />
          <InfoRow label="Browser Version" value={employee.browserVersion} />
          <InfoRow label="Language" value={employee.language} />
          <InfoRow label="City" value={employee.city} />
          <InfoRow label="Country" value={employee.country} />
        </div>
        <InfoRow label="Address" value={employee.address} icon={<MdLocationOn className="text-red-600 mt-1" />} />
      </div>
    </div>
  );
};

// Reusable row component with separate styling for label and value
const InfoRow = ({ label, value, icon, }) => (
  <div className="flex flex-col gap-1 mb-4 p-1">
    <span className={`text-sm`}>{label}</span>
    <div className={`flex gap-2 text-gray-900 bg-gray-100 p-2`}>
      <span>
        {icon}
      </span>
      <span>
        {value}
      </span>
    </div>
  </div>
);

export default EmployeeInfo;
