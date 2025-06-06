'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import UserInfo from '../../../../../components/pages/platform/UserInfo';
import UserLoginInfo from '../../../../../components/pages/platform/UserLoginInfo';
import UserGeoInfo from '../../../../../components/pages/platform/UserGeoInfo';

export default function UserDetails() {
	const router = useRouter();

	const userData = {
		userId: 'NOU-00101',
		ipAddress: '192.168.1.100',
		ipType: 'IPv4',
		os: 'Windows 11',
		browser: 'Google Chrome 120.0',
		cpu: 'Undefined',
		browserVersion: 'Version-16.6',
		language: 'En-English',
		city: 'Lagos',
		country: 'Nigeria',
		email: 'darcelballentine@mail.com',
		password: '1234567890',
		longitude: '6.5244° N',
		latitude: '3.3792° E',
	};

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<div className='me-10 md:col-span-2'>
				<button
					className='flex text-black text-xl items-center pt-5 font-semibold'
					onClick={() => router.push('/platform/template')}
				>
					<IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
					Back
				</button>

				<div className='my-5'>
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
						<BreadcrumbItem
							href='/platform'
							className='text-red-500 font-semibold'
						>
							Recent Facebook Users
						</BreadcrumbItem>
						<BreadcrumbItem className='font-semibold'>
							User Details
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>
			</div>

			<div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6'>
				<UserInfo user={userData} />
				<div>
					<UserLoginInfo user={userData} />
					<div className='my-5'>
						<UserGeoInfo user={userData} />
					</div>
				</div>
			</div>
		</div>
	);
}
