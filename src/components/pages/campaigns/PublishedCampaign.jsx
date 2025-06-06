import React, { useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { MoreVertical } from 'lucide-react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Input, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

const PublishedCampaign = ({ campaigns }) => {

  const router = useRouter();

  const recentCampaigns = campaigns.recentCampaigns?.filter((c) => c.status === 'published' || c.status === 'active');

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const filteredRecentCampaigns = useMemo(() => {
    return (recentCampaigns || []).filter(recentCampaigns =>
      recentCampaigns.campaignType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, recentCampaigns]);

  const totalPages = Math.ceil(filteredRecentCampaigns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecentCampaigns = filteredRecentCampaigns.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Campaign Sent</h2>
        <Input
          isClearable
          placeholder="Search recent Campaigns..."
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table aria-label="Recent Campaigns Table" removeWrapper isStriped shadow="none">
        <TableHeader>
          <TableColumn className='bg-default-200'>S/N</TableColumn>
          <TableColumn className='bg-default-200'>Campaign ID</TableColumn>
          <TableColumn className='bg-default-200'>Campaign Type</TableColumn>
          <TableColumn className='bg-default-200'>Recepients</TableColumn>
          <TableColumn className='bg-default-200'>Created Time</TableColumn>
          <TableColumn className='bg-default-200'>Status</TableColumn>
          <TableColumn className='bg-default-200'></TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedRecentCampaigns.map((recentCampaign, index) => (
            <TableRow key={index} className='border-b relative'>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell className='border-x'>{recentCampaign.campaignId}</TableCell>
              <TableCell>{recentCampaign.campaignType}</TableCell>
              <TableCell>{recentCampaign.company}</TableCell>
              <TableCell>{recentCampaign.time}</TableCell>
              <TableCell className='text-green-500'>
                {recentCampaign.status}
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
                      <button className="flex items-center gap-2 bg-gray-100 my-2 w-full rounded-lg px-4 py-2 hover:bg-gray-200" 
                      onClick={() => {
                        const type = recentCampaign.campaignType.toLowerCase().replace(/\s+/g, "-");
                        const recipient = recentCampaign.company.toLowerCase().replace(/\s+/g, "-");

                        router.push(`/campaigns/campaigns-stats/${type}/${recipient}`);
                      }}
                      >
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
          Showing <span className="border px-3 py-1 mx-1">{Math.min(currentPage * rowsPerPage, filteredRecentCampaigns.length)}</span> of {filteredRecentCampaigns.length}
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

export default PublishedCampaign;
