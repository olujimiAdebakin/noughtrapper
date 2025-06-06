import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Pagination, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { FaEye, FaTrash } from 'react-icons/fa';

function UsersTable({platformDetails}) {

  const router = useRouter();
  const data = [
    {
      id: 1,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Clicked Link",
      statusColor: "text-green-500",
    },
    {
      id: 2,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Not clicked",
      statusColor: "text-red-500",
    },
    {
      id: 3,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Not-Clicked",
      statusColor: "text-red-500",
    },
    {
      id: 4,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Opened Linked",
      statusColor: "text-blue-500",
    },
      {
      id: 5,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Clicked Link",
      statusColor: "text-green-500",
    },
    {
      id: 6,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Not clicked",
      statusColor: "text-red-500",
    },
    {
      id: 7,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Not-Clicked",
      statusColor: "text-red-500",
    },
    {
      id: 8,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Opened Linked",
      statusColor: "text-blue-500",
    },
    {
      id: 9,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Clicked Link",
      statusColor: "text-green-500",
    },
    {
      id: 10,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Not clicked",
      statusColor: "text-red-500",
    },
    {
      id: 11,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "Windows",
      osIcon: "/icons/windows.svg",
      campaign: "Claim Reward",
      status: "Not-Clicked",
      statusColor: "text-red-500",
    },
    {
      id: 12,
      userId: "NOU-00101",
      ipAddress: "192.168.1.1",
      ipType: "IPv4",
      os: "MacOS",
      osIcon: "/icons/macos.svg",
      campaign: "Claim Reward",
      status: "Opened Linked",
      statusColor: "text-blue-500",
    },
  ];

  const itemsPerPage = 10; 
  const [page, setPage] = useState(1);
  
  const totalDisplayed = Math.min(page * itemsPerPage, data.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white p-5">
      <div className="flex justify-between my-4">
        <h3 className='font-semibold text-sm me-5'>
          Recent Users Information Received From {platformDetails.company_name} Users
        </h3>
        <Input
          isClearable
          placeholder="Search or type"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
        />
      </div>
      <Table aria-label="Recent Users Table" removeWrapper isStriped shadow="none">
        <TableHeader>
          <TableColumn className='bg-default-200'>S/N</TableColumn>
          <TableColumn className='bg-default-200'>User ID</TableColumn>
          <TableColumn className='bg-default-200'>IP Address</TableColumn>
          <TableColumn className='bg-default-200'>IP Type</TableColumn>
          <TableColumn className='bg-default-200'>User OS</TableColumn>
          <TableColumn className='bg-default-200'>Campaign Sent</TableColumn>
          <TableColumn className='bg-default-200'>Status</TableColumn>
          <TableColumn className='bg-default-200'></TableColumn>
        </TableHeader>
        <TableBody className='px-2'>
          {paginatedData.map((item) => (
            <TableRow key={item.id} className='border-b'>
              <TableCell>{item.id}</TableCell>
              <TableCell className='border-x-1'>{item.userId}</TableCell>
              <TableCell>{item.ipAddress}</TableCell>
              <TableCell>{item.ipType}</TableCell>
              <TableCell className='flex items-center'>
                <img src={item.osIcon} alt={`${item.os} icon`} width={20} height={20} className='me-3' />
                {item.os}
              </TableCell>
              <TableCell>{item.campaign}</TableCell>
              <TableCell className={item.statusColor}>{item.status}</TableCell>
              <TableCell>
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <SlOptionsVertical size={14} className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 mb-2 py-2 hover:bg-gray-200" onClick={() => router.push('/platform/template/user-details')}>
                      <FaEye /> View Details
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 py-2 text-red-500 hover:bg-gray-200">
                      <FaTrash /> Delete
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing <span className='border px-3 py-1 mx-1'>{totalDisplayed}</span> <span className='text-default-400'>of {data.length}</span>
        </p>
        <Pagination showControls total={Math.ceil(data.length / itemsPerPage)} initialPage={1} onChange={setPage} />
      </div>
    </div>
  );
}

export default UsersTable;
