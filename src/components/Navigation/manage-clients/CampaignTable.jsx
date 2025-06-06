"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Pagination,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { Eye, Trash2 } from "lucide-react";

export default function CampaignTable() {
  const data = [
    {
      id: 1,
      campaignId: "CAMP-001",
      campaignType: "Security Awareness Q1",
      recipients: "150",
      createdTime: "2025-02-01 09:30 AM",
    },
    {
      id: 2,
      campaignId: "CAMP-002",
      campaignType: "Phishing Prevention",
      recipients: "200",
      createdTime: "2025-02-02 02:15 PM",
    },
    {
      id: 3,
      campaignId: "CAMP-003",
      campaignType: "Data Privacy Basics",
      recipients: "120",
      createdTime: "2025-02-03 11:45 AM",
    },
    {
      id: 4,
      campaignId: "CAMP-004",
      campaignType: "Cybersecurity 101",
      recipients: "180",
      createdTime: "2025-02-04 03:00 PM",
    },
    {
      id: 5,
      campaignId: "CAMP-005",
      campaignType: "Incident Response",
      recipients: "90",
      createdTime: "2025-02-05 10:00 AM",
    },
    {
      id: 6,
      campaignId: "CAMP-006",
      campaignType: "Network Security",
      recipients: "140",
      createdTime: "2025-02-06 01:30 PM",
    },
    {
      id: 7,
      campaignId: "CAMP-007",
      campaignType: "Social Engineering",
      recipients: "110",
      createdTime: "2025-02-07 04:15 PM",
    },
    {
      id: 8,
      campaignId: "CAMP-008",
      campaignType: "Cloud Security",
      recipients: "160",
      createdTime: "2025-02-08 09:45 AM",
    },
    {
      id: 9,
      campaignId: "CAMP-009",
      campaignType: "Compliance Training",
      recipients: "130",
      createdTime: "2025-02-09 12:00 PM",
    },
    {
      id: 10,
      campaignId: "CAMP-010",
      campaignType: "Endpoint Protection",
      recipients: "100",
      createdTime: "2025-02-10 03:30 PM",
    },
    {
      id: 11,
      campaignId: "CAMP-011",
      campaignType: "Malware Defense",
      recipients: "170",
      createdTime: "2025-02-11 11:00 AM",
    },
    {
      id: 12,
      campaignId: "CAMP-012",
      campaignType: "Ethical Hacking",
      recipients: "95",
      createdTime: "2025-02-12 02:45 PM",
    },
  ];

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);

  const totalDisplayed = Math.min(page * itemsPerPage, data.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg p-5 pt-5">
      <div className="flex justify-between my-4">
        <h3 className="font-semibold text-sm me-5">Recent Campaign Sent</h3>
        <Input
          isClearable
          placeholder="Search or type"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
        />
      </div>
      <Table
        aria-label="Campaign Table"
        removeWrapper
        isStriped
        shadow="sm"
        border={true}
        className="border rounded-lg"
      >
        <TableHeader color="default">
          <TableColumn className="bg-default-200">S/N</TableColumn>
          <TableColumn className="bg-default-200">Campaign ID</TableColumn>
          <TableColumn className="bg-default-200">Campaign Type</TableColumn>
          <TableColumn className="bg-default-200">Recipients</TableColumn>
          <TableColumn className="bg-default-200">Created Time</TableColumn>
          <TableColumn className="bg-default-200"></TableColumn>
        </TableHeader>
        <TableBody className="">
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="border-b">
              <TableCell className="border-r-1">{item.id}</TableCell>
              <TableCell className="border-r-1">{item.campaignId}</TableCell>
              <TableCell>{item.campaignType}</TableCell>
              <TableCell>{item.recipients}</TableCell>
              <TableCell>{item.createdTime}</TableCell>
              <TableCell>
                <div className="relative">
                  <SlOptionsVertical
                    size={14}
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() =>
                      setActiveRow(activeRow === item.id ? null : item.id)
                    }
                  />
                  {activeRow === item.id && (
                    <div className="absolute top-0 -right-7 mt-2 bg-white border rounded-lg shadow-lg p-1 min-w-20 z-40">
                      <div className="cursor-pointer hover:bg-gray-50 rounded-md flex items-center gap-1 text-gray-400 transition-colors">
                        <Eye size={10} />
                        <span className="text-xs font-light">View Details</span>
                      </div>
                      <div className="cursor-pointer p-2 hover:bg-gray-50 rounded-md flex items-center gap-1 text-red-600 transition-colors">
                        <Trash2 size={10} />
                        <span className="text-xs font-light">Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing{" "}
          <span className="border px-3 py-1 mx-1">{totalDisplayed}</span>{" "}
          <span className="text-default-400">of {data.length}</span>
        </p>
        <Pagination
          showControls
          total={Math.ceil(data.length / itemsPerPage)}
          initialPage={1}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
