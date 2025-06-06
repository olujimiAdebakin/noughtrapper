'use client';

import { Button } from '@nextui-org/react';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import OverView from '../../../components/reusable/OverView';
import CampaignDate from '../../../components/pages/campaigns/CampaignDate';
import ClientsTable from '../../../components/pages/campaigns/ClientsTable';
import DummClient from '../../../components/pages/exams/DumClient';
import ExamStats from '../../../components/pages/exams/ExamStats';

function LoadingFallback() {
    return (
        <div className='pt-[24px] px-[16px] bg-[#F9FBFD] h-screen'>
            <p className='text-[#48596D] text-[14px] font-medium text-center'>
                Loading...
            </p>
        </div>
    );
}

function Exams() {
    const [activeTab, setActiveTab] = useState('income');

    const router = useRouter();
    const searchParams = useSearchParams();
    const showForm = searchParams.get('AddClients') === 'true';
    const [clients, setClients] = useState(null);

    useEffect(() => {
        // Simulate empty data for now (replace with API call later)
        setClients([]);
    }, []);

    if (showForm) {
        return <ClientsForm />;
    }

    return (
        <div className='p-6 space-y-6'>
            {/* Header Section */}
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold mb-2'>
                        Cyber Security Comprehensive Exam
                    </h1>
                    <p className='text-gray-500 text-sm'>
                        Evaluating Expertise and Readiness in Digital Protection
                    </p>
                </div>
                <Button
                    className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700'
                    onClick={() => router.push('/exams/create-exam')}
                >
                    + Create Exam
                </Button>
            </div>

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
                <div className='mt-12'>
                    {clients === null ? (
                        <p className='text-[#48596D] text-[14px] font-medium text-center'>
                            Loading...
                        </p>
                    ) : clients.length === 0 ? (
                        <DummClient />
                    ) : (
                        <ClientsTable clients={clients} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ManageExamsPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Exams />
        </Suspense>
    );
}
