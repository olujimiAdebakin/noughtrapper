'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import CampaignTextEditor from './CampaignTextEditor';
import NewCampaignTop from './NewCampaignTop';
import NewCampaignBottom from './NewCampaignBottom';
import PreviewCampaign from './NewCampaignPreview';
import toast from "react-hot-toast";
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../platform/TextEditor'), {
	ssr: false,
});

function CampaignEditor({ isPreview, setIsPreview }) {
	const [campaignData, setCampaignData] = useState({
		campaignType: '',
		subject: '',
		clientId: '',
		message: '',
		fromName: '',
		fromEmail: '',
		sendTo: '',
		// companyName: 'Your Company',
		// recipientName: 'Customer',
		imageUrl: '', // Optional image for preview
	});

	const [errors, setErrors] = useState({});

	const [campaignId, setCampaignId] = useState('')

	const [showConfirm, setShowConfirm] = useState(false);

	const router = useRouter();



	const REQUIRED_FIELDS = [
		{ key: 'clientId', label: 'Client ID' },
		{ key: 'campaignType', label: 'Campaign Type' },
		{ key: 'subject', label: 'Subject' },
		{ key: 'message', label: 'Message' },
		{ key: 'fromName', label: 'From Name' },
		{ key: 'fromEmail', label: 'From Email' },
	  ];


	  const validateCampaignData = (data) => {
		const newErrors = {};
	  
		REQUIRED_FIELDS.forEach(({ key, label }) => {
		  if (!data[key] || data[key].trim() === '') {
			newErrors[key] = `Field is required`;
		  }
		});
	  
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	  };
	  
	  
	

	const handleNext = (data) => {

		if (!validateCampaignData(data)) {
			return;
		  }

		setCampaignData(data);
		
		setIsPreview(true);
	};

	const handleLaunchClick = async () => {
		
		const baseUrl = process.env.NEXT_PUBLIC_API_URL;
					const endpoint = `${baseUrl}/v1/create-campaign`;
					
					const accessToken = Cookies.get('authToken');

		try {
			const response = await fetch(`${endpoint}`, {
				method: 'POST',
				headers: {
					'Authorization': `${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clientId: campaignData.clientId,
					campaignType: campaignData.campaignType,
					subject: campaignData.subject,
					message: campaignData.message,
					fromName: campaignData.fromName,
					fromEmail: campaignData.fromEmail,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success('Campaign is ready to Launch');
				setShowConfirm(true);
				setCampaignId(`${result.campaignId}`);
			} else {
				console.error('Launch failed:', result.message);
			}
		} catch (error) {
			console.error('Error during launch:', error);
		}

	};

	const confirmLaunch = async () => {
		
		const baseUrl = process.env.NEXT_PUBLIC_API_URL;
					const endpoint = `${baseUrl}/v1/send-email`;
					
					const accessToken = Cookies.get('authToken');

		try {
			const response = await fetch(`${endpoint}`, {
				method: 'POST',
				headers: {
					'Authorization': `${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					campaignId: campaignId,
					companyId: campaignData.clientId,
					senderEmail: campaignData.fromEmail,
				}),
			});

			const result = await response.json();

			if (response.statusCode === 201) {
				console.log('Campaign Launched!');
				toast.success('Campaign launched!');
				setShowConfirm(false);
				router.back();
			} else if (response.statusCode === 400) {
				console.error('Bad Request:', result.message);
				toast.error(`Failed to launch: ${result.message}`);
			} else if (response.statusCode === 401) {
				console.error('Unauthorized:', result.message);
				toast.error('You are not authorized to perform this action.');
			} else if (response.statusCode === 404) {
				console.error('Unauthorized:', result.message);
				toast.error('You are not authorized to perform this action.');
			} else if (response.statusCode === 500) {
				console.error('Server Error:', result.message);
				toast.error('There was a server error. Please try again later.');
			} else {
				console.error('Unexpected Error:', result.message);
				toast.error('You are not authorized to perform this action.');
			}
		} catch (error) {
			console.error('Error during launch:', error);
			alert('An error occurred while launching the campaign.');
		}
	};

	return (
		<div className='my-4 bg-white rounded-2xl p-5 border border-grey-200 shadow-lg'>
			{isPreview ? (
				<PreviewCampaign
					campaignData={campaignData}
					onBack={() => setIsPreview(false)}
					onLaunch={handleLaunchClick}
				/>
			) : (
				<>
					<NewCampaignTop
						campaignData={campaignData}
						setCampaignData={setCampaignData}
						errors={errors}
					/>
					<CampaignTextEditor
						campaignData={campaignData}
						setCampaignData={setCampaignData}
						errors={errors}
					/>
					<NewCampaignBottom
						campaignData={campaignData}
						setCampaignData={setCampaignData}
						errors={errors}
						onNext={handleNext}
					/>
				</>
			)}

			{/* Confirmation Modal */}
			{showConfirm && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg mx-10 text-center relative'>
						<button
							className='absolute top-3 right-3 text-black text-xl mr-5 bg-gray-300 pb-0.5 px-2.5 rounded-full'
							onClick={() => setShowConfirm(false)}
						>
							x
						</button>
						<h3 className='text-lg font-semibold mb-4'>
							Launch Campaign
						</h3>
						<p className='text-gray-700'>
							Campaigns will be saved and automatically sent to
							recipients based on the selected Client
						</p>
						<div className='flex justify-end mt-6 gap-3'>
							<button
								className='px-4 py-2 border rounded-lg text-gray-600'
								onClick={() => setShowConfirm(false)}
							>
								Cancel
							</button>
							<button
								className='bg-red-700 text-white px-4 py-2 rounded-lg'
								onClick={confirmLaunch}
							>
								Yes, Launch
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CampaignEditor;
