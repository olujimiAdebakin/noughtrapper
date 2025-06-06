'use client';

import ExamRecordsTable from '../../../../../../../components/Navigation/manage-clients/ExamRecordsTable';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
// import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ExamName() {
	const [examDetails, setExamDetails] = useState({
		clientName: 'Company A', // Placeholder, decode from client_id or fetch
		examName: 'Phishing Awareness Test', // Placeholder, decode from exam_id or fetch
		dateConducted: 'Monday, Jan 2025',
		completionRate: '65%',
		totalEmployees: '12,400',
		percentagePassed: '65%',
		totalQuestions: '650',
		avgCorrectAnswers: '123',
		avgIncorrectAnswers: '65',
		mostMissedQuestion: 'Question 10',
		highestScore: '190',
		averageScore: '75%',
		failureRate: '20%',
	});

	const router = useRouter();

	//  const { clientName, examName, client_id, exam_id, staffName } = useParams();
	const { clientName, examName, client_id, exam_id, staffName } = [];

	// decode and display name
	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';
	const decodedExamName = examName
		? decodeURIComponent(examName).replace(/-/g, ' ')
		: '';

	useEffect(() => {
		// For now, using static data from state
		console.log(
			`Fetching details for Client ID: ${client_id}, Exam ID: ${exam_id}`
		);
	}, [client_id, exam_id]);

	return (
		<>
			<div className='pt-[24px] pb-2 px-[16px] bg-[#F9FBFD] h-screen'>
				<div className='flex flex-col mb-4'>
					<div className='pt-[24px] mb-4'>
						<div className='flex items-center gap-2'>
							<div
								className='bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg cursor-pointer'
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
								{decodedExamName}
							</span>
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>

				<div className='bg-white flex justify-between p-4 items-center rounded-lg mb-4'>
					<h2>Performance Overview Summary</h2>
					<div className='flex items-center gap-4 flex-1 flex-shrink-0'>
						<span className='text-[16px] font-medium text-[#8598AD]'>
							Date Conducted:
						</span>
						<h3 className='text-[16px] font-normal text-[#192027]'>
							{examDetails.dateConducted}
						</h3>
					</div>
				</div>

				<div className='flex gap-4 self-stretch mb-4'>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Exam Title
						</h3>
						<span className='text-[#0096D6] text-[18px] font-semibold'>
							{examDetails.examName}
						</span>
					</div>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Exam Completion Rate
						</h3>
						<span className='text-[#28A745] text-[18px] font-semibold'>
							{examDetails.completionRate}
						</span>
					</div>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Total Employee
						</h3>
						<span className='text-[#0096D6] text-[18px] font-semibold'>
							{examDetails.totalEmployees}
						</span>
					</div>
				</div>

				<div className='flex w-full items-start gap-4 mb-4'>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Percentage Passed
						</h3>
						<span className='text-[#28A745] text-[18px] font-semibold'>
							{examDetails.percentagePassed}
						</span>
					</div>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Average Score
						</h3>
						<span className='text-[#28A745] text-[18px] font-semibold'>
							{examDetails.averageScore}
						</span>
					</div>
					<div className='flex flex-col items-start gap-3 p-5 flex-1 flex-shrink-0 rounded-lg bg-white shadow-sm'>
						<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
							Failure Rate
						</h3>
						<span className='text-[#DC3545] text-[18px] font-semibold'>
							{examDetails.failureRate}
						</span>
					</div>
				</div>

				<div className='flex w-full flex-col items-start gap-4 mb-4'>
					<h2 className='text-[#4E4E4E] text-[16px] font-medium'>
						Overall Statistics
					</h2>
					<div className='grid grid-cols-3 gap-4 w-full'>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Highest Score
							</h3>
							<span className='text-[#28A745] text-[18px] font-semibold'>
								{examDetails.highestScore}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Average Score
							</h3>
							<span className='text-[#28A745] text-[18px] font-semibold'>
								{examDetails.averageScore}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Lowest Score
							</h3>
							<span className='text-[#DC3545] text-[18px] font-semibold'>
								35
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Pass Rate
							</h3>
							<span className='text-[#28A745] text-[18px] font-semibold'>
								{examDetails.percentagePassed}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Failure Rate
							</h3>
							<span className='text-[#DC3545] text-[18px] font-semibold'>
								{examDetails.failureRate}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 p-5 rounded-lg bg-white shadow-sm w-full'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Exams Taken
							</h3>
							<span className='text-[#0096D6] text-[18px] font-semibold'>
								12
							</span>
						</div>
					</div>
				</div>

				<div className='flex w-full items-start flex-col gap-4 mb-4'>
					<h2 className='text-[#4E4E4E] text-[16px] font-medium'>
						Completion Breakdown
					</h2>
					<div className='flex items-center gap-4 self-stretch'>
						<div className='flex flex-col items-start gap-3 flex-1 flex-shrink-0 p-5 rounded-lg bg-white shadow-sm'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Total Questions
							</h3>
							<span className='text-[#28A745] text-[18px] font-semibold'>
								{examDetails.totalQuestions}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 flex-1 flex-shrink-0 p-5 rounded-lg bg-white shadow-sm'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Average Correct Answers
							</h3>
							<span className='text-[#28A745] text-[18px] font-semibold'>
								{examDetails.avgCorrectAnswers}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 flex-1 flex-shrink-0 p-5 rounded-lg bg-white shadow-sm'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Average Incorrect Answers
							</h3>
							<span className='text-[#DC3545] text-[18px] font-semibold'>
								{examDetails.avgIncorrectAnswers}
							</span>
						</div>
						<div className='flex flex-col items-start gap-3 flex-1 flex-shrink-0 p-5 rounded-lg bg-white shadow-sm'>
							<h3 className='text-[#4E4E4E] text-[16px] font-medium'>
								Most Missed Question
							</h3>
							<span className='text-[#DC3545] text-[18px] font-semibold'>
								{examDetails.mostMissedQuestion}
							</span>
						</div>
					</div>
				</div>

				<ExamRecordsTable
					clientName={clientName}
					examName={examName}
					staffName={staffName}
				/>
			</div>
		</>
	);
}
