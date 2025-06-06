"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function StaffsTable({ clientName, staffData }) {
  console.log("StaffsTable - clientName:", clientName);
  console.log("StaffsTable - staffData:", staffData);

  const router = useRouter();

  // State for pagination and dropdown
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure staffData is an array
  const safeStaffData = Array.isArray(staffData) ? staffData : [];
  console.log("StaffsTable - safeStaffData:", safeStaffData);

  // Filter staffData based on search term
  const filteredData = safeStaffData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
  );
  console.log("StaffsTable - filteredData:", filteredData);

  // Pagination logic
  const totalDisplayed = Math.min(page * itemsPerPage, filteredData.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  console.log("StaffsTable - paginatedData:", paginatedData);

  // Function for dynamic routing
  const handleStaffClick = (staffName) => {
    const formattedStaffName = encodeURIComponent(
      staffName.replace(/\s+/g, "-")
    );
    router.push(`/manage-clients/clients/${clientName}/${formattedStaffName}`);
    setActiveRow(null);
  };

  return (
    <div className="bg-white rounded-lg p-5 pt-5">
      <div className="flex justify-between my-4">
        <h3 className="font-semibold text-sm me-5">
          Staff List for {decodeURIComponent(clientName).replace(/-/g, " ")}
        </h3>
        <Input
          isClearable
          placeholder="Search by name, email, or phone"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        />
      </div>
      <Table
        aria-label="Staff Table"
        removeWrapper
        isStriped
        shadow="sm"
        border={true}
        className="border-collapse border rounded-lg"
        emptyContent="No staff data available" // Rely solely on this for empty state
      >
        <TableHeader color="default">
          <TableColumn className="bg-default-200">S/N</TableColumn>
          <TableColumn className="bg-default-200">Staff Name</TableColumn>
          <TableColumn className="bg-default-200">Email Address</TableColumn>
          <TableColumn className="bg-default-200">Phone Number</TableColumn>
          <TableColumn className="bg-default-200">Role</TableColumn>
          <TableColumn className="bg-default-200">Created At</TableColumn>
          <TableColumn className="bg-default-200"></TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={item.pk} className="border-b border-r-1">
              <TableCell className="border-r-1">
                {startIndex + index + 1}
              </TableCell>
              <TableCell className="border-r-1">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="relative">
                  <SlOptionsVertical
                    size={14}
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() =>
                      setActiveRow(activeRow === item.pk ? null : item.pk)
                    }
                  />
                  {activeRow === item.pk && (
                    <div className="absolute top-0 -right-7 mt-2 bg-white border rounded-lg shadow-lg p-1 min-w-20 z-40">
                      <div
                        onClick={() => handleStaffClick(item.name)}
                        className="cursor-pointer hover:bg-gray-50 rounded-md flex items-center gap-1 text-gray-400 transition-colors"
                      >
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
          <span className="text-default-400">of {filteredData.length}</span>
        </p>
        <Pagination
          showControls
          total={Math.ceil(filteredData.length / itemsPerPage)}
          initialPage={1}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
