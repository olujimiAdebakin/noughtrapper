'use client';

import { useStateContext } from '../../../../../providers/contextProvider';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowRight } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
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

export default function LocationContent() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
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
									User’s Address Information
								</h2>

								<div className=' h-[150px] flex flex-col gap-4  mt-10'>
									<span className='text-[#384554] text-[16px] font-medium'>
										Address
									</span>
									<div className='bg-[#FAFAFA] flex items-center p-[16px] h-10 gap-1 self-stretch rounded-md'>
										<IoLocationOutline />
										<h2 className='text-[#192027] text-[16px] font-medium '>
											2715 Lalubu street, Oke ilewo
											abeokuta
										</h2>
									</div>
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
