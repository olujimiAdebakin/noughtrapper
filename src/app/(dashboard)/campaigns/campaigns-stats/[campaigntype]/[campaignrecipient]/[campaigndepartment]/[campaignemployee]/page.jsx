'use client'

import React from 'react';

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import CampaignDeptView from '../../../../../../../../components/pages/campaigns/CampaignDeptView';
import CampaignEmployStats from '../../../../../../../../components/pages/campaigns/CampaignEmployStats';
import EmployeeDetailsLeft from '../../../../../../../../components/pages/campaigns/EmployeeDetailsLeft';
import EmployeeDetailsRight from '../../../../../../../../components/pages/campaigns/EmployeeDetailsRight';
// import EmployeeDetailsLeft from '@/components/pages/campaigns/EmployeeDetailsLeft';
// import EmployeeDetailsRight from '@/components/pages/campaigns/EmployeeDetailsRight';
// import CampaignDeptView from '../../../../../../../components/pages/campaigns/CampaignDeptView';
// import CampaignEmployStats from '@/components/pages/campaigns/CampaignEmployStats';

export default function EmployeeDetails() {
    const [employee, setEmployee] = useState({
      email: "adeola.ogunleye@email.com",
      firstName: "James",
      lastName: "Adekunle",
      phone: "08034567890",
      dateCreated: "Friday, Sep 25, 2025",
      examsTaken: "20",
      address: "123 Main Street, Cityville",
      department: "Engineering",
      jobTitle: "Software Developer",
      manager: "Jane Smith",
      status: "Active",
      userId: "NOU-00101",
      ipAddress: "192.168.1.100",
      ipType: "IPv4",
      os: "Windows 11",
      browser: "Google Chrome 120.0",
      cpu: "Undefined",
      browserVersion: "Version-16.6",
      language: "En-English",
      city: "Lagos",
      country: "Nigeria",
      email: "darcelballentine@mail.com",
      password: "1234567890",
      address: "2715 Lalubu street, Oke Ilewo Abeokuta",
    });
  
    return (
      <div className='mx-10'>
        <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Cyber Awareness Campaigns</h1>
                <p className="text-gray-500 text-sm mr-10">Plan, execute, and track impactful campaigns to educate and protect against cyber threats.</p>
              </div>
              <Button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700">
                + Create Campaigns
              </Button>
        </div>

        <div>
          <CampaignDeptView/>
        </div>

        <div className='my-5'>
          <CampaignEmployStats/>
        </div>







        <div className="bg-white p-5 rounded-lg shadow-lg w-full text-lg">
          <h2 className='mb-5'>Employee Details</h2>
          <div className=" max-w-5xl grid grid-cols-5 gap-4">
            <div className='col-span-2'>
              <EmployeeDetailsLeft employee={employee} />
            </div>
            <div className='grid col-span-3'>
              <EmployeeDetailsRight employee={employee} />
            </div>
          </div>
        </div>
      </div>
    );
  }