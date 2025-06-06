'use client';

import { useStateContext } from '../../providers/contextProvider';
import { useEffect } from 'react';
import { format } from 'date-fns';

export default function OverView() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();

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
		<div className='bg-white flex  w-full items-center justify-between px-4 py-4 rounded-lg mt-[16px]'>
			<h2 className='text-[#6B7280] text-[16px] font-semibold'>
				Overview
			</h2>
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
	);
}
