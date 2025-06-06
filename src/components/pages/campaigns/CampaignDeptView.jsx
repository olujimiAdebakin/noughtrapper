"use client";

import { useStateContext } from "../../../providers/contextProvider";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";

export default function CampaignDeptView() {
  const { currentDateTime, setCurrentDateTime } = useStateContext();

  // functionality for time & date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = format(now, "EEEE, MMM d yyyy");
      const formattedTime = format(now, "HH:mm:ss a");
      setCurrentDateTime({ date: formattedDate, time: formattedTime });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [setCurrentDateTime]);



  const { campaigntype, campaigndepartment } = useParams();
  
    console.log("Campaign department:", campaigndepartment);

  
    const formatText = (text) => {
      return text
        .split("-") // Split words by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
        .join(" "); // Join back with spaces
    };


  return (
    <div className="bg-white flex  w-full items-center justify-between gap-24 px-4 py-4 rounded-lg mt-[16px]">
      <div className="">
        <h2 className="text-[#6B7280] text-[16px] font-semibold">{formatText(campaigntype)} Overview ({formatText(campaigndepartment)} Department) </h2>
      </div>

      {currentDateTime ? (
        <div className="flex items-center gap-4">
          {/* Date */}
          <span className="text-[#667E99] text-[16px] font-normal">
            <strong className="text-[#667E99]">
              {currentDateTime.date.split(",")[0]}
            </strong>
            , {currentDateTime.date.split(",")[1]}
          </span>

          {/* Time */}
          <span className="text-[#667E99] text-[16px] font-normal">
            {currentDateTime.time}
          </span>
        </div>
      ) : (
        <span className="text-[#667E99] text-[16px] font-medium">
          Loading...
        </span>
      )}
    </div>
  );
}
