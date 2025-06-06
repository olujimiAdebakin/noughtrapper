"use client"

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function TabList() {
  return (
    <div className="flex w-[600px] rounded-lg bg-white mt-4">
      <Tabs aria-label="Option" aria-labelledby="tabs">
        <Tab key="today" title="Today">
          <Card className="">
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab
          key="last 24hrs"
          title="Last 24hrs"
          className="text-[#8598AD] text-[13px] font-medium"
        >
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab
          key="last 7 days"
          title="Last 7 Days"
          className="text-[#8598AD] text-[13px] font-medium"
        >
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab
          key="last 30 days"
          title="Last 30 Days"
          className="text-[#8598AD] text-[13px] font-medium"
        >
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab
          key="last 12 months"
          title="Last 12 Months"
          className="text-[#8598AD] text-[13px] font-medium"
        >
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>

        <Tab
          key="all time"
          title="All Time"
          className="text-[#8598AD] text-[13px] font-medium"
        >
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
