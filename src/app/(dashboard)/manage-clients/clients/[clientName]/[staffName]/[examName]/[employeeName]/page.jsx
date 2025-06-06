'use client';

import { useParams } from 'next/navigation';

export default function EmployeeName({}) {
	// const { clientName, examName, employeeName } = useParams();
	const { clientName, examName, employeeName } = [];
	const decodedClientName = clientName
		? decodeURIComponent(clientName).replace(/-/g, ' ')
		: '';
	const decodedExamName = examName
		? decodeURIComponent(examName).replace(/-/g, ' ')
		: '';
	const decodedEmployeeName = employeeName
		? decodeURIComponent(employeeName).replace(/-/g, ' ')
		: '';

	// Sample employee data (replace with real data)
	const employeeData = {
		name: decodedEmployeeName,
		exam: decodedExamName,
		score: '85%', // Example; fetch this dynamically
		status: 'Passed',
		dateTaken: '2025-02-01',
		timeTaken: '45 minutes',
	};

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Employee Exam Details</h1>
			<p>Client: {decodedClientName}</p>
			<p>Exam: {decodedExamName}</p>
			<p>Employee: {employeeData.name}</p>
			<div className='mt-4'>
				<p>Score: {employeeData.score}</p>
				<p>Status: {employeeData.status}</p>
				<p>Date Taken: {employeeData.dateTaken}</p>
				<p>Time Taken: {employeeData.timeTaken}</p>
			</div>
			{/* Add more employee-specific content here */}
		</div>
	);
}
