'use client';
import { useRouter } from 'next/navigation';
// import CenteredModal from '../CenteredModal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useStateContext } from '../../providers/contextProvider';
// import { signOut } from 'next-auth/react';
import { FaWindowClose } from 'react-icons/fa';
// import CirclesBarLoader from '../CircleBarLoader';
import { useState } from 'react';

function DashboardLayout({ children }) {
	const {
		activeMenu,
		darkToggle,
		login,
		openLogoutModal,
		setOpenLogoutModal,
	} = useStateContext();

	const router = useRouter();

	const [isSignOut, setSignOut] = useState(false);

	const handleLogout = async () => {
		setSignOut(true);
		localStorage.removeItem('hasSeenModal', 'true');
		const data = await signOut({ redirect: false, callbackUrl: '/' });
		router.push(data.url);
	};
	// const { activeMenu, darkToggle, login } = false;

	return (
    <>
      <div className={`${darkToggle && "dark"} overflow-x-hidden`}>
        <div className="flex relative dark:bg-main-dark-bg pr-0 ">
          {activeMenu ? (
            <div
              className={
                "w-full h-full md:w-[17.5rem] fixed sidebar bg-white dark:bg-secondary-dark-bg"
              }
            >
              <Sidebar />
            </div>
          ) : (
            <div className={`${"w-0 dark:bg-secondary-dark-bg"} `}>
              <Sidebar />
            </div>
          )}
          <div
            className={`
						  ${
								activeMenu ? 'md:ml-[17.5rem] w-full' : 'flex-2'
							} dark:bg-main-bg bg-white min-h-screen w-full`}
					>
						<div
							className={`${' md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'}`}
						>
							<Navbar />
						</div>
						<div className=' min-h-screen'>
							<div className=' bg-[#F9FBFD] '>
								<div className=' bg-[#F9FBFD] '>{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isSignOut && (
				<div className='loader-bg-white flex-col'>
					{/* <CirclesBarLoader /> */}
					<h1 className='text-[1.3rem] mt-2'>Signing you out...</h1>
				</div>
			)}
		</>
	);
}

export default DashboardLayout;
