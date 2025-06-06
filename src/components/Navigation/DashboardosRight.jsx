"use client";

import React, { useState, useEffect } from "react";
import { Cell, Pie, PieChart } from "recharts";



export default function DashboardosRight() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const locationData = [
    { name: "India", value: 49.78, color: "#39CEF3" },
    { name: "Canada", value: 35.67, color: "#FF6C36" },
    { name: "Mexico", value: 29.43, color: "#FFCC03" },
    { name: "Other", value: 22.65, color: "#72CA3D" },
  ];

  return (
    <div className="w-[48%] h-[452px] flex flex-col items-start rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-[14px] font-semibold mb-8 text-[#1C1C1C]">
        Traffic by Location
      </h2>

      <div className="flex w-full gap-[40px] items-center">
        {/* Chart Container */}
        <div className="w-[200px] h-[200px] relative lg:w-[250px] lg:h-[250px]">
          {isClient && (
            <PieChart width={250} height={250}>
              <Pie
                data={locationData}
                cx={125}
                cy={125}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {locationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </div>

        {/* Location Stats */}
        <div className="flex flex-col space-y-4 ">
          {locationData.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-[150px] lg:w-[180px]"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: location.color }}
                />
                <span className="text-[#1C1C1C] text-[12px] font-normal">{location.name}</span>
              </div>
              <span className="font-semibold text-[12px] text-[#1C1C1C]">
                {location.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
