'use client';

import { useStateContext } from '../../../../../providers/contextProvider';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowRight } from 'react-icons/md';
import {
	Play,
	Pause,
	Volume2,
	VolumeX,
	SkipBack,
	SkipForward,
	Repeat,
	Share2,
	Download,
	VolumeXIcon,
} from 'lucide-react';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';

export default function CameraContent() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	// functionality for time & date
	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date();
			const formattedDate = format(now, 'EEEE, MMM d yyyy');
			const formattedTime = format(now, 'HH:mm:ss a');
			setCurrentDateTime({ date: formattedDate, time: formattedTime });
		};

		updateDateTime();
		const interval = setInterval(updateDateTime, 1000);

		return () => clearInterval(interval);
	}, [setCurrentDateTime]);
	return (
		<>
			<div className='bg-[#F9FBFD] min-h-screen px-4'>
				<div className='pt-6 px-4'>
					{/* Back Navigation */}
					<div className='flex items-center gap-2'>
						<div
							className='bg-[#E6E8EB] h-10 px-4 inline-flex items-center gap-2 rounded-lg cursor-pointer'
							onClick={() => router.back()}
						>
							<MdOutlineArrowBackIosNew size={20} />
						</div>
						<span className='text-[#384554] font-semibold text-lg'>
							Back
						</span>
					</div>

					{/* Breadcrumbs */}
					<div className='flex items-center gap-2 mt-5'>
						<span className='text-[#FD3842] text-sm'>QRishing</span>
						<MdOutlineArrowRight color='grey' size={16} />
						<span className='text-[#667085] text-sm'>
							Voice Activation
						</span>
						<MdOutlineArrowRight color='grey' size={16} />
						<span className='text-[#667085] text-sm'>
							Voice Activation Details
						</span>
					</div>

					{/* Information Table  */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-5'>
						{/* Users Information  */}
						<div className='bg-white rounded-lg lg:p-10 shadow-sm flex flex-col gap-4'>
							{/* Replace this comment with your users information content */}
							<h2 className='text-[16px] font-semibold text-[#384554] items-stretch border-b-1 border-gray-200 pb-3'>
								Users Information
							</h2>

							<div className='grid grid-cols-2 gap-5 mt-8 '>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										User ID
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										NOU-00101
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										IP Address
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										192.168.1.100
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										IP Type
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										IPv4
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										User OS
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										WINDOWS 11
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										Browser Name
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										Google Chrome 120.0
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										CPU Name
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										Undefined
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										Browser Version
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										Version-16.6
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										Language
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										En-English
									</h2>
								</div>

								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										City
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										Abeokuta
									</h2>
								</div>
								<div className='flex flex-col items-start gap-2 flex-1'>
									<span className='text-[#384554] text-xs font-medium'>
										Country
									</span>
									<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										Nigeria
									</h2>
								</div>
							</div>
						</div>

						{/* Right Column with Two Stacked Cards */}
						<div className='flex flex-col gap-4'>
							{/* voice record */}
							<div className='bg-white rounded-lg p-4 shadow-sm flex flex-col gap-4 '>
								<h2 className='text-[16px] font-semibold text-[#384554] items-stretch border-b-1 border-gray-200 pb-3'>
									User’s Captured Visual
								</h2>

								<div className='flex flex-col gap-4'>
									<div className='flex flex-col items-start gap-5'>
										<h2 className='text-[#384554] text-[16px] font-medium'>
											Picture Captured
										</h2>
										<Image
											src='https://i.pravatar.cc/150?u=a04258114e29026302d'
											width={100}
											height={100}
											className='w-[100px] h-[100px] rounded-full'
											alt='Captured'
										/>
									</div>

									{/* Preview Button */}
									<button
										onClick={() => setShowModal(true)}
										className='flex items-center w-[200px] gap-4 justify-center py-2 px-6 rounded-md border border-[#DC3545] text-[#FD3842] text-[16px] font-medium'
									>
										Preview
									</button>
									{/* Modal */}
									{showModal && (
										<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
											<div className='bg-white rounded-lg shadow-lg p-8 h-[507px] w-[510px] text-center relative'>
												<div className='bg-[#F8F9FA] w-[430px] h-[400px] py-[24px] px-[20px] flex flex-col justify-center items-center mt-[30px] gap-2 rounded-xl shadow-md'>
													<button
														onClick={() =>
															setShowModal(false)
														}
														className='absolute top-2 right-2 text-[#4F4F4F] fill-[#4F4F4F] hover:text-gray-800 bg-[#E5E5E5] rounded-[29px] p-[4px] items-center h-[24px] w-[24px] flex justify-center '
													>
														✕
													</button>
													<h2 className='text-lg font-semibold mb-4'>
														Picture Captured
													</h2>
													<Image
														src='https://i.pravatar.cc/150?u=a04258114e29026302d'
														width={250}
														height={250}
														className='w-[250px] h-[250px] rounded-full mx-auto'
														alt='Captured'
													/>
													<button
														onClick={() =>
															setShowModal(false)
														}
														className='mt-4 px-4 py-2 border border-[#001A38] text-gray-700 w-[258px] h-[48px] justify-center items-center gap-2 rounded'
													>
														Close
													</button>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* location card */}
							<div className='bg-white rounded-lg p-4 shadow-sm flex flex-col gap-4'>
								<h2 className='text-[16px] font-semibold text-[#384554] items-stretch border-b-1 border-gray-200 pb-3'>
									User’s Geo-Location Information
								</h2>

								<div className='flex flex-col gap-8 pt-10 item-start'>
									<div className='flex flex-col items-start gap-2 '>
										<span className='text-[#384554] text-xs font-medium'>
											Location
										</span>
										<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
											6.5244° N
										</h2>
									</div>
									<div className='flex flex-col items-start gap-2 '>
										<span className='text-[#384554] text-xs font-medium'>
											Timestamp
										</span>
										<h2 className='text-[#192027] text-[16px] font-medium bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
											NOU-00101
										</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
