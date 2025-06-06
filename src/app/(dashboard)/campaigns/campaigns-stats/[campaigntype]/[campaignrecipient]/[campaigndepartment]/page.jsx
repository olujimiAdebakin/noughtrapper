'use client'

import React from 'react'

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CampaignDeptView from '../../../../../../../components/pages/campaigns/CampaignDeptView';
import CampaignDate from "../../../../../../../components/pages/campaigns/CampaignDate";
import CampaignDepartStats from "../../../../../../../components/pages/campaigns/CampaignDepartStats";
import CampaignBar from '../../../../../../../components/pages/campaigns/CampaignBar';
import CampaignDepartTable from '../../../../../../../components/pages/campaigns/CampaignDepartTable';

export default function page() {
  const router = useRouter();

  return (
    <div>
      <div className="p-6 space-y-6">
           
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Cyber Awareness Campaigns</h1>
                <p className="text-gray-500 text-sm">Plan, execute, and track impactful campaigns to educate and protect against cyber threats.</p>
              </div>
              <Button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700">
                + Create Campaigns
              </Button>
            </div>
      
            <div>
              <CampaignDeptView />
            </div>
      
            <div>
              <CampaignDate />
            </div>
      
            <div>
              <CampaignDepartStats />
            </div>
      
           <div className='mt-10 mb-10'>
             <CampaignBar />
           </div>

        <div>
          <CampaignDepartTable />
        </div>
  
      </div>
    </div>
  )
}
