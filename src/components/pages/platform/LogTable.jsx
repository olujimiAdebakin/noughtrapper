import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Pagination } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

function LogTable() {
  const data = [
    { logId: "GLR-GH-00101", date: "2024-11-18", loginTime: "08:00 AM", logoutTime: "8:00 AM", device: "Desktop - POS001" },
    { logId: "GLR-GH-00102", date: "2024-11-19", loginTime: "09:15 AM", logoutTime: "9:30 AM", device: "Laptop - LPT-234" },
    { logId: "GLR-GH-00103", date: "2024-11-20", loginTime: "10:00 AM", logoutTime: "10:30 AM", device: "Tablet - TBL-567" },
    { logId: "GLR-GH-00104", date: "2024-11-21", loginTime: "07:00 AM", logoutTime: "7:45 AM", device: "Desktop - POS003" },
    { logId: "GLR-GH-00105", date: "2024-11-22", loginTime: "11:00 AM", logoutTime: "11:45 AM", device: "Mobile - MBL-890" },
    { logId: "GLR-GH-00106", date: "2024-11-23", loginTime: "01:00 PM", logoutTime: "1:30 PM", device: "Desktop - POS001" },
    { logId: "GLR-GH-00107", date: "2024-11-24", loginTime: "02:00 PM", logoutTime: "2:30 PM", device: "Laptop - LPT-234" },
    { logId: "GLR-GH-00108", date: "2024-11-25", loginTime: "03:00 PM", logoutTime: "3:30 PM", device: "Tablet - TBL-567" },
    { logId: "GLR-GH-00109", date: "2024-11-26", loginTime: "04:00 PM", logoutTime: "4:30 PM", device: "Desktop - POS003" },
    { logId: "GLR-GH-00110", date: "2024-11-27", loginTime: "05:00 PM", logoutTime: "5:30 PM", device: "Mobile - MBL-890" },
  ];

  const [selectedColor, setSelectedColor] = React.useState("warning");

  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  const itemsPerPage = 5; 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = data.filter(item => 
    item.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.device.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDisplayed = Math.min(page * itemsPerPage, filteredData.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white">
      <Table aria-label="Login Logs Table" shadow="none">
        <TableHeader>
            <TableColumn className="bg-black border-r border-default-500">S/N</TableColumn>
            <TableColumn className="bg-black border-r border-default-500">Log ID</TableColumn>
            <TableColumn className="bg-black border-r border-default-500">Date</TableColumn>
            <TableColumn className="bg-black border-r border-default-500">Login Time</TableColumn>
            <TableColumn className="bg-black border-r border-default-500">Logout Time</TableColumn>
            <TableColumn className="bg-black">Device Used</TableColumn>
        </TableHeader>
        <TableBody className="border border-b">
          {paginatedData.map((item, index) => (
            <TableRow key={index} className="border-b border-default-300">
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell className="border-x border-default-300">{item.logId}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.loginTime}</TableCell>
              <TableCell>{item.logoutTime}</TableCell>
              <TableCell>{item.device}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-green-700 h-14 flex justify-between items-center rounded-b-2xl mt-4 px-5">
        <p>
          Showing <span className="border px-3 py-1 mx-1">{totalDisplayed}</span> of <span className="text-default-400">{filteredData.length}</span>
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

export default LogTable;
