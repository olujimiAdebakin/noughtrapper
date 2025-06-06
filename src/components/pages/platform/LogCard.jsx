"use client"

import { Card, CardBody } from "@nextui-org/react";

export default function LogCard() {
  const stats = [
    {
      title: "Total Logged",
      number: "1024",
      numbColor: "text-blue-500",
      stat: "",
    },
    {
      title: "Active",
      number: "100",
      numbColor: "text-green-500",
      stat: "",
    },
    {
      title: "Disabled",
      number: "124",
      numbColor: "text-red-500",
      stat: "",
    },
  ];

  return (
    <div className="gap-4 grid grid-cols-3 mt-4">
      {stats.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="none"
          onPress={() => console.log("item pressed")}
          className="bg-white p-7 rounded-[16px] flex flex-col items-start"
        >
          <CardBody>
            <div>
              <div className="text-[#1C1C1C] mb-3">
                {item.title}
              </div>

              <div className="flex justify-between font-semibold">
                <p className={item.numbColor}>{item.number}</p>
                <p>{item.stat}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
