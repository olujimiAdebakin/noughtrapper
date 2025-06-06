import React, { useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { MoreVertical } from 'lucide-react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Input, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

const CampaignTypeTable = () => {

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const templates = [
    { id: 1, department: 'IT', emailSent: 150, openedEmails: 120, clickedLinks: '20 (13%)', credentials: '30 (12%)', status: 'Best Performance - Low risk, highest awareness.', statusColor: 'text-green-500' },
    { id: 2, department: 'HR', emailSent: 150, openedEmails: 120, clickedLinks: '20 (13%)', credentials: '30 (12%)', status: 'High Risk - Most vulnerable, urgent training needed.', statusColor: 'text-red-500' },
    { id: 3, department: 'Finance', emailSent: 150, openedEmails: 120, clickedLinks: '20 (13%)', credentials: '30 (12%)', status: 'Critical Risk - High credential leaks, major security threat.', statusColor: 'text-red-500' },
    { id: 4, department: 'Sales', emailSent: 150, openedEmails: 120, clickedLinks: '20 (13%)', credentials: '30 (12%)', status: 'Moderate Risk - Needs phishing awareness improvement.', statusColor: 'text-yellow-500' },
    { id: 5, department: 'Operations', emailSent: 150, openedEmails: 120, clickedLinks: '20 (13%)', credentials: '30 (12%)', status: 'Lower Risk - Decent awareness but room for improvement', statusColor: 'text-blue-500' },
   
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(template =>
      template.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, templates]);

  const totalPages = Math.ceil(filteredTemplates.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + rowsPerPage);


  const { campaigntype, campaignrecipient } = useParams();
  
    console.log("Campaign Type:", campaigntype);
    console.log("Campaign Employee:", campaignrecipient);


  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Campaign Sent</h2>
        <Input
          isClearable
          placeholder="Search templates..."
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
          <TableColumn className='bg-default-200'>Department</TableColumn>
          <TableColumn className='bg-default-200'>Emails Sent</TableColumn>
          <TableColumn className='bg-default-200'>Opened Emails</TableColumn>
          <TableColumn className='bg-default-200'>Clicked Links</TableColumn>
          <TableColumn className='bg-default-200'>Entered Credentials</TableColumn>
          <TableColumn className='bg-default-200'>Status</TableColumn>
          <TableColumn className='bg-default-200'></TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedTemplates.map((template, index) => (
            <TableRow key={template.id} className='border-b relative'>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell className='border-x'>{template.department}</TableCell>
              <TableCell>{template.emailSent}</TableCell>
              <TableCell>{template.openedEmails}</TableCell>
              <TableCell>{template.clickedLinks}</TableCell>
              <TableCell>{template.credentials}</TableCell>
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
                      <button className="flex items-center gap-2 bg-gray-100 my-2 w-full rounded-lg px-4 py-2 hover:bg-gray-200" onClick={() => {
    const department = template.department.toLowerCase().replace(/\s+/g, "-");

    router.push(`/campaigns/campaigns-stats/${campaigntype}/${campaignrecipient}/${department}`);
  }}>
                        <FaEye /> View Details
                      </button>
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

export default CampaignTypeTable;
