// components/pages/settings/Teams.jsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { FaEye, FaTrash } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";
import Navigation from "../../../../components/pages/settings/Navigation";

const Teams = () => {
  const [showAddEmailModal, setShowAddEmailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    org_name: "",
  });
  const [fetchError, setFetchError] = useState(""); // For staff list fetch
  const [inviteError, setInviteError] = useState(""); // For invite modal
  const [staffList, setStaffList] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  // Fetch staff list
  const fetchStaffList = useCallback(async () => {
    setFetchLoading(true);
    setFetchError("");
    try {
      const response = await axios.get("/api/invite-staff");
      console.log("Staff list response:", response.data); // Debug
      if (response.data.success) {
        setStaffList(
          response.data.data.map((staff) => ({
            id: staff.id,
            employee: staff.staff_name || "Unknown",
            email: staff.staff_email || "",
            date:
              (staff.created_at
                ? new Date(staff.created_at * 1000).toLocaleDateString()
                : "N/A") || "N/A",
            status: staff.status || "active",
            statusColor:
              staff.status === "active" ? "text-green-500" : "text-red-500",
          }))
        );
      } else {
        setFetchError(response.data.message || "Failed to fetch staff list");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setFetchError(err.response?.data?.error || "Error fetching staff list");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // Fetch on mount and after invite
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/login");
    } else {
      fetchStaffList();
    }
  }, [router, fetchStaffList]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInviteError(""); // Clear invite error on input change
  };

  // Send Invite API Call
  const sendMail = async () => {
    setLoading(true);
    setInviteError("");
    try {
      const response = await axios.post("/api/invite-staff", formData);
      console.log("Invite response:", response.data); // Debug
      if (response.data.success) {
        setShowConfirmModal(true);
        setShowAddEmailModal(false);
        setFormData({ email: "", full_name: "", org_name: "" });
        // Refresh staff list
        await fetchStaffList();
      } else {
        setInviteError(
          response.data.body.message || "Failed to send invitation"
        );
      }
    } catch (err) {
      console.error("Invite error:", err);
      setInviteError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort staff list
  const filteredTemplates = useMemo(() => {
    const filtered = staffList.filter((template) =>
      template.employee.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Sort alphabetically by employee name
    return filtered.sort((a, b) =>
      a.employee.localeCompare(b.employee, undefined, { sensitivity: "base" })
    );
  }, [searchQuery, staffList]);

  const totalPages = Math.ceil(filteredTemplates.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="bg-default-50 min-h-screen p-4">
      {/* Header */}
      <div>
        <div className="flex justify-between">
          <div>
            <Navigation />
          </div>
          <div>
            <Button
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={() => setShowAddEmailModal(true)}
            >
              + Invite Staff
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">List of Staffs</h2>
          {fetchError && <p className="text-red-500">{fetchError}</p>}
          <Input
            isClearable
            placeholder="Search name..."
            startContent={<IoSearch />}
            className="bg-default-200 rounded-xl w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <Table aria-label="Staff Table" removeWrapper isStriped shadow="none">
          <TableHeader>
            <TableColumn className="bg-default-200">S/N</TableColumn>
            <TableColumn className="bg-default-200">Employee Names</TableColumn>
            <TableColumn className="bg-default-200">Email Address</TableColumn>
            <TableColumn className="bg-default-200">Date Added</TableColumn>
            <TableColumn className="bg-default-200">Status</TableColumn>
            <TableColumn className="bg-default-200"></TableColumn>
          </TableHeader>
          <TableBody
            isLoading={fetchLoading}
            loadingContent={<div>Loading staff...</div>}
            emptyContent={<div>No staff found.</div>}
          >
            {paginatedTemplates.map((template, index) => (
              <TableRow key={template.id} className="border-b relative">
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="border-x">{template.employee}</TableCell>
                <TableCell>{template.email}</TableCell>
                <TableCell>{template.date}</TableCell>
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
                      <div className="py-1">
                        <button
                          className="flex items-center gap-2 bg-gray-100 my-2 w-full rounded-lg px-4 py-2 hover:bg-gray-200"
                          onClick={() => {
                            router.push(`/staff/${template.id}`);
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
            Showing{" "}
            <span className="border px-3 py-1 mx-1">
              {Math.min(currentPage * rowsPerPage, filteredTemplates.length)}
            </span>{" "}
            of {filteredTemplates.length}
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

      <div>
        {/* Add Staff Details Pop-up */}
        <Modal
          isOpen={showAddEmailModal}
          onClose={() => {
            setShowAddEmailModal(false);
            setInviteError("");
          }}
          className="border-2 border-red-400"
        >
          <ModalContent>
            <ModalHeader>Send an Invitation Message to your Staff:</ModalHeader>
            <ModalBody>
              {inviteError && <p className="text-red-500">{inviteError}</p>}
              <div className="flex flex-wrap gap-2 mb-2">
                <form className="space-y-4 w-full">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Full Name"
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Organization Name"
                    type="text"
                    name="org_name"
                    value={formData.org_name}
                    onChange={handleChange}
                    required
                  />
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={sendMail} isDisabled={loading}>
                {loading ? "Sending..." : "Send Invitation"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
        >
          <ModalContent>
            <ModalHeader className="items-center justify-center mt-3">
              <img src="/icons/sent.svg" width={50} height={50} alt="" />
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <h4 className="text-2xl font-semibold mt-4">
                Message Sent Successfully!
              </h4>
              <p>
                Your Invitation Message has been successfully sent to the staff.
                They will receive an email with further instructions shortly.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  setShowConfirmModal(false);
                }}
                className="w-full"
              >
                Go Back
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Teams;
