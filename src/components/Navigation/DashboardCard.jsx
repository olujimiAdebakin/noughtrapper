// "use client"

// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// export default function DashboardCard() {
//   const list = [
//     {
//       title: "Clicks",
//       img: "/arrowgreen.png",
//       number: "$5.50",
//       stat: "",
//     },
//     {
//       title: "Opened Email",
//       img: "/arrowred.png",
//       number: "$3.00",
//       stat: "",
//     },
//     {
//       title: "Clicked Emails",
//       img: "/arrowgreen.png",
//       number: "$10.00",
//       stat: "",
//     },
//     {
//       title: "Number of Campaigns Created",
//       img: "/arrowgreen.png",
//       number: "$5.30",
//       stat: "",
//     },
//   ];

//   return (
//     <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-4">
//       {list.map((item, index) => (
//         // eslint-disable no-console 
//         <Card
//           key={index}
//           isPressable
//           shadow="sm"
//           onPress={() => console.log("item pressed")}
//           className="bg-[#E3F5FF] h-[112px] p-[24px] rounded-[16px] flex flex-col items-start"
//         >
//           <CardBody className="overflow-visible p-0">
//             <div className="flex flex-col items-center gap-3">
//               <span className="text-sm text-[#1C1C1C] font-normal">
//                 {item.title}
//               </span>

//               <div className="flex items-center gap-2">
//                 <span className="text-[#1C1C1C] text-[24px] font-medium">
//                   {item.number}
//                 </span>
//                 <strong className="text-[#1C1C1C] text-[12px] font-normal">
//                   {item.stat}
//                 </strong>
//                 <Image alt={item.title} className="w-5 h-5" src={item.img} />
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       ))}
//     </div>
//   );
// }


'use client'

import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import { useState } from "react";
import Calendar from "../reusable/Calendar";

export default function DashboardCard() {
  const [selectedTab, setSelectedTab] = useState("today");

  const dataByTab = {
    today: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "5.50",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "3.00",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "10.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "5.30",
        percentage: "+11.02%",
      },
    ],
    last24hrs: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "4.20",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "2.50",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "8.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "4.00",
        percentage: "+11.02%",
      },
    ],
    last7days: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "40.00",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "30.00",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "70.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "35.00",
        percentage: "+11.02%",
      },
    ],
    last30days: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "100.00",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "80.00",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "150.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "75.00",
        percentage: "+11.02%",
      },
    ],
    last12months: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "500.00",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "400.00",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "700.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "350.00",
        percentage: "+11.02%",
      },
    ],
    alltime: [
      {
        title: "Clicks",
        img: "/arrowgreen.png",
        number: "1000.00",
        percentage: "+11.02%",
      },
      {
        title: "Opened Email",
        img: "/arrowred.png",
        number: "900.00",
        percentage: "+11.02%",
      },
      {
        title: "Clicked Emails",
        img: "/arrowgreen.png",
        number: "1500.00",
        percentage: "+11.02%",
      },
      {
        title: "Number of Campaigns Created",
        img: "/arrowgreen.png",
        number: "750.00",
        percentage: "+11.02%",
      },
    ],
  };

  const list = dataByTab[selectedTab] || [];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tabs Section */}
      <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-sm p-2">
        <Tabs
          aria-label="Dashboard Stats"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key)}
          // variant="bordered"
          className="w-full"
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

        <Calendar />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            shadow="sm"
            className="bg-[#E3F5FF] p-[24px] rounded-lg flex flex-col justify-between"
          >
            <CardBody className="overflow-visible p-0">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-[#1C1C1C] font-medium">
                  {item.title}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[#1C1C1C] text-[24px] font-semibold">
                    {item.number}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-[#1C1C1C] text-xs font-normal">{item.percentage}</span>
                    <Image
                      alt={item.title}
                      className="w-6 h-6"
                      src={item.img}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
