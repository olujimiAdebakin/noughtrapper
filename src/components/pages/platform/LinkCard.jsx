"use client"

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function LinkCard({ platformDetails }) {
  const link = [
    {
      title: "Total Link Sent",
      number: "124",
      numbColor: "text-blue-500",
      stat: "18 Confirmed Today",
    },
    {
        title: "Total Clicked Link",
        number: "100",
        numbColor: "text-green-500",
        stat: "",
      },
      {
        title: "Total Opened Link",
        number: "100",
        numbColor: "text-yellow-500",
        stat: "",
      },
      {
        title: "Total Details Received",
        number: "100",
        numbColor: "text-red-500",
        stat: "",
      },
  ];

  return (
    <div className="gap-4 grid grid-cols-2 mt-4">
      {link.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="none"
          onPress={() => console.log("item pressed")}
          className="bg-white p-7 rounded-[16px] flex flex-col items-start font-semibold"
        >
          <CardBody>
            <div className="">
              <div className="text-[#1C1C1C] mb-3">
                {item.title}
              </div>

              <div className="flex justify-between">
                <p className={item.numbColor} >
                  {item.number}
                </p>
                <p className="">{item.stat}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
