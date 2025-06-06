'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import ProgressBar from '../reusable/ProgressBar';
import { useStateContext } from '../../providers/contextProvider';

// Sample Data (Browser & OS with Images)
const browserData = [
	{ id: 1, name: 'Chrome', visits: '8.92k', image: '/chrome.png' },
	{ id: 2, name: 'Firefox', visits: '5.2k', image: '/firefox.png' },
	{ id: 3, name: 'Chrome', visits: '8.92k', image: '/chrome.png' },
	{ id: 4, name: 'Firefox', visits: '5.2k', image: '/firefox.png' },
	{ id: 5, name: 'Chrome', visits: '8.92k', image: '/chrome.png' },
	{ id: 6, name: 'Firefox', visits: '5.2k', image: '/firefox.png' },
];

const osData = [
	{ id: 1, name: 'Opera', visits: '6.8k', image: '/opera.png' },
	{ id: 2, name: 'Edge', visits: '4.1k', image: '/edge.png' },
	{ id: 3, name: 'Opera', visits: '6.8k', image: '/opera.png' },
	{ id: 4, name: 'Edge', visits: '4.1k', image: '/edge.png' },
	{ id: 5, name: 'Opera', visits: '6.8k', image: '/opera.png' },
	{ id: 6, name: 'Edge', visits: '4.1k', image: '/edge.png' },
];

export default function DashboardosLeft() {
	// state to track active tab
	const { activeTab, setActiveTab } = useStateContext();

	// Determine which data to show
	const currentData = activeTab === 'browser' ? browserData : osData;

	return (
		<div className='w-[50%] h-[452px] flex flex-col items-start rounded-xl bg-white p-6 shadow-md'>
			{/* Tab Section */}
			<div className='flex items-center gap-4 w-full mb-4'>
				<button
					className={`px-4 py-2 rounded-lg flex justify-center items-center text-[16px] text-[#192027] font-medium ${
						activeTab === 'browser'
							? 'bg-[#334860] text-white shadow-[0px_2px_4px_0px_rgba(105,108,255,0.40)]'
							: 'bg-gray-200 text-[#192027]'
					}`}
					onClick={() => setActiveTab('browser')}
				>
					Browser
				</button>

				<button
					className={`px-4 py-2 rounded-lg flex justify-center items-center text-[16px] text-[#192027] font-medium ${
						activeTab === 'os'
							? 'bg-[#334860] text-white shadow-[0px_2px_4px_0px_rgba(105,108,255,0.40)]'
							: 'bg-gray-200 text-[#192027]'
					}`}
					onClick={() => setActiveTab('os')}
				>
					Operating System
				</button>
			</div>

			{/* Dynamic Table */}
			<Table aria-label='Usage Statistics'>
				<TableHeader>
					<TableColumn>No</TableColumn>
					<TableColumn>Category</TableColumn>
					<TableColumn>VISITS</TableColumn>
					<TableColumn>DATA IN PERCENTAGE</TableColumn>
				</TableHeader>
				<TableBody>
					{currentData.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell className='flex items-center gap-2'>
								<img
									src={item.image}
									alt={item.name}
									className='w-4 h-4'
								/>
								{item.name}
							</TableCell>
							<TableCell>{item.visits}</TableCell>
							<TableCell>
								<ProgressBar />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
