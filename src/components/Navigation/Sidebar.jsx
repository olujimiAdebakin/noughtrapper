import React from 'react';

import { MdOutlineCancel } from 'react-icons/md';
import { PiCaretLeftLight } from 'react-icons/pi';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { superAdminLinks, adminLink } from '../../links';
import Link from 'next/link';
import { useStateContext } from '../../providers/contextProvider';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { BiLogOut, BiSupport } from 'react-icons/bi';

const Sidebar = () => {
	// Destructure state and functions from the context provider
	const {
		activeMenu,
		setActiveMenu,
		screenSize,
		openLogoutModal,
		setOpenLogoutModal,
		pageTitle,
		setPageTitle,
	} = useStateContext();

	const router = useRouter();
	const pathname = usePathname();

	// Determine the user's role and set the appropriate links
	const userInfo = { role: 'super-admin' }; // Simulating a user role

	let links;
	let nav;
	if (userInfo?.role === 'admin') {
		links = adminLink;
		nav = 'admin';
	} else if (userInfo?.role === 'super-admin') {
		links = superAdminLinks;
		nav = 'super-admin';
	}

	// Styles for active and normal links
	const activeLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2 bg-[#54667A] text-white text-[16px] mt-1 rounded-md';
	const normalLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 text-[#8C8D8E] font-[400] text-[16px] dark:text-gray-200 dark:hover:text-black hover:bg-[#54667A] mt-1 rounded-md';

	// Close the sidebar on small screens
	const handleCloseSidebar = () => {
		if (activeMenu && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	return (
		<>
			{activeMenu && (
				<div className='h-screen flex flex-col bg-[#001A38] pl-3'>
					<div className='flex justify-between items-center mt-5'>
						{/* Logo  */}
						<div className='relative w-full flex justify-center'>
							<Image
								src='/nought.png'
								alt='noughtaegis-logo'
								width={50}
								height={50}
							/>
						</div>
						{/* Sidebar close button */}
						{/* <button
              type="button"
              onClick={() => setActiveMenu((prevState) => !prevState)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <PiCaretLeftLight className="font-[700] text-black cursor-pointer ml-[10px] text-[2rem]" />
            </button> */}
					</div>

					{/* Sidebar menu links */}
					<div className='mt-3 w-[256px]'>
						{links?.map((item) => (
							<div key={item.title} className=''>
								<p className='text-[10px] font-bold text-[#F0F2F5] m-6 mt-7'>
									{item.title}
								</p>
								{item.links.map((link, index) => (
									<Link
										href={`/${link.address}`}
										key={index}
										onClick={() => {
											handleCloseSidebar();
											setPageTitle(link.name);
										}}
										className={
											pathname.includes(link.address)
												? activeLink
												: normalLink
										}
									>
										{link.icon}
										<span className='font-normal text-[16px] text-[#F0F2F5] lg:m-0 xl:m-1 2xl:m-1'>
											{link.name}
										</span>
									</Link>
								))}
							</div>
						))}
					</div>

					{/* Admin settings and logout */}
					<div className='lg:mt-[6rem] xl:mt-[6rem] 2xl:mt-[2rem] pr-2.5'>
						<p className='m-3 mt-4 text-[10px] font-bold text-[#F0F2F5] pl-3'>
							Admin
						</p>
						<Link
							href={'/settings'}
							className={
								pathname.includes('/settings')
									? activeLink
									: normalLink
							}
						>
							<FiSettings color='#D0D7DF' />
							<span className='text-[16px] text-[#F0F2F5] font-normal'>
								Settings
							</span>
						</Link>
						<Link
							href={'/logout'}
							className={
								pathname.includes('/logout')
									? activeLink
									: normalLink
							}
						>
							<BiLogOut color='#D0D7DF' />
							<span className='text-[16px] text-[#F0F2F5] font-normal'>
								logout
							</span>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
