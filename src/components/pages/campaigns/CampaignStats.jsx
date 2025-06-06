import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import React from 'react'

export default function CampaignStats({ campaigns }) {

    const [selectedTab, setSelectedTab] = useState("today");

    const dataByTab = {
        today: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns,
          },
        ],
        last24hrs: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes || 0,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated || 0,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns || 0,
          },
        ],
        last7days: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes || 0,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated || 0,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns || 0,
          },
        ],
        last30days: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes || 0,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated || 0,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns || 0,
          },
        ],
        last12months: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes || 0,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated || 0,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns || 0,
          },
        ],
        alltime: [
          {
            title: "Total Campaign Type",
            number: campaigns?.totalCampaignTypes || 0,
          },
          {
            title: "Total Campaign Created",
            number: campaigns?.totalCampaignsCreated || 0,
          },
          {
            title: "Total Active Campaign",
            number: campaigns?.totalActiveCampaigns || 0,
          },
        ],
      };
    
      const list = dataByTab[selectedTab] || [];
    
  return (
    <div>
      <h5 className="font-semibold text-2xl mb-5">Top Statistics</h5>
      <div className="grid grid-cols-3 gap-3">
        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            shadow="sm"
            className="bg-white p-[10px] rounded-lg flex flex-col justify-between"
          >
            <CardBody className="overflow-visible p-0">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-[#1C1C1C] font-semibold">
                  {item.title}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-blue-500">
                    {item.number}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
