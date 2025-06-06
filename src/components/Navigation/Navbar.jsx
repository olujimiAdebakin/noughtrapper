"use client";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useStateContext } from "../../providers/contextProvider";
import SearchComponent from "../reusable/SearchComponent";
import Cookies from "js-cookie"; // Use js-cookie for client-side cookie access

const Navbar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize, pageTitle } =
    useStateContext();
  const [userName, setUserName] = useState("User");

  // Extract user name from email cookie
  useEffect(() => {
    const email = Cookies.get("email"); // Read email cookie using js-cookie
    if (email) {
      // Extract name from email (e.g., john.doe@example.com -> John Doe)
      const name = email
        .split("@")[0]
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      setUserName(name);
    }
  }, []);

  // Handle responsive menu
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    setActiveMenu(screenSize > 1060);
  }, [screenSize, setActiveMenu]);

  // Placeholder user data
  const currentUser = { role: "agent" };
  const subTitle =
    currentUser.role === "admin" ? "Police Crime Input System" : "";

  return (
    <div className="flex justify-between items-center py-2 px-10 bg-white">
      {/* Left Section: Page Title */}
      <div>
        <h1 className="text-[#1B212D] text-2xl font-semibold">{pageTitle}</h1>
      </div>

      {/* Right Section: Search, Notifications, and User Dropdown */}
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-6">
          <SearchComponent />
          <Image
            src="/notification.png"
            alt="notification"
            width={24}
            height={24}
          />
        </div>

        <div className="flex items-center gap-3 bg-[#FAFAFA] p-2 rounded-full w-[215px]">
          <Image src="/Avatar.png" alt="User Avatar" width={36} height={36} />
          <span className="text-[#192027] text-sm font-semibold">
            {userName}
          </span>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <IoMdArrowDropdown className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-3">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-xs text-[#54667A]">
                  {userName}
                </p>
              </DropdownItem>
              {subTitle && (
                <DropdownItem key="role-info" className="text-xs text-gray-500">
                  {subTitle}
                </DropdownItem>
              )}
              <DropdownItem key="settings">Profile Settings</DropdownItem>
              <DropdownItem key="settings">Help Center</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
