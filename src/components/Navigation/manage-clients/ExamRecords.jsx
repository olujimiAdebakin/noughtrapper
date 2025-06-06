'use client';

import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../../providers/contextProvider';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import ExamsTable from './ExamsTable';
import Calendar from '../../reusable/Calendar';
// import Calendar from "../reusable/Calendar";

export default function ExamRecords() {
	const { currentDateTime, setCurrentDateTime } = useStateContext();
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState('today');
	const { clientName, staffName, examName } = useParams();

	console.log('Params in ExamRecords:', { clientName, staffName, examName });

	// console.log("clientName in ClientOverview:", clientName);

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

	// Exam data by tab placeholder values
	const examDataByTab = {
		today: [
			{
				title: 'Total Exams Created',
				number: '0',
				percentage: '+0%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '0',
				percentage: '+0%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '0',
				percentage: '+0%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '0%',
				percentage: '+0%',
				color: '#FFC107',
			},
		],
		last24hrs: [
			{
				title: 'Total Exams Created',
				number: '2',
				percentage: '+5%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '1',
				percentage: '+3%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '50',
				percentage: '+2%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '40%',
				percentage: '+1%',
				color: '#FFC107',
			},
		],
		last7days: [
			{
				title: 'Total Exams Created',
				number: '5',
				percentage: '+10%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '3',
				percentage: '+8%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '60',
				percentage: '+5%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '55%',
				percentage: '+4%',
				color: '#FFC107',
			},
		],
		last30days: [
			{
				title: 'Total Exams Created',
				number: '10',
				percentage: '+20%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '8',
				percentage: '+15%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '70',
				percentage: '+10%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '65%',
				percentage: '+8%',
				color: '#FFC107',
			},
		],
		last12months: [
			{
				title: 'Total Exams Created',
				number: '25',
				percentage: '+50%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '20',
				percentage: '+40%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '80',
				percentage: '+15%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '75%',
				percentage: '+12%',
				color: '#FFC107',
			},
		],
		alltime: [
			{
				title: 'Total Exams Created',
				number: '50',
				percentage: '+100%',
				color: '#0096d6',
			},
			{
				title: 'Total Exams Taken',
				number: '40',
				percentage: '+80%',
				color: '#28A745',
			},
			{
				title: 'Average Score',
				number: '85',
				percentage: '+20%',
				color: '#FFC107',
			},
			{
				title: 'Pass Rate',
				number: '80%',
				percentage: '+15%',
				color: '#FFC107',
			},
		],
	};

	const list = examDataByTab[selectedTab] || [];

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
					aria-label='Exam Stats'
					selectedKey={selectedTab}
					onSelectionChange={(key) => setSelectedTab(key)}
					// variant="bordered"
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

			{/* Exam Cards */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 self-stretch'>
				{list.map((item, index) => (
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
										className={`text-[18px] font-semibold`}
										style={{ color: item.color }}
									>
										{item.number}
									</span>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>

			{/* Exams Table */}
			<ExamsTable
				clientName={clientName}
				staffName={staffName || 'unknown'}
				examName={examName}
			/>
		</div>
	);
}
