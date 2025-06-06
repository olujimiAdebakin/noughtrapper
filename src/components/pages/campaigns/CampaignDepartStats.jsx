import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import React from 'react'

export default function CampaignDepartStats() {

    const [selectedTab, setSelectedTab] = useState("today");

    const dataByTab = {
        today: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
        last24hrs: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
        last7days: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
        last30days: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
        last12months: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
        alltime: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 130,
          },
          {
            title: "Links Clicked",
            number: 90,
          },
          {
            title: "Credentials Entered",
            number: 50,
          },
        ],
      };
    
      const list = dataByTab[selectedTab] || [];
    
  return (
    <div>
      <h5 className="font-semibold text-2xl mb-5">Engagement Metrics</h5>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  <span><p>Employee</p></span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
