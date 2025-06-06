import React, { useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { MoreVertical } from 'lucide-react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Input, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

const PublishedExam = () => {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const templates = [
    { id: 1, exam: 'NOU-00101', type: 'Phishing Awareness Test', company: 'Wema Bank Holdings', status: 'sent', statusColor: 'text-green-500' },
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

  const filteredTemplates = useMemo(() => {
    return templates.filter(template =>
      template.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, templates]);

  const totalPages = Math.ceil(filteredTemplates.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Exam History</h2>
        <Input
          isClearable
          placeholder="Search..."
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table aria-label="Templates Table" removeWrapper isStriped shadow="none">
        <TableHeader>
          <TableColumn className='bg-default-200'>S/N</TableColumn>
          <TableColumn className='bg-default-200'>Exam ID</TableColumn>
          <TableColumn className='bg-default-200'>Exam Type</TableColumn>
          <TableColumn className='bg-default-200'>Company</TableColumn>
          <TableColumn className='bg-default-200'>Status</TableColumn>
          <TableColumn className='bg-default-200'></TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedTemplates.map((template, index) => (
            <TableRow key={template.id} className='border-b relative'>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell className='border-x'>{template.exam}</TableCell>
              <TableCell>{template.type}</TableCell>
              <TableCell>{template.company}</TableCell>
              <TableCell className={template.statusColor}>
                {template.status}
              </TableCell>
              <TableCell className="relative">
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <button aria-label="More options">
                      <MoreVertical size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='py-1'>
                      {/* <button className="flex items-center gap-2 bg-gray-100 my-2 w-full rounded-lg px-4 py-2 hover:bg-gray-200" 
                      onClick={() => {
    const type = template.type.toLowerCase().replace(/\s+/g, "-");
    const recipient = template.recipients.toLowerCase().replace(/\s+/g, "-");

    router.push(`/campaigns/campaigns-stats/${type}/${recipient}`);
  }}
                      >
                        <FaEye /> View Details
                      </button> */}
                      <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 py-2 text-red-500 hover:bg-gray-200">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing <span className="border px-3 py-1 mx-1">{Math.min(currentPage * rowsPerPage, filteredTemplates.length)}</span> of {filteredTemplates.length}
        </p>
        <Pagination
          showControls
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PublishedExam;
