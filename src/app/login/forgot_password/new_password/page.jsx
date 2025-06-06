'use client';

import { Button, Card } from '@nextui-org/react';
import Image from 'next/image';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

export default function NewPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
        <img src="/nought-logo.svg" alt="Noughttrapper Logo" className="h-10" />
        <h4 className="text-white font-semibold ms-2 text-xl">Noughttrapper</h4>
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {/* Background Logo */}
        <Image
          src="/nought-logo.svg"
          alt="Nought Logo"
          width={430}
          height={430}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
        />

        {/* Password Reset Card */}
        <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-1">Create New Password</h2>
            <p>Enter your new password below</p>
          </div>

          {/* New Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-red-400">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Repeat Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-red-400">Repeat Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md">
            Save new Password
          </Button>

          <p className="text-center text-xs text-blue-400 mt-10">
            🔒 All information is safely secured
          </p>
        </Card>
      </div>
    </div>
  );
}
