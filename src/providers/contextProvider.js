'use client';

import { useContext, createContext } from 'react';
import { useState } from 'react';
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [isClicked, setIsClicked] = useState();
	const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentDateTime, setCurrentDateTime] = useState("");
	// state for search bar toggle
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("browser")
  const [pageTitle, setPageTitle] = useState("Dashboard");
  // 
	const handleClick = (clicked) => {
		setIsClicked({ ...isClicked, [clicked]: true });
	};


	// function for dashboard searchbar toggle
	  const toggleSearchBar = () => {
    setIsSearchVisible((prev) => !prev);
  };



	return (
    <AuthContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        openLogoutModal,
        setOpenLogoutModal,
        isSearchVisible,
        toggleSearchBar,
        currentDateTime,
        setCurrentDateTime,
        activeTab,
        setActiveTab,
        pageTitle,
        setPageTitle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useStateContext = () => {
	return useContext(AuthContext);
};
