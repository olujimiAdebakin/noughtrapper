'use client';

import React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import OverView from '../../../../components/reusable/OverView';
import CampaignDate from '../../../../components/pages/campaigns/CampaignDate';
import ExamStats from '../../../../components/pages/exams/ExamStats';
import ExamAwarenessDash1 from '../../../../components/pages/exams/ExamAwarenessDash1';
import PublishedExam from '../../../../components/pages/exams/PublishedExam';
import DraftExam from '../../../../components/pages/exams/DraftExam';

export default function page() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('PublishedCampaign');

    return (
        <div>
            <div className='p-6 space-y-6'>
                <ExamAwarenessDash1 />
                <div>
                    <OverView />
                </div>

                <div>
                    <CampaignDate />
                </div>

                <div>
                    <ExamStats />
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
                        <PublishedExam />
                    ) : (
                        <DraftExam />

                    )}
                </div>
            </div>
        </div>
    );
}
