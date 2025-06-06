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

export default function ClientOverviewTable({ setActiveTab }) {
  const data = [
    {
      id: 1,
      examName: "Security Awareness Q1",
      averageScore: "75%",
      passMark: "60%",
      scoreMark: "85%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 2,
      examName: "Phishing Prevention",
      averageScore: "45%",
      passMark: "50%",
      scoreMark: "40%",
      status: "Failed",
      statusColor: "text-red-500",
    },
    {
      id: 3,
      examName: "Data Privacy Basics",
      averageScore: "82%",
      passMark: "70%",
      scoreMark: "88%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 4,
      examName: "Cybersecurity 101",
      averageScore: "60%",
      passMark: "60%",
      scoreMark: "62%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 5,
      examName: "Incident Response",
      averageScore: "55%",
      passMark: "65%",
      scoreMark: "50%",
      status: "Failed",
      statusColor: "text-red-500",
    },
    {
      id: 6,
      examName: "Network Security",
      averageScore: "78%",
      passMark: "70%",
      scoreMark: "80%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 7,
      examName: "Social Engineering",
      averageScore: "40%",
      passMark: "50%",
      scoreMark: "35%",
      status: "Failed",
      statusColor: "text-red-500",
    },
    {
      id: 8,
      examName: "Cloud Security",
      averageScore: "85%",
      passMark: "75%",
      scoreMark: "90%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 9,
      examName: "Compliance Training",
      averageScore: "68%",
      passMark: "60%",
      scoreMark: "70%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 10,
      examName: "Endpoint Protection",
      averageScore: "52%",
      passMark: "55%",
      scoreMark: "48%",
      status: "Failed",
      statusColor: "text-red-500",
    },
    {
      id: 11,
      examName: "Malware Defense",
      averageScore: "90%",
      passMark: "80%",
      scoreMark: "92%",
      status: "Passed",
      statusColor: "text-green-500",
    },
    {
      id: 12,
      examName: "Ethical Hacking",
      averageScore: "65%",
      passMark: "70%",
      scoreMark: "60%",
      status: "Failed",
      statusColor: "text-red-500",
    },
  ];

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);

  const totalDisplayed = Math.min(page * itemsPerPage, data.length);
  const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    
    const handleSeeMore = () => {
      setActiveTab("Exam Records"); 
    };

  return (
    <div className="bg-white rounded-lg p-5 pt-5">
      <div className="flex justify-between my-4">
        <h3 className="font-semibold text-sm me-5">Exams Results Overview</h3>
        <button
          onClick={handleSeeMore}
          className="flex w-[122px] h-10 p-4 justify-center items-center gap-3 rounded-md border-1 border-[#DC3545] text-[#FD3842] text-[16px] font-semibold"
        >
          See More
        </button>
      </div>
      <Table
        aria-label="Exam Results Table"
        removeWrapper
        isStriped
        shadow="sm"
        border={true}
        className="border  rounded-lg"
      >
        <TableHeader color="default">
          <TableColumn className="bg-default-200">S/N</TableColumn>
          <TableColumn className="bg-default-200">Exam Name</TableColumn>
          <TableColumn className="bg-default-200">Average Score</TableColumn>
          <TableColumn className="bg-default-200">Pass Mark</TableColumn>
          <TableColumn className="bg-default-200">Score Mark</TableColumn>
          <TableColumn className="bg-default-200">Status</TableColumn>
          <TableColumn className="bg-default-200"></TableColumn>
        </TableHeader>
        <TableBody className="">
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="border-b">
              <TableCell className=" border-r-1">{item.id}</TableCell>
              <TableCell className=" border-r-1">{item.examName}</TableCell>
              <TableCell>{item.averageScore}</TableCell>
              <TableCell>{item.passMark}</TableCell>
              <TableCell>{item.scoreMark}</TableCell>
              <TableCell className={item.statusColor}>{item.status}</TableCell>
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
