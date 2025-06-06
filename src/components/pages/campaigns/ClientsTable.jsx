import React from "react";
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

export default function ClientsTable() {
const data = [
  {
    id: 1,
    ClientId: "NOU-00101",
    ClientName: "Wema bank",
    CompanyEmail: "user1@example.com",
    Employees: "200",
    status: "Clicked Link",
    statusColor: "text-green-500",
  },
  {
    id: 2,
    ClientId: "Nou-00102",
    ClientName: "Vdf bank",
    CompanyEmail: "user2@example.com",
    Employees: "50",
    status: "Not clicked",
    statusColor: "text-red-500",
  },
  {
    id: 3,
    ClientId: "NOU-00103",
    ClientName: "Kuda",
    CompanyEmail: "user3@example.com",
    Employees: "120",
    status: "Not-Clicked",
    statusColor: "text-red-500",
  },
  {
    id: 4,
    ClientId: "NOU-00104",
    ClientName: "Moniepoint",
    CompanyEmail: "user4@example.com",
    Employees: "75",
    status: "Opened Link",
    statusColor: "text-blue-500",
  },
  {
    id: 5,
    ClientId: "NOU-00105",
    ClientName: "Accion Mfb",
    CompanyEmail: "user5@example.com",
    Employees: "30",
    status: "Clicked Link",
    statusColor: "text-green-500",
  },
  {
    id: 6,
    ClientId: "NOU-00106",
    ClientName: "Fcmb",
    CompanyEmail: "user6@example.com",
    Employees: "95",
    status: "Not clicked",
    statusColor: "text-red-500",
  },
  {
    id: 7,
    ClientId: "NOU-00107",
    ClientName: "UBA",
    CompanyEmail: "user7@example.com",
    Employees: "200",
    status: "Not-Clicked",
    statusColor: "text-red-500",
  },
  {
    id: 8,
    ClientId: "NOU-00108",
    ClientName: "Gateway Mfb",
    CompanyEmail: "user8@example.com",
    Employees: "150",
    status: "Opened Link",
    statusColor: "text-blue-500",
  },
  {
    id: 9,
    ClientId: "NOU-00109",
    ClientName: "Nicon Insurance",
    CompanyEmail: "user9@example.com",
    Employees: "85",
    status: "Clicked Link",
    statusColor: "text-green-500",
  },
  {
    id: 10,
    ClientId: "NOU-00110",
    ClientName: "Seplat Energy",
    CompanyEmail: "user10@example.com",
    Employees: "60",
    status: "Not clicked",
    statusColor: "text-red-500",
  },
  {
    id: 11,
    ClientId: "NOU-00111",
    ClientName: "Geregu Power",
    CompanyEmail: "user11@example.com",
    Employees: "40",
    status: "Not-Clicked",
    statusColor: "text-red-500",
  },
  {
    id: 12,
    ClientId: "NOU-00112",
    ClientName: "Geometric",
    CompanyEmail: "user12@example.com",
    Employees: "110",
    status: "Opened Link",
    statusColor: "text-blue-500",
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
        <h3 className="font-semibold text-sm me-5">Clients Details</h3>
        <Input
          isClearable
          placeholder="Search or type"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
        />
      </div>
      <Table
        aria-label="Exams Results Table"
        removeWrapper
        isStriped
        shadow="sm"
        // border={true}
        className="border border-gray-200 rounded-lg"
      >
        <TableHeader color="default">
          <TableColumn className="bg-default-200 border-r border-gray-200">
            S/N
          </TableColumn>
          <TableColumn className="bg-default-200 border-r border-gray-200">
            Client ID
          </TableColumn>

          <TableColumn className="bg-default-200 border-r border-gray-200 ">
            Client Name
          </TableColumn>
          <TableColumn className="bg-default-200 border-r border-gray-200">
            Company Email
          </TableColumn>
          <TableColumn className="bg-default-200 border-r border-gray-200">
            Employees
          </TableColumn>
          <TableColumn className="bg-default-200 border-r border-gray-200">
            Status
          </TableColumn>
          <TableColumn className="bg-default-200"></TableColumn>
        </TableHeader>
        <TableBody className="px-2">
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="border-b border-gray-200">
              <TableCell className="border-r border-gray-200">
                {item.id}
              </TableCell>
              <TableCell className="border-r border-gray-200">
                {item.ClientId}
              </TableCell>
              <TableCell className="border-r border-gray-200">
                {item.ClientName}
              </TableCell>
              <TableCell className="border-r border-gray-200">
                {item.CompanyEmail || "N/A"}
              </TableCell>
              <TableCell className="border-r border-gray-200">
                {item.Employees || "N/A"}
              </TableCell>
              <TableCell
                className={`border-r border-gray-200 ${item.statusColor}`}
              >
                {item.status}
              </TableCell>
              <TableCell className="border-r border-gray-200">
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


