'use client';

import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../../providers/contextProvider';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ClientOverviewTable from './ClientOverviewTable';
import Calendar from '../../reusable/Calendar';

export default function ClientOverview({ clientData, setActiveTab }) {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
	const router = useRouter();
	const { clientName } = useParams();
	const [selectedTab, setSelectedTab] = useState('today');

	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';

	// Update date and time
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

	// Static campaign types (replace with API data if available)
	const campaignTypes = [
		{ id: 1, name: 'Security Awareness Q1', percentage: '+24.2%' },
		{ id: 2, name: 'Phishing Prevention', percentage: '-5.1%' },
		{ id: 3, name: 'Data Privacy Basics', percentage: '+18.7%' },
		{ id: 4, name: 'Cybersecurity 101', percentage: '+12.3%' },
		{ id: 5, name: 'Incident Response', percentage: '+9.8%' },
		{ id: 6, name: 'Network Security', percentage: '+15.4%' },
		{ id: 7, name: 'Social Engineering', percentage: '-2.9%' },
		{ id: 8, name: 'Cloud Security', percentage: '+20.0%' },
		{ id: 9, name: 'Compliance Training', percentage: '+17.5%' },
		{ id: 10, name: 'Endpoint Protection', percentage: '+11.1%' },
		{ id: 11, name: 'Malware Defense', percentage: '+22.6%' },
		{ id: 12, name: 'Ethical Hacking', percentage: '+8.3%' },
		{ id: 13, name: 'Remote Work Safety', percentage: '+19.2%' },
		{ id: 14, name: 'IoT Security', percentage: '+13.9%' },
		{ id: 15, name: 'Advanced Threat Detection', percentage: '+25.8%' },
	];

	// Use clientData.overview for real data, fallback for missing fields
	const overviewData = {
		totalEmployees: clientData.overview.totalEmployees || 'N/A',
		spokesperson: clientData.overview.spokesperson || 'N/A',
		totalExamTaken: 'N/A', // Placeholder: Not in API
		totalCampaignSent: 'N/A', // Placeholder: Not in API
	};

	// Dynamic data by tab (adjust based on API if time-based data is added)
	const overviewDataByTab = {
		today: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
		last24hrs: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
		last7days: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
		last30days: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
		last12months: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
		alltime: [
			{
				title: 'Total number of Employee',
				number: overviewData.totalEmployees,
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exam Taken',
				number: overviewData.totalExamTaken,
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Total Campaign Sent',
				number: overviewData.totalCampaignSent,
				percentage: '+0%',
				color: '#FFC107',
			},
			{ spokesperson: overviewData.spokesperson, role: 'Spokesperson' },
		],
	};

	const list = overviewDataByTab[selectedTab] || [];

	return (
		<div className='flex flex-col gap-4'>
			{/* Header */}
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

			{/* Tabs */}
			<div className='w-full flex items-center justify-between rounded-lg p-1'>
				<Tabs
					aria-label='Overview Stats'
					selectedKey={selectedTab}
					onSelectionChange={(key) => setSelectedTab(key)}
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

			{/* Overview Cards */}
			<div className='flex items-center gap-4 self-stretch'>
				{list.slice(0, 3).map((item, index) => (
					<Card
						key={index}
						isPressable
						shadow='sm'
						className='flex p-5 flex-col items-start gap-3 flex-1 flex-shrink-0 rounded-lg bg-white'
					>
						<CardBody className='overflow-visible p-0'>
							<div className='flex flex-col gap-3'>
								<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
									{item.title}
								</h3>
								<div className='flex items-center justify-between w-full'>
									<span
										className='text-[18px] font-semibold'
										style={{ color: item.color }}
									>
										{item.number}
									</span>
									<span className='text-[#1C1C1C] text-xs font-normal'>
										{item.percentage}
									</span>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
				<Card
					isPressable
					shadow='sm'
					className='flex p-5 flex-col items-center flex-1 flex-shrink-0 rounded-lg bg-white'
				>
					<CardBody className='overflow-visible p-0'>
						<Image
							src='https://i.pravatar.cc/150?u=a04258114e29026302d'
							width={40}
							height={40}
							className='rounded-full aspect-square'
							alt='Spokesperson'
						/>
						<h3 className='text-[#1F2937] text-[13px] font-medium'>
							{list[3].spokesperson}
						</h3>
						<span className='text-[#6B7280] text-[13px] font-normal'>
							{list[3].role}
						</span>
					</CardBody>
				</Card>
			</div>

			{/* Campaign Types Section */}
			<div className='flex flex-wrap gap-4'>
				{campaignTypes.map((campaign) => (
					<div
						key={campaign.id}
						className='flex justify-between flex-1 flex-shrink-0 self-stretch p-5 rounded-lg bg-white min-w-[250px] max-w-[300px] h-full'
					>
						<div className='flex flex-col items-start gap-4'>
							<h4 className='text-[#4E4E4E] text-[16px] font-medium'>
								{campaign.name}
							</h4>
							<span className='text-[#4E4E4E] text-[13px] font-medium'>
								{campaign.percentage}
							</span>
						</div>
						<Image
							src='/overviewicon.png'
							width={75}
							height={30}
							alt='overviewicon'
							className='w-[75px] h-[50px]'
						/>
					</div>
				))}
				<div className='min-w-[250px] max-w-[300px] flex-shrink-0 rounded-lg bg-white shadow self-stretch'></div>
			</div>

			{/* Table */}
			<div>
				<ClientOverviewTable setActiveTab={setActiveTab} />
			</div>
		</div>
	);
}
