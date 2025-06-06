'use client'

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaRegEdit, FaRegEnvelope, FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa";
import {DatePicker} from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";

export default function accountInfo() {
  const [dob, setDob] = useState(new Date(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Account Information</h2>
          <p className="text-sm text-gray-500">Update your account information</p>
        </div>
        <FaRegEdit className="text-red-500 cursor-pointer text-xl" />
      </div>
      
      <h3 className="mt-6 text-md font-semibold">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input label="First Name" placeholder="Tosin" className="w-full" />
        <Input label="Last" placeholder="Fakile" className= "w-full" />
        <div>
          <label className="text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="relative">
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
        </div>
        <Input label="Mobile Number" placeholder="+123 456 7890" className="w-full mt-5" />
        <Input
          label="Email"
          placeholder="fakiletosin@noughtaegis.secure"
          className="w-full"
          startContent={<FaRegEnvelope className="text-gray-500" />}
        />
        <br />
        <div className="relative">
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            className="w-full"
            startContent={<FaLock className="text-gray-500" />}
            endContent={
              showPassword ? (
                <FaRegEye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
        </div>
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full"
            startContent={<FaLock className="text-gray-500" />}
            endContent={
              showConfirmPassword ? (
                <FaRegEye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
          />
        </div>
      </div>

      <Button color="danger" className="mt-6">Update</Button>
    </div>
  );
}
