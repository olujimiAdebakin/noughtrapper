'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Image from 'next/image';
import { CgFileDocument } from 'react-icons/cg';
import { CiLock } from 'react-icons/ci';
// import ClientDetailsFetcher from "@/components/Navigation/manage-clients/ClientDetailsFetcher";
import ClientOverview from "../../../../../components/Navigation/manage-clients/ClientOverview";
import ExamRecords from "../../../../../components/Navigation/manage-clients/ExamRecords";
import ClientCampaign from "../../../../../components/Navigation/manage-clients/ClientCampaign";
import ClientCompanyDetails from "../../../../../components/Navigation/manage-clients/ClientCompanyDetails";
import Documents from "../../../../../components/Navigation/manage-clients/Documents";
import StaffData from "../../../../../components/Navigation/manage-clients/StaffData";

// import ClientDetails from "@/components/Navigation/manage-clients/clientDetails";

import ClientDetails from "../../../../../components/Navigation/manage-clients/ClientDetails";
import ClientAccountSettings from '../../../../../components/Navigation/manage-clients/ClientAccountSettings';

export default function ClientDetailsPage({ params }) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('Overview');

	// Unwrap the params promise
	// const unwrappedParams = use(params);
	// const { clientName } = params;
	const { clientName } = use(params);

	return (
    <ClientDetails clientName={clientName}>
      {(clientData) => (
        <div className="pt-[24px] pb-2 px-[16px] bg-[#F9FBFD] h-screen">
          <div>
            <div className="pt-[24px] mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg cursor-pointer"
                  onClick={() => router.push("/manage-clients")}
                >
                  <MdOutlineArrowBackIosNew />
                </div>
                <span className="text-[#384554] font-semibold text-[18px]">
                  Back
                </span>
              </div>
            </div>

            <Breadcrumbs
              itemClasses={{ separator: "px-2" }}
              separator={<IoMdArrowDropright className="text-default-500" />}
            >
              <BreadcrumbItem
                href="/manage-clients"
                className="text-red-500 font-semibold"
              >
                Manage Clients
              </BreadcrumbItem>
              <BreadcrumbItem className="font-semibold text-default-200">
                <span className="text-[#667085] text-[13px] font-medium">
                  {decodeURIComponent(clientName.replace(/-/g, " "))}
                </span>
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div>
            <div className="flex gap-6 w-[1152px] h-[40px] items-center mt-[24px]">
              <button
                className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Overview"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Overview")}
              >
                <Image
                  src="/overview.png"
                  width={20}
                  height={20}
                  alt="overview"
                  className="aspect-square"
                />
                Overview
              </button>
              <button
                className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Exam Records"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Exam Records")}
              >
                <Image
                  src="/education-exam.png"
                  width={20}
                  height={20}
                  alt="exam records"
                  className="aspect-square"
                />
                Exam Records
              </button>
              <button
                className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Client Campaign"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Client Campaign")}
              >
                <Image
                  src="/education-exam.png"
                  width={20}
                  height={20}
                  alt="Client Campaign"
                  className="aspect-square"
                />
                Campaign
              </button>
              <button
                className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Company Details"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Company Details")}
              >
                <Image
                  src="/business.png"
                  width={20}
                  height={20}
                  alt="company details"
                  className="aspect-square"
                />
                Company Details
              </button>
              <button
                className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Client Document"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Documents")}
              >
                <CgFileDocument className="fill-[#98A9BB] w-[20px] h-[20px]" />
                Documents
              </button>
              <button
                className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "Staff Data"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("Staff Data")}
              >
                <Image
                  src="/staff.png"
                  width={20}
                  height={20}
                  alt="staff data"
                  className="aspect-square"
                />
                Staffs
              </button>
              <button
                className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
                  activeTab === "AccountSettings"
                    ? "border-b-2 border-[#192027] bg-[#f0f0f0] font-bold text-[#192027] text-[13px]"
                    : "text-[#98A9BB] text-[13px] font-medium"
                }`}
                onClick={() => setActiveTab("AccountSettings")}
              >
                <CiLock className="fill-[#98A9BB] w-[20px] h-[20px]" />
                Account Settings
              </button>
            </div>

            {activeTab === "Overview" ? (
              <ClientOverview
                clientData={clientData}
                setActiveTab={setActiveTab}
              />
            ) : activeTab === "Exam Records" ? (
              <ExamRecords clientData={clientData} />
            ) : activeTab === "Client Campaign" ? (
              <ClientCampaign clientData={clientData} />
            ) : activeTab === "Company Details" ? (
              <ClientCompanyDetails clientData={clientData} />
            ) : activeTab === "Documents" ? (
              <Documents clientData={clientData} setActiveTab={setActiveTab} />
            ) : activeTab === "Staff Data" ? (
              <StaffData clientData={clientData} />
            ) : activeTab === "AccountSettings" ? (
              <ClientAccountSettings clientData={clientData} />
            ) : null}
          </div>
        </div>
      )}
    </ClientDetails>
  );
}
