// "use client"

// import { IoIosArrowBack } from "react-icons/io";
// import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
// import { IoMdArrowDropright } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import CompanyDetails from "@/components/Navigation/manage-clients/CompanyDetails";
// import Staffs from "@/components/Navigation/manage-clients/Staffs";
// import Document from "@/components/Navigation/manage-clients/Document";
// import AccountSettings from "@/components/Navigation/manage-clients/AccountSettings";
// import Image from "next/image";
// import { CgFileDocument } from "react-icons/cg";
// import { CiLock } from "react-icons/ci";
// import { MdOutlineArrowBackIosNew } from "react-icons/md";
// export default function page({ initialData }) {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("CompanyDetails");
//   const [companyId, setCompanyId] = useState(null);

//   // Callback to switch to the next tab
//   const handleNextTab = () => {
//     const tabOrder = [
//       "CompanyDetails",
//       "Document",
//       "Staffs",
//       "AccountSettings",
//     ];
//     const currentIndex = tabOrder.indexOf(activeTab);
//     if (currentIndex < tabOrder.length - 1) {
//       setActiveTab(tabOrder[currentIndex + 1]); // Move to the next tab
//     }
//   };

//   // Navigate to the previous tab
//   const handlePrevTab = () => {
//     const currentIndex = tabOrder.indexOf(activeTab);
//     if (currentIndex > 0) {
//       setActiveTab(tabOrder[currentIndex - 1]);
//     } else {
//       //  Navigate back to a previous page if at the first tab
//       router.push("/manage-clients");
//     }
//   };

//   // Callback to set companyId from CompanyDetails
//   const handleCompanyIdSet = (id) => {
//     setCompanyId(id);
//   };

//   return (
//     <>
//       <div className="pt-[24px] px-[16px] bg-[#F9FBFD] h-screen">
//         <div>
//           <div className="pt-[24px] mb-3">
//             <div className="flex items-center gap-2">
//               <div
//                 className="bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg"
//                 onClick={() => router.push("/manage-clients")}
//               >
//                 <MdOutlineArrowBackIosNew />
//               </div>
//               <span className="text-[#384554] font-semibold text-[18px]">
//                 Back
//               </span>
//             </div>
//           </div>

//           <Breadcrumbs
//             itemClasses={{ separator: "px-2" }}
//             separator={
//               <IoMdArrowDropright className="text-default-500 hover:bg-none" />
//             }
//           >
//             <BreadcrumbItem
//               href="/platform"
//               className="text-red-500 font-semibold"
//             >
//               Manage Clients
//             </BreadcrumbItem>
//             <BreadcrumbItem className="font-semibold text-default-200">
//               <span className="text-[#667085] text-[13px] font-medium">
//                 Create Client
//               </span>
//             </BreadcrumbItem>
//           </Breadcrumbs>

//           {/* Conditional Rendering */}
//           {/* {activeTab === 'ManageTemplate' ? <ManageTemplate /> : <UsersTable />} */}
//         </div>
//         <div>
//           <div className="flex gap-6 w-[1152px] h-[40px] items-center mt-[24px]">
//             <button
//               className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
//                 activeTab === "CompanyDetails"
//                   ? "border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]"
//                   : "text-[#98A9BB] text-[13px] font-medium"
//               }`}
//               onClick={() => setActiveTab("CompanyDetails")}
//             >
//               <Image
//                 src="/business.png"
//                 width={20}
//                 height={20}
//                 alt="company"
//                 className="aspect-square"
//               />
//               Company Details
//             </button>
//             <button
//               className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
//                 activeTab === "Document"
//                   ? "border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]"
//                   : "text-[#98A9BB] text-[13px] font-medium"
//               }`}
//               onClick={() => setActiveTab("Document")}
//             >
//               <CgFileDocument className="fill-[#98A9BB] w-[20px] h-[20px]" />
//               Documents
//             </button>
//             <button
//               className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
//                 activeTab === "Staffs"
//                   ? "border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]"
//                   : "text-[#98A9BB] text-[13px] font-medium"
//               }`}
//               onClick={() => setActiveTab("Staffs")}
//             >
//               <Image
//                 src="/staff.png"
//                 width={20}
//                 height={20}
//                 alt="Staff"
//                 className="aspect-square"
//               />
//               Staffs
//             </button>
//             <button
//               className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
//                 activeTab === "AccountSettings"
//                   ? "border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]"
//                   : "text-[#98A9BB] text-[13px] font-medium"
//               }`}
//               onClick={() => setActiveTab("AccountSettings")}
//             >
//               <CiLock className="fill-[#98A9BB] w-[20px] h-[20px]" />
//               Account Settings
//             </button>
//           </div>

//           {/* Conditional Rendering */}
//           {activeTab === "CompanyDetails" ? (
//             <CompanyDetails
//               onNext={handleNextTab}
//               initialData={initialData}
//               onCompanyIdSet={handleCompanyIdSet}
//             />
//           ) : activeTab === "Document" ? (
//             <Document
//               onNext={handleNextTab}
//               onPrev={handlePrevTab}
//               initialData={initialData}
//               companyId={companyId}
//             />
//           ) : activeTab === "Staffs" ? (
//             <Staffs
//               onNext={handleNextTab}
//               onPrev={handlePrevTab}
//               initialData={initialData}
//               companyId={companyId}
//             />
//           ) : activeTab === "AccountSettings" ? (
//             <AccountSettings
//               onPrev={handlePrevTab}
//               initialData={initialData}
//               companyId={companyId}
//             />
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import { IoIosArrowBack } from 'react-icons/io';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CompanyDetails from '../../../../components/Navigation/manage-clients/CompanyDetails';
import Staffs from '../../../../components/Navigation/manage-clients/Staffs';
import Document from '../../../../components/Navigation/manage-clients/Document';
import AccountSettings from '../../../../components/Navigation/manage-clients/AccountSettings';
import Image from 'next/image';
import { CgFileDocument } from 'react-icons/cg';
import { CiLock } from 'react-icons/ci';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

export default function Page() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('CompanyDetails');
	const [companyId, setCompanyId] = useState(null); // Store companyId from API

	// Callback to handle successful submission from child components
	const handleSubmissionSuccess = (newCompanyId, nextTab) => {
		if (newCompanyId) setCompanyId(newCompanyId); // Set companyId from first step
		setActiveTab(nextTab); // Move to the next tab
	};

	return (
		<>
			<div className='pt-[24px] px-[16px] bg-[#F9FBFD] h-screen'>
				<div>
					<div className='pt-[24px] mb-3'>
						<div className='flex items-center gap-2'>
							<div
								className='bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg cursor-pointer'
								onClick={() => router.back()}
							>
								<MdOutlineArrowBackIosNew />
							</div>
							<span className='text-[#384554] font-semibold text-[18px]'>
								Back
							</span>
						</div>
					</div>

					<Breadcrumbs
						itemClasses={{ separator: 'px-2' }}
						separator={
							<IoMdArrowDropright className='text-default-500' />
						}
					>
						<BreadcrumbItem
							href='/platform'
							className='text-red-500 font-semibold'
						>
							Manage Clients
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold text-default-200'>
							<span className='text-[#667085] text-[13px] font-medium'>
								Create Client
							</span>
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>

				<div>
					<div className='flex gap-6 w-[1152px] h-[40px] items-center mt-[24px]'>
						<button
							className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
								activeTab === 'CompanyDetails'
									? 'border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]'
									: 'text-[#98A9BB] text-[13px] font-medium'
							}`}
							onClick={() => setActiveTab('CompanyDetails')}
						>
							<Image
								src='/business.png'
								width={20}
								height={20}
								alt='company'
								className='aspect-square'
							/>
							Company Details
						</button>
						<button
							className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
								activeTab === 'Document'
									? 'border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]'
									: 'text-[#98A9BB] text-[13px] font-medium'
							} ${
								!companyId
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
							onClick={() =>
								companyId && setActiveTab('Document')
							}
							disabled={!companyId}
						>
							<CgFileDocument className='fill-[#98A9BB] w-[20px] h-[20px]' />
							Documents
						</button>
						<button
							className={`px-[8px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
								activeTab === 'Staffs'
									? 'border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]'
									: 'text-[#98A9BB] text-[13px] font-medium'
							} ${
								!companyId
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
							onClick={() => companyId && setActiveTab('Staffs')}
							disabled={!companyId}
						>
							<Image
								src='/staff.png'
								width={20}
								height={20}
								alt='Staff'
								className='aspect-square'
							/>
							Staffs
						</button>
						<button
							className={`px-[16px] items-center flex py-[6px] gap-2 justify-center rounded-[4px] ${
								activeTab === 'AccountSettings'
									? 'border-b-2 border-[#192027] font-bold text-[#192027] text-[13px]'
									: 'text-[#98A9BB] text-[13px] font-medium'
							} ${
								!companyId
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
							onClick={() =>
								companyId && setActiveTab('AccountSettings')
							}
							disabled={!companyId}
						>
							<CiLock className='fill-[#98A9BB] w-[20px] h-[20px]' />
							Account Settings
						</button>
					</div>

					{/* Conditional Rendering with Props */}
					{activeTab === 'CompanyDetails' && (
						<CompanyDetails onSuccess={handleSubmissionSuccess} />
					)}
					{activeTab === 'Document' && (
						<Document
							companyId={companyId}
							onSuccess={handleSubmissionSuccess}
						/>
					)}
					{activeTab === 'Staffs' && (
						<Staffs
							companyId={companyId}
							onSuccess={handleSubmissionSuccess}
						/>
					)}
					{activeTab === 'AccountSettings' && (
						<AccountSettings
							companyId={companyId}
							onSuccess={handleSubmissionSuccess}
						/>
					)}
				</div>
			</div>
		</>
	);
}
