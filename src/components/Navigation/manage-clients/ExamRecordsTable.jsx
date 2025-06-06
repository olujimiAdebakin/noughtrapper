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
import { useParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function ExamsRecordsTable({ clientName, examName, staffName, employeeName }) {
    const router = useRouter();
    // const {clientName} = useParams();
const data = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "John Doe",
    passScore: 60,
    score: 85,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    passScore: 50,
    score: 40,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Alice Johnson",
    passScore: 70,
    score: 88,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Bob Brown",
    passScore: 60,
    score: 62,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "Charlie Davis",
    passScore: 65,
    score: 50,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 6,
    employeeId: "EMP006",
    employeeName: "Diana Evans",
    passScore: 70,
    score: 80,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 7,
    employeeId: "EMP007",
    employeeName: "Eve Foster",
    passScore: 50,
    score: 35,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 8,
    employeeId: "EMP008",
    employeeName: "Frank Green",
    passScore: 75,
    score: 90,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 9,
    employeeId: "EMP009",
    employeeName: "Grace Hall",
    passScore: 60,
    score: 70,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 10,
    employeeId: "EMP010",
    employeeName: "Hank Ivy",
    passScore: 55,
    score: 48,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 11,
    employeeId: "EMP011",
    employeeName: "Ivy Jones",
    passScore: 80,
    score: 92,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 12,
    employeeId: "EMP012",
    employeeName: "Jack King",
    passScore: 70,
    score: 60,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 13,
    employeeId: "EMP013",
    employeeName: "Kelly Lee",
    passScore: 60,
    score: 78,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 14,
    employeeId: "EMP014",
    employeeName: "Liam Moore",
    passScore: 50,
    score: 42,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 15,
    employeeId: "EMP015",
    employeeName: "Mia Nelson",
    passScore: 70,
    score: 86,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 16,
    employeeId: "EMP016",
    employeeName: "Noah Owen",
    passScore: 65,
    score: 58,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 17,
    employeeId: "EMP017",
    employeeName: "Olivia Parker",
    passScore: 75,
    score: 94,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 18,
    employeeId: "EMP018",
    employeeName: "Paul Quinn",
    passScore: 60,
    score: 66,
    status: "Passed",
    statusColor: "text-green-500",
  },
  {
    id: 19,
    employeeId: "EMP019",
    employeeName: "Quinn Rose",
    passScore: 55,
    score: 45,
    status: "Failed",
    statusColor: "text-red-500",
  },
  {
    id: 20,
    employeeId: "EMP020",
    employeeName: "Ryan Scott",
    passScore: 80,
    score: 89,
    status: "Passed",
    statusColor: "text-green-500",
  },
];

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);

  const totalDisplayed = Math.min(page * itemsPerPage, data.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

const handleViewDetails = (employeeName) => {
  // Ensure all values are defined with fallbacks
  const safeClientName = clientName || "unknown-client";
  const safeExamName = examName || "unknown-exam";
  const safeEmployeeName = employeeName || "unknown-employee";

  const encodedClientName = encodeURIComponent(
    safeClientName.replace(/\s+/g, "-").toLowerCase()
  );
  const encodedExamName = encodeURIComponent(
    safeExamName.replace(/\s+/g, "-").toLowerCase()
  );
  const encodedEmployeeName = encodeURIComponent(
    safeEmployeeName.replace(/\s+/g, "-").toLowerCase()
  );

  console.log("Navigating with:", {
    clientName: safeClientName,
    examName: safeExamName,
    employeeName: safeEmployeeName,
  });
  router.push(
    `/manage-clients/clients/${encodedClientName}/${encodedExamName}/${encodedEmployeeName}`
  );
};
  return (
    <div className="bg-white rounded-lg p-5 pt-5">
      <div className="flex justify-between my-4">
        <h3 className="font-semibold text-sm me-5">Exams Results Overview</h3>
        <Input
          isClearable
          placeholder="Search or type"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
        />
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
          <TableColumn className="bg-default-200">Employee ID</TableColumn>
          <TableColumn className="bg-default-200">Employee Name</TableColumn>
          <TableColumn className="bg-default-200">Pass Score</TableColumn>
          <TableColumn className="bg-default-200">Score</TableColumn>
          <TableColumn className="bg-default-200">Status</TableColumn>
          <TableColumn className="bg-default-200"></TableColumn>
        </TableHeader>
        <TableBody className="">
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="border-b">
              <TableCell className="border-r-1">{item.id}</TableCell>
              <TableCell className="border-r-1">{item.employeeId}</TableCell>
              <TableCell className="border-r-1">{item.employeeName}</TableCell>
              <TableCell className="border-r-1">{item.passScore}</TableCell>
              <TableCell className="border-r-1">{item.score}</TableCell>
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
                      <div
                        onClick={() => {
                          console.log("Clicked Item:", item);
                          console.log("Props in onClick:", {
                            clientName,
                            examName,
                          });
                          handleViewDetails(item.employeeName);
                        }}
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
