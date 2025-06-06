'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';
import { BreadcrumbItem, Breadcrumbs, Input } from '@nextui-org/react';
import { IoCalendarClearOutline, IoSearch } from 'react-icons/io5';
import CopyButton from '../../../../../../components/reusable/CopyButton';
import { TfiEmail } from 'react-icons/tfi';
import { BsPerson } from 'react-icons/bs';
import { MdOutlinePhone } from 'react-icons/md';
import { BookCheckIcon } from 'lucide-react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import TrainingGrid from '../../../../../../components/Navigation/manage-clients/TrainingGrid';

export default function StaffDetails({ EmailAddress }) {
	const router = useRouter();
	// const trainings = [
	//   {
	//     name: "Phishing Awareness Training",
	//     score: 80,
	//     change: 5,
	//     date: "23/02/2025",
	//   },
	//   { name: "Cybersecurity Basics", score: 75, change: -2, date: "15/02/2025" },
	//   {
	//     name: "Data Privacy Essentials",
	//     score: 92,
	//     change: 8,
	//     date: "20/02/2025",
	//   },
	//   {
	//     name: "Network Security Protocols",
	//     score: 68,
	//     change: 3,
	//     date: "10/02/2025",
	//   },
	//   {
	//     name: "Social Engineering Defense",
	//     score: 85,
	//     change: 6,
	//     date: "25/02/2025",
	//   },
	//   {
	//     name: "Cloud Security Training",
	//     score: 77,
	//     change: -4,
	//     date: "18/02/2025",
	//   },
	//   {
	//     name: "Incident Response Basics",
	//     score: 88,
	//     change: 7,
	//     date: "22/02/2025",
	//   },
	//   {
	//     name: "Password Management Skills",
	//     score: 73,
	//     change: 2,
	//     date: "12/02/2025",
	//   },
	//   {
	//     name: "Malware Prevention Course",
	//     score: 90,
	//     change: 9,
	//     date: "26/02/2025",
	//   },
	//   {
	//     name: "Email Security Best Practices",
	//     score: 82,
	//     change: -1,
	//     date: "14/02/2025",
	//   },
	//   {
	//     name: "Firewall Configuration Training",
	//     score: 79,
	//     change: 4,
	//     date: "19/02/2025",
	//   },
	//   { name: "Ransomware Awareness", score: 86, change: 5, date: "21/02/2025" },
	//   {
	//     name: "Secure Coding Fundamentals",
	//     score: 65,
	//     change: -3,
	//     date: "08/02/2025",
	//   },
	//   { name: "VPN Usage and Safety", score: 83, change: 6, date: "24/02/2025" },
	//   {
	//     name: "Mobile Device Security",
	//     score: 78,
	//     change: 1,
	//     date: "17/02/2025",
	//   },
	//   {
	//     name: "Insider Threat Awareness",
	//     score: 91,
	//     change: 10,
	//     date: "27/02/2025",
	//   },
	//   {
	//     name: "Encryption Essentials",
	//     score: 74,
	//     change: -2,
	//     date: "13/02/2025",
	//   },
	//   {
	//     name: "Physical Security Training",
	//     score: 87,
	//     change: 7,
	//     date: "16/02/2025",
	//   },
	//   {
	//     name: "DDoS Attack Prevention",
	//     score: 70,
	//     change: 3,
	//     date: "11/02/2025",
	//   },
	//   {
	//     name: "Compliance and Regulation",
	//     score: 89,
	//     change: 8,
	//     date: "22/02/2025",
	//   },
	//   { name: "API Security Basics", score: 76, change: -5, date: "09/02/2025" },
	//   {
	//     name: "Penetration Testing Intro",
	//     score: 84,
	//     change: 4,
	//     date: "20/02/2025",
	//   },
	//   { name: "Remote Work Security", score: 81, change: 6, date: "25/02/2025" },
	//   { name: "IoT Device Safety", score: 67, change: -1, date: "07/02/2025" },
	//   {
	//     name: "Advanced Threat Detection",
	//     score: 93,
	//     change: 9,
	//     date: "26/02/2025",
	//   },
	// ];
	// unwrapping of params
	//   const params = React.use(paramsPromise)
	// const { clientName, staffName } = useParams();
	const { clientName, staffName } = [];

	const decodedStaffName = staffName
		? decodeURIComponent(staffName).replace(/-/g, ' ')
		: '';
	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';

	return (
		<>
			<div className='pt-[24px] pb-2 px-[16px] bg-[#F9FBFD] h-screen'>
				<div className='flex flex-col mb-4'>
					<div className='pt-[24px] mb-4'>
						<div className='flex items-center gap-2'>
							<div
								className='bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg cursor-pointer'
								// onClick={() =>
								//   router.push(
								//     `/manage-clients/clients/${clientName}`
								//   )
								// }
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
							href='/manage-clients'
							className='text-red-500 font-semibold'
						>
							Manage Clients
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold text-default-200'>
							<span className='text-[#667085] text-[13px] font-medium'>
								{decodedClientName}
							</span>
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold text-default-200'>
							<span className='text-[#667085] text-[13px] font-medium'>
								{decodedStaffName}
							</span>
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>

				<div className='bg-white flex h-[711px] flex-col items-start flex-shrink-0 self-stretch rounded-xl py-3 px-4'>
					<div className='flex h-[60px] p-4 justify-between items-center flex-shrink-0 self-stretch'>
						<h2 className='text-[#4E4E4E] text-[16px] font-medium'>
							Employee Details
						</h2>

						<Input
							isClearable
							placeholder='Search or type'
							startContent={<IoSearch />}
							className='bg-[#F0F2F5] flex rounded-xl w-1/4'
						/>
					</div>

					<div className='flex items-start gap-7 self-stretch'>
						<div className='flex w-[460px] flex-col items-start gap-4 self-stretch'>
							<div className='flex py-[14px] px-[24px] gap-[24px] self-stretch border-b-2 border-[#F7F9FC]'>
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Overall Percentage Score
									</h2>
									<span className='text-[#28A745] text-[14px] font-medium'>
										85%
									</span>
								</div>
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<TfiEmail className='fill-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Emails
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										AdekunleAdebayo@gmail.com
									</span>
								</div>
								<CopyButton />
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<BsPerson className='fill-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										First Name
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										Adekunle
									</span>
								</div>
								<CopyButton />
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<BsPerson className='fill-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Second Name
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										Adebayo
									</span>
								</div>
								<CopyButton />
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<MdOutlinePhone className='fill-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Phone Number
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										0803 456 7890
									</span>
								</div>
								<CopyButton />
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<IoCalendarClearOutline className='fill-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Date Created
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										Friday, Sep 25, 2025
									</span>
								</div>
							</div>

							<div className='flex items-center gap-[24px] self-stretch py-[14px] px-[24px] border-b-2 border-[#F7F9FC]'>
								<BookCheckIcon className='text-[#667185]' />
								<div className='flex flex-col items-start gap-1 flex-1 flex-shrink-0'>
									<h2 className='text-[#667185] text-[12px] font-normal'>
										Exam Taken
									</h2>
									<span className='text-[#101928] text-[14px] font-medium'>
										50
									</span>
								</div>
							</div>
						</div>

						<div className='flex h-[636px] flex-col items-start gap-4 flex-1 flex-shrink-0 '>
							<TrainingGrid />
							{/* <div className="grid grid-cols-3 gap-3">
                  trainings.map((training, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-[10px] flex-1 flex-shrink-0 self-stretch p-4 rounded-xl border-1 border-[#F5F6F7] bg-white"
                  >
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <h2>{training.name}</h2>
                      <div className="flex-flex-col items-start gap-2">
                        <span className="text-[#667185] font-medium text-[16px]">
                          Score
                        </span>
                        <div className="flex items-center gap-[10px]">
                          <span>{training.score}</span>
                          <div
                            className={`flex py-0 px-1 rounded-xl items-center justify-center ${
                              training.change >= 0
                                ? "bg-[#E7F6EC]"
                                : "bg-[#FFE6E6]"
                            }`}
                          >
                            <FaLongArrowAltUp
                              className={`w-3 h-3 ${
                                training.change >= 0
                                  ? "text-[#036B26]"
                                  : "text-[#B00020]"
                              }`}
                            />
                            <span
                              className={`text-center text-[12px] font-medium ${
                                training.change >= 0
                                  ? "text-[#036B26]"
                                  : "text-[#B00020]"
                              }`}
                            >
                              {training.change >= 0
                                ? ` +${training.change}%`
                                : ` ${training.change}%`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <small className="text-[#667185] text-[10px] font-normal">
                        {training.date}
                      </small>
                    </div>
                  </div>
                  ));
                </div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
