'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { IoIosArrowBack } from 'react-icons/io';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import TopStats from '../../../../../components/pages/platform/TopStats';
import LinkCard from '../../../../../components/pages/platform/LinkCard';
import ManageTemplate from '../../../../../components/pages/platform/ManageTemplate';
import UsersTable from '../../../../../components/pages/platform/UsersTable';

export default function Template() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('ManageTemplate');


	const { platform_id } = useParams(); // Get platform_id from the URL

	const [platformDetails, setPlatformDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (platform_id) {
      // Fetch platform details based on platform_id
      fetchPlatformDetails(platform_id);
    }
  }, [platform_id]);

  const fetchPlatformDetails = async (platform_id) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${baseUrl}/v1/get-specific-platform?platform_id=${platform_id}`;

    try {
	  const accessToken = Cookies.get('authToken');

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
			'Authorization': `${accessToken}`,
			'Content-Type': 'application/json',
		  },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch platform details');
      }

      const data = await response.json();
      const parsedBody = JSON.parse(data.body); // Assuming the response body contains the platform details

      setPlatformDetails(parsedBody.platform);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading platform details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!platformDetails) return <p className="text-center">Platform not found.</p>;

 

	return (
		<div className='bg-[#F9FBFD] mx-6'>
			<div>
				<div className='flex justify-between mb-5 pt-5'>
					<button
						className='flex text-black text-xl items-center font-semibold'
						onClick={() => router.back()}
					>
						<IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
						Back
					</button>
					<button
						className='bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700'
						onClick={() =>
							router.push(`/platform/template/create-template/${platform_id}`)
						}
					>
						<FaPlus />
						Create Template
					</button>
				</div>

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
						{activeTab === 'ManageTemplate'
							? 'Template'
							: `${ platformDetails.company_name } 'Users'`}
					</BreadcrumbItem>
				</Breadcrumbs>
			</div>

			<div className='mb-5'>
			 <TopStats platformDetails={platformDetails} />
	         <LinkCard platformDetails={platformDetails} />
			</div>

			<div>
				<h1 className='text-xl font-bold'>
					User & Template Management
				</h1>
				<div className='flex gap-4 my-4'>
					<button
						className={`px-4 py-2 ${
							activeTab === 'ManageTemplate'
								? 'border-b-3 border-black font-bold'
								: 'text-gray-500'
						}`}
						onClick={() => setActiveTab('ManageTemplate')}
					>
						Templates
					</button>
					<button
						className={`px-4 py-2 ${
							activeTab === 'UsersTable'
								? 'border-b-3 border-black font-bold'
								: 'text-gray-500'
						}`}
						onClick={() => setActiveTab('UsersTable')}
					>
						{ platformDetails.company_name } Users
					</button>
				</div>

				{/* Conditional Rendering */}
				{activeTab === 'ManageTemplate' ? (
					<ManageTemplate platformDetails={platformDetails}  />
				) : (
					<UsersTable platformDetails={platformDetails} />
				)}
			</div>
		</div>
	);
}
