"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaArrowUp } from "react-icons/fa";
import { MoreVertical } from "lucide-react";

export default function ClientsCard() {
  const publishedPlatforms = [
    { id: "facebook", name: "Facebook", icon: "facebook", templates: 50 },
    { id: "telegram", name: "Telegram", icon: "telegram", templates: 50 },
    { id: "instagram", name: "Instagram", icon: "instagram", templates: 50 },
    { id: "paypal", name: "Paypal", icon: "paypal", templates: 50 },
    { id: "netflix", name: "Netflix", icon: "netflix", templates: 50 },
    { id: "whatsapp", name: "WhatsApp", icon: "whatsapp", templates: 50 },
    { id: "twitter", name: "Twitter", icon: "twitter", templates: 50 },
    { id: "microsoft", name: "Microsoft", icon: "microsoft", templates: 50 },
    { id: "linkedin", name: "LinkedIn", icon: "linkedin", templates: 50 },
    { id: "wordpress", name: "WordPress", icon: "wordpress", templates: 50 },
    { id: "discord", name: "Discord", icon: "discord", templates: 50 },
    { id: "vimeo", name: "Vimeo", icon: "vimeo", templates: 50 },
    { id: "quora", name: "Quora", icon: "quora", templates: 50 },
    { id: "youtube", name: "YouTube", icon: "youtube", templates: 50 },
    { id: "tiktok", name: "TikTok", icon: "tiktok", templates: 50 },
    { id: "snapchat", name: "Snapchat", icon: "snapchat", templates: 50 },
  ];

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="container mt-4">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {publishedPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="p-6 rounded-lg shadow-sm bg-white relative"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-3">
                <Image
                  src={`/icons/${platform.icon}.svg`}
                  alt={platform.name}
                  width={30}
                  height={30}
                  className="bg-[#ECEEF0] w-14 h-14 p-2 rounded-md"
                />
                <h2 className="text-lg font-semibold">{platform.name}</h2>
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleMenu(platform.id)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <MoreVertical size={20} />
                </button>

                {openMenu === platform.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center my-5 px-5">
              <p className="font-semibold text-gray-500">Templates</p>
              <div className="flex items-center gap-2">
                <FaArrowUp className="text-blue-500" />
                <p>{platform.templates}</p>
              </div>
            </div>

        
              <button className="mt-3 w-full border border-black py-2 rounded-lg hover:bg-gray-100 text-lg font-semibold">
                View Details
              </button>
           
          </div>
        ))}
      </div>
    </div>
  );
}
