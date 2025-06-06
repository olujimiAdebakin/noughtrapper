'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';
import dynamic from 'next/dynamic';
import CreateTemplateStatus from '../../../../../../components/pages/platform/CreateTemplateStatus';

const TextEditor = dynamic(
	() => import('../../../../../../components/pages/platform/TextEditor'),
	{ ssr: false }
);

export default function page() {
	const router = useRouter();

	const { template } = useParams(); // Get platform_id from the URL


	const [templateName, setTemplateName] = useState('');
	const [emailSubject, setEmailSubject] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState('');
  
	const handleSubmit = async () => {
	  if (!templateName || !emailSubject || !message || !status || !template) {
		alert('Please fill all fields!');
		return;
	  }

	  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${baseUrl}/v1/create-template`;
  
	  try {
		const accessToken = Cookies.get('authToken');

		const res = await fetch(`${endpoint}`, {
		  method: 'POST',
		  headers: {
			'Authorization': `${accessToken}`,
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			platform_id: template,
			name: templateName,
			email_subject: emailSubject,
			message: message,
			status: status.toLowerCase(), // Send lowercase per API
		  }),
		});
  
		const data = await res.json();
		if (res.status === 201) {

			console.log('Template Created:', responseBody);
			alert('Template created successfully!');
			router.push('/platform');
		} else {
		  console.error('Error:', data);
		}
	  } catch (error) {
		console.error('API Error:', error);
		alert('Something went wrong!');
	  }
	};







	return (
		<div className='mx-6'>
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
								Create Template
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
									href='/platform'
									className='text-red-500 font-semibold'
								>
									Platform
								</BreadcrumbItem>
								<BreadcrumbItem className='font-semibold'>
									Create Template
								</BreadcrumbItem>
							</Breadcrumbs>
						</div>
					</div>

					<div className='my-4 bg-white rounded-2xl p-5'>
						<h4 className='mb-5 font-semibold'>
							General Information
						</h4>
						<div className='mb-5'>
							<label
								htmlFor='Name of Template'
								className='font-semibold'
							>
								Name of Template
							</label>
							<input
								type='text'
								id='templateName'
								className='mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Template Name'
								value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor='Email Subject'
								className='font-semibold'
							>
								Email Subject
							</label>
							<input
								type='text'
								id='emailSubject'
								className='mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Email Subject'
								value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className='md:col-span-1 my-12 p-5'>
					<CreateTemplateStatus status={status} setStatus={setStatus} handleSubmit={handleSubmit} />
				</div>
			</div>

			<div className='pb-10'>
				<TextEditor  value={message} onChange={setMessage}  />
			</div>
		</div>
	);
}
