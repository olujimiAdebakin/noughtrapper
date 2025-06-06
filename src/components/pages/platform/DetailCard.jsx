'use client'

import Link from 'next/link';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';


function SecurityHub() {
  const publishedPlatforms = [
    { id: 1, name: 'Password Reset Request', templates: 25 },
    { id: 2, name: 'Unusual Login Alert', templates: 25 },
    { id: 3, name: 'Fake Job Opportunity', templates: 25 },
    { id: 4, name: 'Package Delivery Notification', templates: 25 },
    { id: 5, name: 'Bank Account Update Request', templates: 25 },
    { id: 6, name: 'Gift Card Offer', templates: 25 },
    { id: 7, name: 'Account Deactivation Warning', templates: 25 },
    { id: 8, name: 'Social Media Security Notice', templates: 25 },
    { id: 9, name: 'IT Policy Update', templates: 25 },
    { id: 10, name: 'Health Benefits Enrollment', templates: 25 },
    { id: 11, name: 'File Sharing Notification', templates: 25 },
    { id: 12, name: 'IT Equipment Recall', templates: 25 },
    { id: 13, name: 'Survey Reward Offer', templates: 25 },
    { id: 14, name: 'Tax Refun Notification', templates: 25 },
    { id: 15, name: 'Event Invitation', templates: 25 },
    { id: 16, name: 'Software Update Required', templates: 25 },
  ];

  const displayedPlatforms = publishedPlatforms;

  return (
    <div className="container mx-auto p-6">
      <div className='mb-5'>
        <h1 className="text-2xl font-bold mb-3">Template</h1>
        <p>You can use the template</p>
      </div>

      {displayedPlatforms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPlatforms.map((platform) => (
            <div key={platform.id} className="p-5 rounded-lg shadow-sm bg-white relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-3">
                  <h2 className="text-lg font-semibold">{platform.name}</h2>
                </div>
              </div>

              <div className="flex justify-between items-center my-5 pe-5">
                <p className="font-semibold text-gray-500">Used Count</p>
                <div className="flex items-center gap-2">
                  <FaPlus className="" />
                  <p>{platform.templates}</p>
                </div>
              </div>

              <Link href={`/platform/template/template-request`}>
                <button className="mt-3 w-full border border-black py-2 hover:bg-gray-100 text-lg font-semibold">
                  Use Template
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) 
      : (
        <p className="text-center text-gray-500">No Template available in this Platform.</p>
      )
      }
    </div>
  );
}

export default SecurityHub;
