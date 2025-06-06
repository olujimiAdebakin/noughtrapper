'use client';

import StaffsTable from './StaffsTable';
import { useStateContext } from '../../../providers/contextProvider';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowRight } from 'react-icons/md';

export default function StaffData({ clientData }) {
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

	const staffList = clientData?.staff || [];
	console.log('StaffData - clientData:', clientData);
	console.log('StaffData - staffList:', staffList);

	//   const params = React.use(paramsPromise)
	const { clientName, staffName } = useParams();

	const decodedStaffName = staffName
		? decodeURIComponent(staffName).replace(/-/g, ' ')
		: '';
	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';

	//  placeholder
	const examsConducted = 10;
	const campaignTypeCount = 100;
	const totalEmailsSent = 100;
	const totalClickedLinks = 100;
	const totalEmailsOpened = 100;
	return (
		<>
			<div className='flex flex-col gap-4'>
				<div className='bg-white flex items-center justify-between px-4 py-4 rounded-lg mt-[16px]'>
					<span className='text-[#6B7280] text-[16px] font-medium'>
						{decodedStaffName}
						{decodedClientName}
					</span>
					{currentDateTime ? (
						<div className='flex items-center gap-4'>
							{/* Date */}
							<span className='text-[#667E99] text-[16px] font-normal'>
								<strong className='text-[#667E99]'>
									{currentDateTime.date.split(',')[0]}
								</strong>
								, {currentDateTime.date.split(',')[1]}
							</span>

							{/* Time */}
							<span className='text-[#667E99] text-[16px] font-normal'>
								{currentDateTime.time}
							</span>
						</div>
					) : (
						<span className='text-[#667E99] text-[16px] font-medium'>
							Loading...
						</span>
					)}
				</div>

				<div className='flex items-center gap-4 self-stretch'>
					<div className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'>
						<h3
							className='text-[#4E4E4E] text-[16px] font-medium
                '
						>
							Exams conducted
						</h3>
						<span className='text-[#0096d6] text-[18px] font-semibold'>
							{' '}
							{examsConducted}
						</span>
					</div>
					<div className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'>
						<h3
							className='text-[#4E4E4E] text-[16px] font-medium
                '
						>
							Campaign Type
						</h3>
						<span className='text-[#28A745] text-[18px] font-semibold'>
							{campaignTypeCount}
						</span>
					</div>
					<div className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'>
						<h3
							className='text-[#4E4E4E] text-[16px] font-medium
                '
						>
							Total E-mails Sent
						</h3>
						<span className='text-[#FFC107] text-[18px] font-semibold'>
							{totalEmailsSent}
						</span>
					</div>
					<div className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'>
						<h3
							className='text-[#4E4E4E] text-[16px] font-medium
                '
						>
							Total E-mail Opened
						</h3>
						<span className='text-[#FFC107] text-[18px] font-semibold'>
							{totalEmailsOpened}
						</span>
					</div>
					<div className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'>
						<h3
							className='text-[#4E4E4E] text-[16px] font-medium
                '
						>
							Total Clicked Links
						</h3>
						<span className='text-[#DC3545] text-[18px] font-semibold'>
							{totalClickedLinks}
						</span>
					</div>
				</div>

				<StaffsTable clientName={clientName} staffData={staffList} />
			</div>
		</>
	);
}
