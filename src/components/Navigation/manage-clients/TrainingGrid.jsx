

import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa"; // Assuming react-icons is used

const trainings = [
  {
    name: "Phishing Awareness Training",
    score: 80,
    change: 5,
    date: "23/02/2025",
  },
  { name: "Cybersecurity Basics", score: 75, change: -2, date: "15/02/2025" },
  { name: "Data Privacy Essentials", score: 92, change: 8, date: "20/02/2025" },
  {
    name: "Network Security Protocols",
    score: 68,
    change: 3,
    date: "10/02/2025",
  },
  {
    name: "Social Engineering Defense",
    score: 85,
    change: 6,
    date: "25/02/2025",
  },
  {
    name: "Cloud Security Training",
    score: 77,
    change: -4,
    date: "18/02/2025",
  },
  {
    name: "Incident Response Basics",
    score: 88,
    change: 7,
    date: "22/02/2025",
  },
  {
    name: "Password Management Skills",
    score: 73,
    change: 2,
    date: "12/02/2025",
  },
  {
    name: "Malware Prevention Course",
    score: 90,
    change: 9,
    date: "26/02/2025",
  },
  {
    name: "Email Security Best Practices",
    score: 82,
    change: -1,
    date: "14/02/2025",
  },
  {
    name: "Firewall Configuration Training",
    score: 79,
    change: 4,
    date: "19/02/2025",
  },
  { name: "Ransomware Awareness", score: 86, change: 5, date: "21/02/2025" },
  {
    name: "Secure Coding Fundamentals",
    score: 65,
    change: -3,
    date: "08/02/2025",
  },
  { name: "VPN Usage and Safety", score: 83, change: 6, date: "24/02/2025" },
  { name: "Mobile Device Security", score: 78, change: 1, date: "17/02/2025" },
  {
    name: "Insider Threat Awareness",
    score: 91,
    change: 10,
    date: "27/02/2025",
  },
  { name: "Encryption Essentials", score: 74, change: -2, date: "13/02/2025" },
  {
    name: "Physical Security Training",
    score: 87,
    change: 7,
    date: "16/02/2025",
  },
  { name: "DDoS Attack Prevention", score: 70, change: 3, date: "11/02/2025" },
  {
    name: "Compliance and Regulation",
    score: 89,
    change: 8,
    date: "22/02/2025",
  },
  { name: "API Security Basics", score: 76, change: -5, date: "09/02/2025" },
  {
    name: "Penetration Testing Intro",
    score: 84,
    change: 4,
    date: "20/02/2025",
  },
  { name: "Remote Work Security", score: 81, change: 6, date: "25/02/2025" },
  { name: "IoT Device Safety", score: 67, change: -1, date: "07/02/2025" },
  {
    name: "Advanced Threat Detection",
    score: 93,
    change: 9,
    date: "26/02/2025",
  },
];

const TrainingGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {trainings.map((training, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-[10px] flex-1 flex-shrink-0 self-stretch p-4 rounded-xl border-1 border-[#F5F6F7] bg-white"
        >
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2>{training.name}</h2>
            <div className="flex flex-col items-start gap-2">
              <span className="text-[#667185] font-medium text-[16px]">
                Score
              </span>
              <div className="flex items-center gap-[10px]">
                <span>{training.score}</span>
                <div
                  className={`flex py-0 px-1 rounded-xl items-center justify-center ${
                    training.change >= 0 ? "bg-[#E7F6EC]" : "bg-[#FFE6E6]"
                  }`}
                >
                  <FaLongArrowAltUp
                    className={`w-3 h-3 ${
                      training.change >= 0 ? "text-[#036B26]" : "text-[#B00020]"
                    }`}
                  />
                  <span
                    className={`text-center text-[12px] font-medium ${
                      training.change >= 0 ? "text-[#036B26]" : "text-[#B00020]"
                    }`}
                  >
                    {training.change >= 0
                      ? ` +${training.change}%`
                      : ` ${training.change}%`}
                  </span>
                </div>
              </div>
            </div>
            <small className="text-[#667185] text-[10px] font-normal">
              {training.date}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingGrid;