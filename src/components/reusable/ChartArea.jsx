import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Button } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";

export default function ChartArea() {
  const data = [
    { month: "Jan", thisYear: 13000, lastYear: 8000 },
    { month: "Feb", thisYear: 10000, lastYear: 12000 },
    { month: "Mar", thisYear: 12000, lastYear: 14000 },
    { month: "Apr", thisYear: 15000, lastYear: 9000 },
    { month: "May", thisYear: 25000, lastYear: 8000 },
    { month: "Jun", thisYear: 22000, lastYear: 15000 },
    { month: "Jul", thisYear: 22000, lastYear: 15000 },
    { month: "Aug", thisYear: 22000, lastYear: 17000 },
    { month: "Sep", thisYear: 22000, lastYear: 17000 },
    { month: "Oct", thisYear: 22000, lastYear: 17000 },
    { month: "Nov", thisYear: 22000, lastYear: 17000 },
    { month: "Dec", thisYear: 22000, lastYear: 17000 },
  ];

  return (
    <>
      <div className="flex w-full items-start gap-6 flex-1 basis-0 shrink-0">
        <Card className="w-full p-4">
          <div className="flex items-center gap-8 rounded-lg bg-white">
            <div className="flex rounded-lg bg-white mt-4">
              <Tabs aria-label="Option" aria-labelledby="tabs">
                <Tab
                  key="total users"
                  title="Total Users"
                  className="text-[#1C1C1C] text-[14px] font-semibold"
                ></Tab>
                <Tab
                  key="total project"
                  title="Total Project"
                  className="text-[#1C1C1C] text-[14px] font-semibold"
                ></Tab>
                <Tab
                  key="operating status"
                  title="Operating Status"
                  className="text-[#1C1C1C] text-[14px] font-semibold"
                ></Tab>
              </Tabs>
            </div>

            <div>
              <span className="max-w-xs text-[rgba(28,28,28,0.20)] font-normal text-sm border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                |
              </span>
            </div>

            <div className="flex items-center content-center gap-5 self-stretch flex-wrap rounded-[8px]">
              <div className="flex items-center gap-2 rounded-lg">
                <Image src="/Dot.png" alt="dot" width={15} height={15} />
                <span>This Year</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg">
                <Image src="/dotgreen.png" alt="dot" width={15} height={15} />
                <span>Last Year</span>
              </div>
            </div>
          </div>

          {/* <CustomLegend /> */}

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                  ticks={[0, 10000, 20000, 30000]}
                  domain={[0, 30000]}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="thisYear"
                  stroke="#1F2937"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#E5E7EB"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  );
}
