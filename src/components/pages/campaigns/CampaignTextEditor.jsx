'use client';

import { useState } from 'react';
import QuillEditor from '../platform/QuillEditor';
import HtmlEditor from '../platform/MonacoEditor';

export default function CampaignTextEditor({ campaignData, setCampaignData, errors }) {
	const [isHtmlMode, setIsHtmlMode] = useState(false);

	return (
		<div className='p-5'>
			<h4 className='font-semibold mb-4'>Campaign Message</h4>

			{/* Toggle Buttons */}
			<div className='flex gap-2 mb-4'>
				<button
					className={`px-4 py-2 text-sm transition ${
						!isHtmlMode
							? 'border border-red-500 text-white bg-red-500 rounded-md'
							: 'border border-gray-400 text-gray-500 rounded-md'
					}`}
					onClick={() => setIsHtmlMode(false)}
				>
					Text
				</button>
				<button
					className={`px-4 py-2 text-sm transition ${
						isHtmlMode
							? 'border border-blue-500 text-white bg-blue-500 rounded-md'
							: 'border border-gray-400 text-gray-500 rounded-md'
					}`}
					onClick={() => setIsHtmlMode(true)}
				>
					HTML
				</button>
			</div>

			{/* Render the editor based on the selected mode */}
			{isHtmlMode ? (
				<HtmlEditor
					content={campaignData.message}
					setContent={(content) =>
						setCampaignData({ ...campaignData, message: content })
					}
				/>
			) : (
				<QuillEditor
					content={campaignData.message}
					setContent={(content) =>
						setCampaignData({ ...campaignData, message: content })
					}
				/>
			)}
			{errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

		</div>
	);
}
