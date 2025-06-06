import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Pagination, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { FaEye, FaTrash } from 'react-icons/fa';

function DraftExam() {

  const router = useRouter();
  const data = [
      { id: 1, exam: 'NOU-00101', type: 'Phishing Awareness Test', company: 'Wema Bank Holdings', status: 'Pending', statusColor: 'text-green-500' },
      { id: 2, exam: 'NOU-00101', type: 'Password Security Best Practices', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 3, exam: 'NOU-00101', type: 'Social Engineering Defense', company: 'Wema Bank Holdings', status: 'Expired', statusColor: 'text-red-500' },
      { id: 4, exam: 'NOU-00101', type: 'Secure Browsing and Email Safety', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 5, exam: 'NOU-00101', type: 'Ransomware and Malware Prevention', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 6, exam: 'NOU-00101', type: 'Cloud Security and Best Practices', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 7, exam: 'NOU-00101', type: 'Endpoint Security and Device Protection', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 8, exam: 'NOU-00101', type: 'Multi-Factor Authentication (MFA) Basics', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 9, exam: 'NOU-00101', type: 'Insider Threat Awareness', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
      { id: 10, exam: 'NOU-00101', type: 'Data Privacy and Compliance', company: 'Wema Bank Holdings', status: 'Running', statusColor: 'text-green-500' },
  ];

  const itemsPerPage = 10; 
  const [page, setPage] = useState(1);
  
  const totalDisplayed = Math.min(page * itemsPerPage, data.length);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white px-4 py-1">
      <div className="flex justify-between my-4">
        <h3 className='font-semibold text-lg me-5'>
          Recent Draft Exam
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
                  <TableColumn className='bg-default-200'>Exam ID</TableColumn>
                  <TableColumn className='bg-default-200'>Exam Type</TableColumn>
                  <TableColumn className='bg-default-200'>Company</TableColumn>
                  <TableColumn className='bg-default-200'>Status</TableColumn>
                  <TableColumn className='bg-default-200'></TableColumn>
                </TableHeader>
        <TableBody className='px-2'>
          {paginatedData.map((item) => (
            <TableRow key={item.id} className='border-b'>
              <TableCell>{item.id}</TableCell>
              <TableCell className='border-x-1'>{item.exam}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell className={item.statusColor} >{item.status}</TableCell>
              <TableCell>
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <SlOptionsVertical size={14} className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 mb-2 py-2 hover:bg-gray-200" onClick={() => router.push('')}>
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

export default DraftExam;