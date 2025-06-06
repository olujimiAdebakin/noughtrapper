import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { MoreVertical } from 'lucide-react';
import { FaUser, FaEye, FaTrash } from 'react-icons/fa';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Input, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

const ManageTemplate = () => {

  const router = useRouter();

  const { platform_id } = useParams(); // Get platform_id from the URL

  const [templates, setTemplates] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;


  useEffect(() => {
    // Fetch the templates from the API
    const fetchTemplates = async () => {

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${baseUrl}/v1/get-template-details?platform_id=${platform_id}`;

      try {
        const accessToken = Cookies.get('authToken');

        const response = await fetch(`${endpoint}`, {
          method: 'GET',
          headers: {
        'Authorization': `${accessToken}`,
        'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        if (data.statusCode === 200) {
          const templatesData = JSON.parse(data.body).templates || [];       

          setTemplates(templatesData);

        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [platform_id]);



  const handleDeleteTemplate = async (templateId) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${baseUrl}/v1/delete-template`;

    try {

      const accessToken = Cookies.get('authToken');

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          'Authorization': `${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template_id: templateId }),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const responseBody = JSON.parse(result.body);
        if (responseBody.status === "success") {
          setTemplates((prev) =>
            prev.filter((template) => template.id !== templateId)
          );
          alert("Template deleted successfully.");
        }
      } else {
        alert("Failed to delete template.");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Something went wrong.");
    }
  };


  
  const filteredTemplates = useMemo(() => {
    return templates.filter(template =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, templates]);

  const totalPages = Math.ceil(filteredTemplates.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + rowsPerPage);




  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Templates</h2>
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
          <TableColumn className='bg-default-200'>Template Name</TableColumn>
          <TableColumn className='bg-default-200'>Used Count</TableColumn>
          <TableColumn className='bg-default-200'>Status</TableColumn>
          <TableColumn className='bg-default-200'></TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedTemplates.map((template, index) => (
            <TableRow key={`${template.name}-${index}`} className='border-b relative'>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell className='border-x'>{template.name}</TableCell>
              <TableCell>{template.used}</TableCell>
              <TableCell className={template.status === 'Published' ? 'text-green-500' : 'text-yellow-500'}>
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
                      <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 py-2 hover:bg-gray-200" onClick={() => router.push(`/platform/template/use-template/${template.id}`)}>
                        <FaUser /> Use Template
                      </button>
                      <button className="flex items-center gap-2 bg-gray-100 my-2 w-full rounded-lg px-4 py-2 hover:bg-gray-200">
                        <FaEye /> Edit Template
                      </button>
                      <button className="flex items-center gap-2 bg-gray-100 w-full rounded-lg px-4 py-2 text-red-500 hover:bg-gray-200"
                      onClick={() => handleDeleteTemplate(template.id)}
                      >
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

export default ManageTemplate;
