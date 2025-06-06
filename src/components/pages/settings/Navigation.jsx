import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {

    const pathname = usePathname();

     const tabs = [
        { name: "Profile", href: "/settings" },
        { name: "Security", href: "/settings/security" },
        { name: "Preferences", href: "/settings/preferences" },
        { name: "Team", href: "/settings/team" },
      ];

  return (
    <div>
      <div className="flex space-x-4 bg-white p-1 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium ${
              pathname === tab.href ? "bg-gray-100 border-blue-600 text-black rounded-xl" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
