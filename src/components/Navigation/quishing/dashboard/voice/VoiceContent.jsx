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

export default function VoiceContent() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
	const router = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isLooping, setIsLooping] = useState(false);
	const [volume, setVolume] = useState(75);
	const [barHeights, setBarHeights] = useState([]);

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
	useEffect(() => {
		const heights = Array.from(
			{ length: 40 },
			() => Math.floor(Math.random() * 24 + 4) // Random height between 4-28px
		);
		setBarHeights(heights);
	}, []); // Empty dependency array means this runs once on mount

	// Generate waveform bars using pre-computed heights
	const generateBars = () => {
		if (barHeights.length === 0) {
			// Return placeholder bars for server-side rendering
			return Array.from({ length: 40 }, (_, i) => (
				<div
					key={i}
					className='w-1 mx-px rounded-full bg-gray-300'
					style={{ height: '16px' }} // Default height for SSR
				/>
			));
		}

		return barHeights.map((height, i) => (
			<div
				key={i}
				className={`w-1 mx-px rounded-full transition-all duration-200 ${
					isPlaying ? 'bg-gray-700' : 'bg-gray-300'
				}`}
				style={{ height: `${height}px` }}
			/>
		));
	};

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
									User’s Voice Recorded
								</h2>

								<div className='mt-8 pb-10'>
									<span className='text-[#384554] text-[13px] font-medium self-stretch'>
										Voice Record
									</span>

									{/* voice player */}

									<div className='w-full max-w-2xl bg-gray-50 rounded-lg p-4 shadow-sm pb-6'>
										<div className='flex items-start gap-4'>
											{/* Primary Controls */}
											<div className='flex items-start gap-2'>
												{/* <button
            onClick={() => {}}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <SkipBack className="w-4 h-4 text-gray-600" />
          </button>
           */}
												<button
													onClick={() =>
														setIsPlaying(!isPlaying)
													}
													className='w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full transition-colors'
												>
													{isPlaying ? (
														<Pause className='w-4 h-4 text-white' />
													) : (
														<Play className='w-4 h-4 text-white ml-1' />
													)}
												</button>

												{/* <button
            onClick={() => {}}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <SkipForward className="w-4 h-4 text-gray-600" />
          </button> */}
											</div>

											{/* Time and Waveform Container */}
											<div className='flex-1'>
												{/* Waveform */}
												<div className='flex items-center h-8'>
													{generateBars()}
												</div>

												{/* Timer and Additional Controls */}
												{/* <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">1:00</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`p-1 rounded-full transition-colors ${
                  isLooping ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Repeat className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div> */}
											</div>

											{/* Volume Control */}
											<div className='flex items-center gap-2'>
												<button
													onClick={() =>
														setIsMuted(!isMuted)
													}
													className='p-2 hover:bg-gray-200 rounded-full transition-colors'
												>
													{isMuted ? (
														<VolumeXIcon className='w-5 h-5 text-gray-600' />
													) : (
														<Volume2 className='w-5 h-5 text-gray-600' />
													)}
												</button>
												<input
													type='range'
													min='0'
													max='100'
													value={volume}
													onChange={(e) =>
														setVolume(
															parseInt(
																e.target.value
															)
														)
													}
													className='w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full'
												/>
											</div>
										</div>
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
