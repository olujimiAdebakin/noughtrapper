


import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi";

export default function QrCard() {
    const router = useRouter();
  const qr = [
    {
      name: "Voice Activation",
      image: "/qr.png",
      icon: <HiOutlinePencil className="w-6 h-6" />,
      description: "View Details",
    },
    {
      name: "Camera Activation",
      image: "/qr.png",
      icon: <HiOutlinePencil className="w-6 h-6" />,
      description: "View Details",
    },
    {
      name: "Location Activation",
      image: "/qr.png",
      icon: <HiOutlinePencil className="w-6 h-6" />,
      description: "View Details",
    },
  ];

  return (
    <div className= "mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {qr.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1F2633] text-[16px] font-medium leading-6">
                {item.name}
              </span>
              <span className="text-gray-500 w-[40px] h-[40px] rounded-[100px] bg-[#F0F1F3] flex items-center justify-center gap-2">
                {item.icon}
              </span>
            </div>
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className=" p-[14px] flex mx-auto items-center gap-[8px] "
            />
            <p
              className="flex justify-center mx-auto items-center py-[8px] px-[16px] h-[40px] w-[300px] rounded-[4px] border border-[#001A38]  text-[#192027] text-[16px] font-medium cursor-pointer"
              onClick={() => router.push(`?qr=${item.name}`)}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}