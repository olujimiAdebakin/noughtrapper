'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';
import CampaignEditor from '../../../../components/pages/campaigns/CampaignEditor';
import CampaignProgressIndicator from '../../../../components/pages/campaigns/NewCampaignProgress';

async function fetchClients() {
	const baseUrl = process.env.API_GATEWAY_URL;
	const endpoint = `${baseUrl}/v1/create-campaign`;
}

export default function page() {
	const [isPreview, setIsPreview] = useState(false);
	const router = useRouter();

	return (
		<div className='mx-10'>
			<div className='md:grid md:grid-cols-3 bg-[#F9FBFD]'>
				<div className='md:col-span-2'>
					<div>
						<div className='flex justify-between mb-5 pt-5'>
							<button
								className='flex text-black text-xl items-center font-semibold'
								onClick={() => router.back()}
							>
								<IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
								Back
							</button>
						</div>

						<div>
							<h4 className='font-bold text-xl mt-5 mb-2'>
								Create Campaign
							</h4>
						</div>

						<div className='mb-5'>
							<Breadcrumbs
								itemClasses={{ separator: 'px-2' }}
								separator={
									<IoMdArrowDropright className='text-default-500' />
								}
							>
								<BreadcrumbItem
									href='/campaigns'
									className='text-red-500 font-semibold'
								>
									Campaign
								</BreadcrumbItem>
								<BreadcrumbItem className='font-semibold'>
									Create Campaign
								</BreadcrumbItem>
							</Breadcrumbs>
						</div>
					</div>

					<div className=''>
						<CampaignEditor
							isPreview={isPreview}
							setIsPreview={setIsPreview}
						/>
					</div>
				</div>
				<div className='md:col-span-1 my-10 md:my-[8.5rem] p-5'>
					<CampaignProgressIndicator isPreview={isPreview} />
				</div>
			</div>
		</div>
	);
}
