import { AiFillDashboard } from 'react-icons/ai';

import Image from 'next/image';

export const superAdminLinks = [
  {
    title: "MAIN MENU",
    links: [
      {
        address: "admin-dashboard",
        name: "Dashboard",
        icon: (
          <Image
            src="/Dashboard.png"
            alt="Dashboard"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
      {
        address: "platform",
        name: "Platforms",
        icon: (
          <Image
            src="/platform.png"
            alt="Platforms"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
      {
        address: "quishing",
        name: "Quishing",
        icon: (
          <Image
            src="/platform.png"
            alt="Platforms"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
      {
        address: "manage-clients",
        name: "Manage Clients",
        icon: (
          <Image
            src="/manageclient.png"
            alt="manageclient"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
      {
        address: "campaigns",
        name: "Campaigns",
        icon: (
          <Image
            src="/campaign.png"
            alt="campaign"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
       {
        address: "exams",
        name: "Exams",
        icon: (
          <Image
            src="/exam.png"
            alt="Exam"
            width={20}
            height={20}
            color="white"
          />
        ),
      },
    ],
  },
];

export const adminLink = [
	{
		title: '',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'users',
				name: 'Users',
				icon: <AiFillDashboard size={20} />,
			},
		],
	},
];
