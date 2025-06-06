import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import React from 'react'

export default function CampaignEmployStats() {

    const [selectedTab, setSelectedTab] = useState("today");

    const dataByTab = {
        today: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 150,
          },
          {
            title: "Links Clicked",
            number: 150,
          },
          {
            title: "Credentials Entered",
            number: 150,
          },
        ],
        last24hrs: [
          {
            title: "Total Emails Sent",
            number: 150,
          },
          {
            title: "Emails Opened",
            number: 150,
          },
          {
            title: "Links Clicked",
            number: 150,
          },
          {
            title: "Credentials Entered",
            number: 150,
          },
        ],
        last7days: [
            {
                title: "Total Emails Sent",
                number: 150,
              },
              {
                title: "Emails Opened",
                number: 150,
              },
              {
                title: "Links Clicked",
                number: 150,
              },
              {
                title: "Credentials Entered",
                number: 150,
              },
        ],
        last30days: [
            {
                title: "Total Emails Sent",
                number: 150,
              },
              {
                title: "Emails Opened",
                number: 150,
              },
              {
                title: "Links Clicked",
                number: 150,
              },
              {
                title: "Credentials Entered",
                number: 150,
              },
        ],
        last12months: [
            {
                title: "Total Emails Sent",
                number: 150,
              },
              {
                title: "Emails Opened",
                number: 150,
              },
              {
                title: "Links Clicked",
                number: 150,
              },
              {
                title: "Credentials Entered",
                number: 150,
              },
        ],
        alltime: [
            {
                title: "Total Emails Sent",
                number: 150,
              },
              {
                title: "Emails Opened",
                number: 150,
              },
              {
                title: "Links Clicked",
                number: 150,
              },
              {
                title: "Credentials Entered",
                number: 150,
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
