'use client';

import { Button } from '@nextui-org/react';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

import OverView from '../../../components/reusable/OverView';
import CampaignDate from '../../../components/pages/campaigns/CampaignDate';
import CampaignStats from '../../../components/pages/campaigns/CampaignStats';
import ClientsTable from '../../../components/pages/campaigns/ClientsTable';
import DummClient from '../../../components/pages/campaigns/DumClient';

function LoadingFallback() {
	return (
		<div className='pt-[24px] px-[16px] bg-[#F9FBFD] h-screen'>
			<p className='text-[#48596D] text-[14px] font-medium text-center'>
				Loading...
			</p>
		</div>
	);
}

function Campaigns() {
	const [activeTab, setActiveTab] = useState('income');
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const searchParams = useSearchParams();
	const showForm = searchParams.get('AddClients') === 'true';
	const [clients, setClients] = useState(null);

	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		// Simulate empty data for now (replace with API call later)
		setClients([]);
	}, []);

	if (showForm) {
		return <ClientsForm />;
	}

	useEffect(() => {
			const fetchRecentCampaigns = async () => {
	
				const baseUrl = process.env.NEXT_PUBLIC_API_URL;
				const endpoint = `${baseUrl}/v1/get-recent-campaigns`;
				
				const accessToken = Cookies.get('authToken');
	
				try {
					const response = await fetch(`${endpoint}`, 
						{
							method: 'GET',
							headers: {
								'Authorization': `${accessToken}`,
								'Content-Type': 'application/json',
							},
						});
	
					const data = await response.json();
	
					if (data.statusCode === 200) {
	
						console.log(data);
	
						setCampaigns(data);
						
					} else {
						console.error('Failed to fetch campaigns');
					}
				} catch (error) {
					console.error('API error:', error);
				} finally {
					setLoading(false);
				}
			};
	
			fetchRecentCampaigns();
		}, []);

	return (
		<div className='p-6 space-y-6'>
			{/* Header Section */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>
						Cyber Awareness Campaigns
					</h1>
					<p className='text-gray-500 text-sm'>
						Plan, execute, and track impactful campaigns to educate
						and protect against cyber threats.
					</p>
				</div>
				<Button
					className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700'
					onClick={() => router.push('/campaigns/create-campaign')}
				>
					+ Create Campaigns
				</Button>
			</div>

			<div>
				<OverView />
			</div>

			<div>
				<CampaignDate />
			</div>

			<div>
				<CampaignStats campaigns={campaigns} />
			</div>

			<div>
				<div className='mt-12'>
					{clients === null ? (
						<p className='text-[#48596D] text-[14px] font-medium text-center'>
							Loading...
						</p>
					) : clients.length === 0 ? (
						<DummClient />
					) : (
						<ClientsTable clients={clients} />
					)}
				</div>
			</div>
		</div>
	);
}

export default function ManageClientsPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Campaigns />
		</Suspense>
	);
}
