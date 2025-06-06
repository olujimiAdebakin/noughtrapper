'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import AddPlatformStatus from '../../../../components/pages/platform/AddPlatformStatus';

export default function AddPlatform() {
	const [imagePreview, setImagePreview] = useState(null);
	const [imageBase64, setImageBase64] = useState(null);
    const [platformName, setPlatformName] = useState('');
    const [status, setStatus] = useState('Published'); // Default value
    const [responseMessage, setResponseMessage] = useState(null);

	const router = useRouter();

	// const handleImageChange = (event) => {
	// 	const file = event.target.files?.[0];

	// 	if (file) {
	// 		const previewUrl = URL.createObjectURL(file);
	// 		setImagePreview(previewUrl);
	// 	}
	// };


	// Convert image to Base64
    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageBase64(reader.result.split(',')[1]); // Extract base64 string
                setImagePreview(URL.createObjectURL(file));
            };
        }
    };


	// Handle form submission
    const handleSubmit = async () => {
        if (!platformName || !imageBase64 || !status) {
            setResponseMessage('All fields are required.');
            return;
        }

        const payload = {
            company_name: platformName,
            logo: imageBase64,
            status: status.toLowerCase(),
        };

		const baseUrl = process.env.NEXT_PUBLIC_API_URL;
		const endpoint = `${baseUrl}/v1/create-platform`;

		const accessToken = Cookies.get('authToken');

		try {
            const response = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: {
					'Authorization': `${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(`Successful!`);
            } else {
                setResponseMessage(`Error: ${data.message || 'Failed to create platform'}`);
            }
        } catch (error) {
            setResponseMessage('Network error. Please try again.');
        }
    };



	return (
		<div className='grid grid-cols-1 md:grid-cols-3 mx-4'>
			<div className='me-10 md:col-span-2'>
				<button
					className='flex text-black text-xl items-center pt-5 font-semibold'
					onClick={() => router.push('/platform')}
				>
					<IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
					Back
				</button>
				<h4 className='block text-2xl font-semibold my-5'>
					Add Platform
				</h4>

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
						<BreadcrumbItem className='font-semibold'>
							Add Platform
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>

				{/* Response Message */}
			{responseMessage && <p className='mt-4 text-center font-semibold text-red-500'>{responseMessage}</p>}

				<div className='my-4 bg-white rounded-2xl p-5 font-semibold'>
					<h4 className='mb-5'>General Information</h4>
					<label htmlFor='Name of company'>Name of company</label>
					<input
						type='text'
						id='platformName'
						value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
						className='mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Wema Bank PLC'
					/>
				</div>

				<div className='p-4 rounded-lg shadow-sm bg-white w-full font-semibold'>
					<h4 className='mb-5'>Media</h4>
					<p className='text-gray-500 mb-2'>Logo</p>
					<div className='border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center'>
						{imagePreview ? (
							<Image
								src={imagePreview}
								alt='Logo Preview'
								width={100}
								height={100}
								className='rounded-lg'
							/>
						) : (
							<p className='text-gray-400'>
								Drag and drop image here, or click to add image.
							</p>
						)}
						<input
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							className='hidden'
							id='fileInput'
						/>
						<label
							htmlFor='fileInput'
							className='mt-3 cursor-pointer bg-default-300 text-black px-4 py-2 rounded-lg'
						>
							Add Image
						</label>
					</div>
				</div>

			</div>

			{/* Status & Submit Button */}
			<div className='md:col-span-1 my-10 p-5'>
			<AddPlatformStatus status={status} setStatus={setStatus} handleSubmit={handleSubmit} />
			</div>
		</div>
	);
}
