import React from "react";
import { MoreVertical } from "lucide-react";
import { GrWindows } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
import Pagination from "../reusable/TablePagination";

const CampaignTable = () => {
  const tableData = [
    {
      id: 1,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      campaign: "Claim Reward",
      status: "Clicked Link",
    },
    {
      id: 2,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      campaign: "Claim Reward",
      status: "Not clicked",
    },
    {
      id: 3,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      campaign: "Claim Reward",
      status: "Not-Clicked",
    },
    {
      id: 4,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      campaign: "Claim Reward",
      status: "Opened Linked",
    },
    {
      id: 5,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      campaign: "Claim Reward",
      status: "Not-Clicked",
    },
    {
      id: 6,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      campaign: "Claim Reward",
      status: "Opened Linked",
    },
    {
      id: 7,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      campaign: "Claim Reward",
      status: "Not-Clicked",
    },
    {
      id: 8,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      campaign: "Claim Reward",
      status: "Opened Linked",
    },
    {
      id: 9,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      campaign: "Claim Reward",
      status: "Not-Clicked",
    },
    {
      id: 10,
      userId: "NOU-00101",
      ip: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      campaign: "Claim Reward",
      status: "Opened Linked",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "clicked link":
        return "text-green-500";
      case "not-clicked":
        return "text-red-500";
      case "opened linked":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getOsIcon = (os) => {
    return os.toLowerCase() === "windows" ? (
      <GrWindows className="h-5 w-5 text-blue-400" />
    ) : (
      <FaApple className="h-5 w-5 text-black" />
    );
  };

  return (
    <div className="w-full overflow-hidden bg-white pb-4">
      <table className="w-full">
        <thead className="bg-[#F0F2F5]">
          <tr>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              S/N
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              IP Address
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              IP Type
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              User OS
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              Campaign Sent
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#2B3540] uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[13px] text-[#192027]">
                {row.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[13px] text-[#222]">
                {row.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[13px] text-[#192027">
                {row.ip}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[13px] text-[#192027]">
                {row.ipType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getOsIcon(row.os)}
                  <span className="ml-2 text-[13px] text-[#192027] font-medium">{row.os}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[13px] text-[#222]">
                {row.campaign}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  font-medium text-[13px] text-[#222]">
                <span className={`text-sm ${getStatusColor(row.status)}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center h-[20px] bg-white mt-3">

        <Pagination/>
      </div>
    </div>
  );
};

export default CampaignTable;
