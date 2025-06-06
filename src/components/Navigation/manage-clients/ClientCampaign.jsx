'use client';

import { Tabs, Tab, Card, CardBody, Image } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStateContext } from '../../../providers/contextProvider';
import { format } from 'date-fns';
import ExamsTable from './ExamsTable';
import Calendar from '../../reusable/Calendar';
import CampaignTable from './CampaignTable';
// import Calendar from ".../components/reusable/Calendar";
// import Calendar from "../reusable/Calendar";

export default function ClientCampaign() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
	const router = useRouter();
	const { clientName } = useParams();
	const [selectedTab, setSelectedTab] = useState('today');

	console.log('clientName in ClientCampaign:', clientName);

	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';

	// Functionality for time & date
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

	// Campaign data by tab (placeholder values)
	const campaignDataByTab = {
		today: [
			{ title: 'Total Campaign Type', number: '0', percentage: '+0%' },
			{ title: 'Total Campaign Created', number: '0', percentage: '+0%' },
			{ title: 'Total Active Campaign', number: '0', percentage: '+0%' },
		],
		last24hrs: [
			{ title: 'Total Campaign Type', number: '1', percentage: '+5%' },
			{
				title: 'Total Campaign Created',
				number: '2',
				percentage: '+10%',
			},
			{ title: 'Total Active Campaign', number: '1', percentage: '+5%' },
		],
		last7days: [
			{ title: 'Total Campaign Type', number: '3', percentage: '+15%' },
			{
				title: 'Total Campaign Created',
				number: '5',
				percentage: '+20%',
			},
			{ title: 'Total Active Campaign', number: '2', percentage: '+10%' },
		],
		last30days: [
			{ title: 'Total Campaign Type', number: '5', percentage: '+25%' },
			{
				title: 'Total Campaign Created',
				number: '10',
				percentage: '+30%',
			},
			{ title: 'Total Active Campaign', number: '4', percentage: '+20%' },
		],
		last12months: [
			{ title: 'Total Campaign Type', number: '10', percentage: '+50%' },
			{
				title: 'Total Campaign Created',
				number: '20',
				percentage: '+60%',
			},
			{ title: 'Total Active Campaign', number: '8', percentage: '+40%' },
		],
		alltime: [
			{ title: 'Total Campaign Type', number: '15', percentage: '+75%' },
			{
				title: 'Total Campaign Created',
				number: '30',
				percentage: '+90%',
			},
			{
				title: 'Total Active Campaign',
				number: '12',
				percentage: '+60%',
			},
		],
	};

	const list = campaignDataByTab[selectedTab] || [];

	return (
		<div className='flex flex-col gap-4'>
			{/* Header with Client Name and Date/Time */}
			<div className='bg-white flex items-center justify-between px-4 py-4 rounded-lg mt-[16px]'>
				<span className='text-[#6B7280] text-[16px] font-medium'>
					{decodedClientName}
				</span>
				{currentDateTime ? (
					<div className='flex items-center gap-4'>
						<span className='text-[#667E99] text-[16px] font-normal'>
							<strong className='text-[#667E99]'>
								{currentDateTime.date.split(',')[0]}
							</strong>
							, {currentDateTime.date.split(',')[1]}
						</span>
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

			{/* Tabs and Calendar Section */}
			<div className='w-full flex items-center justify-between rounded-md p-2'>
				<Tabs
					aria-label='Campaign Stats'
					selectedKey={selectedTab}
					onSelectionChange={(key) => setSelectedTab(key)}
					variant='bordered'
					className='flex bg-white p-1 items-start gap-1 rounded-lg'
				>
					<Tab
						key='today'
						title='Today'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
					<Tab
						key='last24hrs'
						title='Last 24hrs'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
					<Tab
						key='last7days'
						title='Last 7 Days'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
					<Tab
						key='last30days'
						title='Last 30 Days'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
					<Tab
						key='last12months'
						title='Last 12 Months'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
					<Tab
						key='alltime'
						title='All Time'
						className='text-[#8598AD] text-[13px] font-medium'
					/>
				</Tabs>
				<Calendar />
			</div>

			{/* Campaign Cards */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{list.map((item, index) => (
					<Card
						key={index}
						isPressable
						shadow='sm'
						className='bg-white p-[24px] rounded-lg flex flex-col justify-between'
					>
						<CardBody className='overflow-visible p-0'>
							<div className='flex flex-col gap-3'>
								<span className='text-[#4E4E4E] text-[16px] font-medium'>
									{item.title}
								</span>
								<div className='flex items-center justify-between'>
									<span className='text-[#0096D6] text-[18px] font-semibold'>
										{item.number}
									</span>
									{/* <div className="flex items-center gap-3">
                    <span className="text-[#1C1C1C] text-xs font-normal">
                      {item.percentage}
                    </span>
                    <Image
                      alt={item.title}
                      className="w-6 h-6"
                      src={
                        item.percentage.startsWith("+")
                          ? "/arrowgreen.png"
                          : "/arrowred.png"
                      }
                    />
                  </div> */}
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>

			{/* Exams Table */}
			<CampaignTable />
		</div>
	);
}
