import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

const chartData = [
  { name: "Jan", openRate: 800, ctr: 500, bounce: 200 },
  { name: "Feb", openRate: 900, ctr: 600, bounce: 300 },
  { name: "Mar", openRate: 850, ctr: 550, bounce: 250 },
  { name: "Apr", openRate: 950, ctr: 650, bounce: 350 },
  { name: "May", openRate: 1000, ctr: 700, bounce: 400 },
  { name: "Jun", openRate: 1100, ctr: 800, bounce: 450 },
  { name: "Jul", openRate: 1050, ctr: 750, bounce: 400 },
  { name: "Aug", openRate: 1020, ctr: 720, bounce: 380 },
  { name: "Sep", openRate: 1080, ctr: 780, bounce: 420 },
  { name: "Oct", openRate: 1120, ctr: 820, bounce: 460 },
  { name: "Nov", openRate: 1150, ctr: 850, bounce: 500 },
  { name: "Dec", openRate: 1200, ctr: 900, bounce: 550 },
];

// Customizable legend labels
const legendLabels = {
  openRate: "Open rate",
  ctr: "CTR",
  bounce: "Bounce rate",
};

// Colors for bars and legend dots
const legendColors = {
  openRate: "#bebebe",
  ctr: "#686868",
  bounce: "#000000",
};

// Legend component
const CustomLegend = () => {
  return (
    <div className="flex space-x-4 mb-4">
      {Object.entries(legendLabels).map(([key, label]) => (
        <div key={key} className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: legendColors[key] }}></span>
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );
};

const ChartSection = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value === "this-year" ? currentYear : value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your campaigns</h2>
        <select
          className="border px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm"
          value={selectedYear === currentYear ? "this-year" : selectedYear}
          onChange={handleYearChange}
        >
          <option value="this-year">This Year</option>
          <option value="2023">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>

      <CustomLegend />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 30, bottom: 5 }} barSize={30} >
          <XAxis dataKey="name" />
          <YAxis>
            <Label
                value="Emails Sent"
                angle={-90}
                position="insideLeft"
                offset={-15}
                style={{ textAnchor: "middle", fill: "#4B5563", fontSize: "14px" }} 
            />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="bounce" stackId="a" fill={legendColors.bounce} />
          <Bar dataKey="ctr" stackId="a" fill={legendColors.ctr} />
          <Bar dataKey="openRate" stackId="a" fill={legendColors.openRate} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
