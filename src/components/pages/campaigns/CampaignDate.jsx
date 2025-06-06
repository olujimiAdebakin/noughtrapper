'use client'

import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import {DatePicker} from "@nextui-org/react";

export default function CampaignDate() {
  
    const [selectedTab, setSelectedTab] = useState("today");

  

    return (
    <div className="w-full md:flex md:items-center md:justify-between">
      <div className="bg-white rounded-lg shadow-md">
        <Tabs
          aria-label="Dashboard Stats"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key)}
          variant="bordered"
          >
          <Tab
            key="today"
            title="Today"
            className="text-[#8598AD] text-[13px] font-medium"
          />
          <Tab
            key="last24hrs"
            title="Last 24hrs"
            className="text-[#8598AD] text-[13px] font-medium"
          />
          <Tab
            key="last7days"
            title="Last 7 Days"
            className="text-[#8598AD] text-[13px] font-medium"
          />
          <Tab
            key="last30days"
            title="Last 30 Days"
            className="text-[#8598AD] text-[13px] font-medium"
          />
          <Tab
            key="last12months"
            title="Last 12 Months"
            className="text-[#8598AD] text-[13px] font-medium"
          />
          <Tab key="alltime" title="All Time" />
        </Tabs>
      </div>

      <div>
        <DatePicker selectorButtonPlacement="start" className="md:max-w-[284px] md:mt-0 mt-5 bg-white rounded-lg" label="Select Date" />      
      </div>

    </div>
  )
}
