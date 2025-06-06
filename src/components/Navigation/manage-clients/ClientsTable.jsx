"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Function to map API status to colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return "text-green-500";
    case "expired":
      return "text-red-500";
    case "not clicked":
    case "not-clicked":
    case "unpaid":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export default function ClientsTable({ clients: initialClients }) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients || []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const startIndex = (page - 1) * itemsPerPage;
  const filteredClients = clients.filter((client) =>
    client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedData = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalDisplayed = paginatedData.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".options-menu")) {
        setActiveRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prepare for delete
  const confirmDelete = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
    setActiveRow(null);
  };

  // Delete client function - now uses internal route
  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    setIsDeleting(true);
    try {
      // Use internal route instead of direct API call
      const response = await fetch(`/api/deleteClient/${clientToDelete.clientId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to delete client (Status: ${response.status})`
        );
      }

      // Update local state by removing the deleted client
      setClients(
        clients.filter((client) => client.clientId !== clientToDelete.clientId)
      );
      toast.success(
        `Client "${clientToDelete.clientName}" deleted successfully`
      );

      // Refresh the page to ensure data is up-to-date
      router.refresh();
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(error.message || "Failed to delete client");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  if (!clients || !Array.isArray(clients) || clients.length === 0) {
    return <p className="text-center p-6">No clients available</p>;
  }

  return (
    <div className="bg-white rounded-lg p-5">
      {/* Header Section */}
      <div className="flex justify-between my-4">
        <h3 className="font-semibold text-sm">Clients Details</h3>
        <Input
          isClearable
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search client"
          startContent={<IoSearch />}
          className="bg-default-200 rounded-xl w-1/3"
        />
      </div>

      {/* Table Section */}
      <Table aria-label="Clients Table" removeWrapper isStriped shadow="sm">
        <TableHeader>
          <TableColumn className="bg-gray-100">S/N</TableColumn>
          <TableColumn className="bg-gray-100">Client ID</TableColumn>
          <TableColumn className="bg-gray-100">Client Name</TableColumn>
          <TableColumn className="bg-gray-100">Company Email</TableColumn>
          <TableColumn className="bg-gray-100">Employees</TableColumn>
          <TableColumn className="bg-gray-100">Status</TableColumn>
          <TableColumn className="bg-gray-100">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={item.clientId || index}>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>{item.clientId || "N/A"}</TableCell>
              <TableCell>{item.clientName || "N/A"}</TableCell>
              <TableCell>{item.companyEmail || "N/A"}</TableCell>
              <TableCell>{item.employees || "N/A"}</TableCell>
              <TableCell className={getStatusColor(item.status)}>
                {item.status || "N/A"}
              </TableCell>
              <TableCell>
                <div className="relative">
                  <SlOptionsVertical
                    size={14}
                    className="cursor-pointer hover:text-blue-500 transition-colors options-menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRow(
                        activeRow === item.clientId ? null : item.clientId
                      );
                    }}
                  />

                  {activeRow === item.clientId && (
                    <div className="absolute top-6 right-0 bg-white border rounded-lg shadow-lg p-1 min-w-32 z-50 options-menu">
                      <Link
                        href={`/manage-clients/clients/${encodeURIComponent(
                          item.clientName.replace(/\s+/g, "-")
                        )}`}
                        className="cursor-pointer hover:bg-gray-50 rounded-md flex items-center gap-2 text-gray-600 p-2 transition-colors"
                      >
                        <Eye size={14} />
                        <span className="text-xs">View Details</span>
                      </Link>

                      <div
                        className="cursor-pointer hover:bg-gray-50 rounded-md flex items-center gap-2 text-red-600 p-2 transition-colors"
                        onClick={() => confirmDelete(item)}
                      >
                        <Trash2 size={14} />
                        <span className="text-xs">Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing{" "}
          <span className="border px-3 py-1 mx-1">{totalDisplayed}</span>{" "}
          <span className="text-gray-500">of {clients.length}</span>
        </p>
        <Pagination
          showControls
          total={Math.ceil(filteredClients.length / itemsPerPage)}
          initialPage={1}
          page={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete client "{clientToDelete?.clientName}
            "? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              auto
              color="default"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              auto
              color="danger"
              onClick={handleDeleteClient}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
