"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

// Document fields configuration
const documentFields = [
  {
    key: "certificateOfIncorporation",
    title: "Certificate of Incorporation",
    placeholderName: "Company.Certificate of Incorporation.pdf",
  },
  {
    key: "businessLicense",
    title: "Business License & Permits",
    placeholderName: "Business License & Permits.pdf",
  },
  {
    key: "memorandumOfUnderstanding",
    title: "Memorandum of Understanding (MoU)",
    placeholderName: "Memorandum of Understanding (MoU).pdf",
  },
  {
    key: "nonDisclosureAgreement",
    title: "Non-Disclosure Agreement (NDA)",
    placeholderName: "Non-Disclosure Agreement (NDA).pdf",
  },
  {
    key: "serviceLevelAgreement",
    title: "Service Level Agreement (SLA)",
    placeholderName: "Service Level Agreement (SLA).pdf",
  },
  {
    key: "governmentIssuedID",
    title: "Government-Issued ID of the Company Spokesperson",
    placeholderName: "Government-Issued ID of the Company Spokesperson.pdf",
  },
];

export default function Documents({ clientData, setActiveTab }) {
  console.log("Documents - clientData:", clientData);
  console.log("Documents - clientData.documents:", clientData?.documents);
  const initialPreviews = {
    certIncorporation: clientData?.documents.certificateOfIncorporation || null,
    businessLicense: clientData?.documents.businessLicense || null,
    mou: clientData?.documents.memorandumOfUnderstanding || null,
    nda: clientData?.documents.nonDisclosureAgreement || null,
    sla: clientData?.documents.serviceLevelAgreement || null,
    govId: clientData?.documents.governmentIssuedID || null,
  };

  const [previews, setPreviews] = useState(initialPreviews);
  const [files, setFiles] = useState({
    certificateOfIncorporation: null,
    businessLicense: null,
    memorandumOfUnderstanding: null,
    nonDisclosureAgreement: null,
    serviceLevelAgreement: null,
    governmentIssuedID: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  // Sync previews with clientData.documents when it changes
  useEffect(() => {
    setPreviews({
      certificateOfIncorporation:
        clientData?.documents?.certificateOfIncorporation || null,
      businessLicense: clientData?.documents?.businessLicense || null,
      memorandumOfUnderstanding:
        clientData?.documents?.memorandumOfUnderstanding || null,
      nonDisclosureAgreement:
        clientData?.documents?.nonDisclosureAgreement || null,
      serviceLevelAgreement:
        clientData?.documents?.serviceLevelAgreement || null,
      governmentIssuedID: clientData?.documents?.governmentIssuedID || null,
    });
  }, [clientData]);

  
  // Handle file upload
  const handleFileChange = (key) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 10 MB.");
        return;
      }
      if (previews[key] && !clientData?.companyDetails[key]) {
        URL.revokeObjectURL(previews[key]);
      }
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [key]: previewUrl }));
      setFiles((prev) => ({ ...prev, [key]: file }));
      setHasChanges(true);
    }
  };

  // Handle file deletion
  const handleFileDelete = (key) => () => {
    if (previews[key]) {
      if (!clientData?.documents[key]) {
        URL.revokeObjectURL(previews[key]); // Revoke only local previews
      }
      setPreviews((prev) => ({ ...prev, [key]: null }));
      setFiles((prev) => ({ ...prev, [key]: null }));
      setHasChanges(true);
      const input = document.getElementById(`fileInput${key}`);
      if (input) input.value = "";
    }
  };

  // Handle form submission with endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const hasFilesToUpload = Object.values(files).some((file) => file !== null);
    if (!hasChanges && !hasFilesToUpload) {
      toast.success("No changes to save. Moving to next tab.");
      setActiveTab("Staff Data"); // Next tab in ClientDetailsPage
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    // formData.append("companyId", clientData?.documents.companyId);
    formData.append("companyId", clientData?.companyDetails?.companyId);
    formData.append("step", "documents");

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      } else if (previews[key] === null && clientData?.documents[key]) {
        formData.append(key, "");
      }
    });

    try {
      const response = await fetch("/api/updateClientDetails", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        toast.success("Documents updated successfully!");
        setHasChanges(false);
        setActiveTab("Staff Data"); // Next tab in ClientDetailsPage
      } else {
        throw new Error("Update failed: No success response from API");
      }
    } catch (error) {
      console.error("Update error:", error.message, error.stack);
      toast.error(`Failed to update documents: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-[10px] gap-[32px]"
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h2 className="text-[#212B36] text-[16px] font-semibold">
            Company Information
          </h2>
          <span className="text-[#667E99] text-[13px] font-normal">
            Edit company documents as needed
          </span>
          <p className="w-full h-[1px] bg-[#C4CDD5]" />
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-5 w-full">
          {documentFields.map(({ key, title, placeholderName }) => (
            <div
              key={key}
              className="flex flex-col items-start gap-4 self-stretch"
            >
              <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-[14px] font-semibold">
                {title}
              </h2>
              <label
                htmlFor={`fileInput${key}`}
                className="border-1 border-[#E7E7E7] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
              >
                {previews[key] ? (
                  <div className="flex w-full h-[74px] p-4 flex-col items-start gap-2 rounded-xl bg-white border-1 border-[#E7E7E7]">
                    <div className="flex items-center gap-2 self-stretch">
                      <Image
                        src="/pdf.png"
                        width={36}
                        height={43}
                        alt="document logo"
                        className="aspect-square"
                      />
                      <div className="flex flex-col items-start gap-[2px] flex-1 flex-shrink-0">
                        <h3 className="text-[#0B0B0B] text-[13px] font-medium">
                         
                          {files[key]?.name ||
                            previews[key].split("/").pop() ||
                            placeholderName}
                        </h3>
                        <span className="text-[#6D6D6D] text-[13px] font-normal">
                          {files[key]
                            ? `${Math.round(files[key].size / 1024)}kb`
                            : clientData?.documents?.[key]
                            ? "Existing document"
                            : "2500kb (placeholder)"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleFileDelete(key)}
                        className="text-[#FD3842] text-[20px] hover:text-[#e0323a] transition-colors"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full h-[74px] p-4 flex-col items-start gap-2 rounded-xl bg-white border-1 border-[#E7E7E7]">
                    <div className="flex items-center gap-2 self-stretch">
                      <Image
                        src="/pdf.png"
                        width={36}
                        height={43}
                        alt="document logo"
                        className="aspect-square"
                      />
                      <div className="flex flex-col items-start gap-[2px] flex-1 flex-shrink-0">
                        <h3 className="text-[#0B0B0B] text-[13px] font-medium">
                          {placeholderName}
                        </h3>
                        <span className="text-[#6D6D6D] text-[13px] font-normal">
                          2500kb
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="text-[#FD3842] text-[20px] opacity-50 cursor-not-allowed"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleFileChange(key)}
                  className="hidden"
                  id={`fileInput${key}`}
                  accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </label>
            </div>
          ))}
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end items-center gap-3 self-stretch">
          <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
            <button
              type="button"
              className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] font-medium"
              onClick={() => setActiveTab("Company Details")}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] font-semibold ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
