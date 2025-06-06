"use client"


import Image from "next/image";
import ChartArea from "../reusable/ChartArea";

// import TabList from "../reusable/TabList";


export default function DashboardChart() {
    return (
      <>
        {/* dashboard chart section */}
        <div className="flex lg:w-full xl:w-full 2xl:w-full min-w-[662px] flex-col items-start gap-[16px] flex-shrink-0 rounded-2xl">
        
                
                {/* chart */}

                <ChartArea/>
        </div>
      </>
    );
}