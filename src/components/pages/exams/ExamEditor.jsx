'use client';

import React, { useState } from 'react';
import ExamTextEditor from './ExamTextEditor';

import NewExamTop from './NewExamTop';
import NewExamBottom from './NewExamBottom';
import PreviewCampaign from './NewExamPreview';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../platform/TextEditor'), {
	ssr: false,
});

function ExamEditor({ isPreview, setIsPreview }) {
	const [campaignData, setCampaignData] = useState({
		type: '',
		subject: '',
		fromName: '',
		fromEmail: '',
		sendTo: '',
		companyName: 'Your Company',
		recipientName: 'Customer',
		imageUrl: '', // Optional image for preview
		message: '',
	});

	const [showConfirm, setShowConfirm] = useState(false);

	const handleNext = (data) => {
		setCampaignData(data);
		setIsPreview(true);
	};

	const handleLaunchClick = () => {
		setShowConfirm(true);
	};

	const confirmLaunch = () => {
		setShowConfirm(false);
		console.log('Campaign Launched:', campaignData);
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
					<NewExamTop
						campaignData={campaignData}
						setCampaignData={setCampaignData}
					/>
					<ExamTextEditor
						campaignData={campaignData}
						setCampaignData={setCampaignData}
					/>
					<NewExamBottom
						campaignData={campaignData}
						setCampaignData={setCampaignData}
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

export default ExamEditor;
