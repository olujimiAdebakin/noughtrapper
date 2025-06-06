'use client';

import { IoIosArrowBack } from 'react-icons/io';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import SideProfile from '../../../../../components/pages/platform/SideProfile';
import LogCard from '../../../../../components/pages/platform/LogCard';
import LogHeader from '../../../../../components/pages/platform/LogHeader';
import LogTable from '../../../../../components/pages/platform/LogTable';

const StaffLogDashboard = () => {
	return (
		<div className='bg-[#F9FBFD] mx-6'>
			<div>
				<div className='flex justify-between mb-5 pt-5'>
					<button
						className='flex text-black text-xl items-center font-semibold'
						onClick={() => router.push('/platform')}
					>
						<IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
						Back
					</button>
				</div>

				<div>
					<Breadcrumbs
						itemClasses={{
							separator: 'px-2',
						}}
						separator={
							<IoMdArrowDropright className='text-default-500' />
						}
					>
						<BreadcrumbItem
							href='/platform'
							className='text-red-500 font-semibold'
						>
							Platform
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold text-red-500'>
							{' '}
							Template
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold'>
							{' '}
							Password Reset Request Template
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
				<div className='col-span-1'>
					<SideProfile />
				</div>

				<div className='col-span-2'>
					<div>
						<div className='mb-5'>
							<LogCard />
						</div>

						<div className='bg-white shadow justify-between items-center p-4'>
							<div>
								<LogHeader />
							</div>

							<LogTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaffLogDashboard;
