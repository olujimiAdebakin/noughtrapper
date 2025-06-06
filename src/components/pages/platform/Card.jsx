'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaArrowUp } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';


function SecurityHub() {

  const draftPlatforms = [];


  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('published');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);


  useEffect(() => {
    fetchPlatforms();
  }, []);


  const fetchPlatforms = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${baseUrl}/v1/get-platform-details`;

    try {
      const accessToken = Cookies.get('authToken');

      const response = await fetch(`${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch platform details');
      }

      const responseData = await response.json();

      const data = JSON.parse(responseData.body);
      
      setPlatforms(data.platforms);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 
  if (loading) return <p className="text-center">Loading platforms...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  const platformsPerPage = 12;
  const displayedPlatforms = activeTab === 'published' ? platforms : draftPlatforms;
  const totalPages = Math.ceil(displayedPlatforms.length / platformsPerPage);
  const indexOfLastPlatform = currentPage * platformsPerPage;
  const indexOfFirstPlatform = indexOfLastPlatform - platformsPerPage;
  const currentPlatforms = displayedPlatforms.slice(indexOfFirstPlatform, indexOfLastPlatform);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };


  return (
    <div className="container py-6 px-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Security Hub</h1>
        <Link href="/platform/add-platform">
          <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700">
            <FaPlus /> Create Platform
          </button>
        </Link>
      </div>

      <div className="mt-2 mb-5">
        <p>Centralized Management for Companies and Phishing Awareness</p>
      </div>

      <div className="flex bg-white p-1 w-[12.5rem] gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'published' ? 'bg-gray-300 text-black font-semibold' : 'text-gray-400'}`}
          onClick={() => setActiveTab('published')}
        >
          Published
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'draft' ? 'bg-gray-300 text-black font-semibold' : 'text-gray-400'}`}
          onClick={() => setActiveTab('draft')}
        >
          Draft
        </button>
      </div>

      {currentPlatforms.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentPlatforms.map((platform, index) => (
              <div key={index} className="p-4 rounded-lg shadow-sm bg-white relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-3">
                  <Image
                    src={platform.logo && platform.logo.trim() ? platform.logo : '/nought-logo.svg'}
                    alt={platform.company_name || 'Unknown'}
                    width={32}
                    height={32}
                    className="bg-[#ECEEF0] w-8 h-8 p-1 rounded-md"
                    onError={(e) => e.target.src = '/nought-logo.svg'} // Handle broken images
                  />
                    <h2 className="text-sm font-semibold">{platform.company_name || 'Unnamed Platform'}</h2>
                  </div>

                  <div className="relative">
                    <button onClick={() => toggleMenu(index)} className="p-2 rounded-md hover:bg-gray-100">
                      <FiMoreVertical size={15} />
                    </button>

                    {openMenu === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md z-10 transition-opacity duration-200 ease-in-out">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                        <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Delete</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center my-4 px-4">
                  <p className="text-sm font-semibold text-gray-500">Templates</p>
                  <div className="flex items-center text-sm gap-2">
                    <FaArrowUp className="text-green-500" />
                    <p>{platform.number_of_templates}</p>
                  </div>
                </div>

                <Link href={`/platform/template/${platform.platform_id}`}>
                  <button className="mt-3 w-full border border-black py-2 rounded-lg text-sm hover:bg-gray-900 hover:text-white font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-700 text-sm">
              Showing <span className="border border-default-400 p-2 mx-2">{Math.min(indexOfLastPlatform, displayedPlatforms.length)}</span> of{' '}
              <span className="ms-2 text-default-400">{displayedPlatforms.length}</span>
            </p>

            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No platforms available in this category.</p>
      )}
    </div>
  );
}

export default SecurityHub;

