import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

export default function AwarenessCampaignDash1() {

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Cyber Awareness Campaigns </h1>
                <p className="text-gray-500 text-sm">Plan, execute, and track impactful campaigns to educate and protect against cyber threats.</p>
              </div>
              <Button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700" 
              onClick={() => router.push('/campaigns/create-campaign')}>
                + Create Campaigns
              </Button>
            </div>
    </div>
  )
}
