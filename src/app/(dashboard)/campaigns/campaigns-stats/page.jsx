'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import OverView from '../../../../components/reusable/OverView';
import CampaignDate from '../../../../components/pages/campaigns/CampaignDate';
import CampaignStats from '../../../../components/pages/campaigns/CampaignStats';
import CampaignBar from '../../../../components/pages/campaigns/CampaignBar';
import PublishedCampaign from '../../../../components/pages/campaigns/PublishedCampaign';
import DraftCampaign from '../../../../components/pages/campaigns/DraftCampaign';
import AwarenessCampaignDash1 from '../../../../components/pages/campaigns/AwarenessCampaignDash1';

export default function page() {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('PublishedCampaign');

	const [campaigns, setCampaigns] = useState([]);
	// const [campaignstab, setCampaignstab] = useState([]);
	const [loading, setLoading] = useState(true);

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

					setCampaigns(data);

					// setCampaignstab(data.recentCampaigns);
					
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
		<div>
			<div className='p-6 space-y-6'>
				<AwarenessCampaignDash1 />

				<div>
					<OverView />
				</div>

				<div>
					<CampaignDate />
				</div>

				<div>
					<CampaignStats campaigns={campaigns} />
				</div>

				<div className='mt-10 mb-10'>
					<CampaignBar />
				</div>

				<div>
					<div className='flex gap-4 my-4'>
						<button
							className={`px-4 py-2 ${
								activeTab === 'PublishedCampaign'
									? 'border-b-3 border-black font-bold'
									: 'text-gray-500'
							}`}
							onClick={() => setActiveTab('PublishedCampaign')}
						>
							Published
						</button>
						<button
							className={`px-4 py-2 ${
								activeTab === 'DraftCampaign'
									? 'border-b-3 border-black font-bold'
									: 'text-gray-500'
							}`}
							onClick={() => setActiveTab('DraftCampaign')}
						>
							Drafts
						</button>
					</div>

					{/* Conditional Rendering */}
					{activeTab === 'PublishedCampaign' ? (
						<PublishedCampaign campaigns={campaigns} />
					) : (
						<DraftCampaign campaigns={campaigns} />
					)}
				</div>
			</div>
		</div>
	);
}
