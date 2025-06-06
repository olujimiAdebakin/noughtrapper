import { useStateContext } from '../../../../../providers/contextProvider';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowRight } from 'react-icons/md';
import VoiceCard from './VoiceCard';
import VoiceThreeCard from './VoiceThreeCard';
import VoiceTable from './VoiceTable';
import VoiceTableHeader from './VoiceTableHeader';
// import VoiceCard from "./VoiceCard";

export default function VoiceDashBoard() {
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
				<div className='pt-[24px] px-[16px]'>
					<div className='flex items-center gap-2'>
						<div
							className='bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg'
							onClick={() => router.push('/quishing')}
						>
							<MdOutlineArrowBackIosNew />
						</div>
						<span className='text-[#384554] font-semibold text-[18px]'>
							Back
						</span>
					</div>
					<div className='inline-flex items-center gap-[8px] mt-5'>
						<span className='text-[#FD3842] text-[13px] font-normal'>
							QRishing
						</span>
						<MdOutlineArrowRight
							color='grey'
							fontSize={16}
							height={16}
							width={16}
						/>
						<span className='text-[#667085] text-[13px] font-normal tracking-[0.25px] leading-6'>
							Voice Activation
						</span>
					</div>
					<div className='bg-white flex items-center justify-between px-4 py-4 rounded-lg mt-[16px]'>
						<span className='text-[#6B7280] text-[16px] font-medium'>
							Voice Activation Summary
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
					<div className='mt-[16px]'>
						<VoiceCard />
					</div>
					<div className='mt-[16px]'>{/* <VoiceThreeCard/> */}</div>
					<div className='mt-[16px]'>
						<VoiceTableHeader />
						<VoiceTable />
					</div>
				</div>
			</div>
		</>
	);
}
