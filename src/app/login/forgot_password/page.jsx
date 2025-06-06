'use client';

import { Card } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Mail, Lock,  ChevronLeft} from 'lucide-react';
import Image from 'next/image';

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
        <img src="/nought-logo.svg" alt="Noughtrapper Logo" className="h-10" />
        <h4 className="text-white font-semibold ms-2 text-xl">Noughttrapper</h4>
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {/* Background Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/nought-logo.svg"
            alt="Nought Logo"
            width={430}
            height={430}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
          />
        </div>

        {/* Login Card */}
        <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
          <div className="text-center text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
            <p className="text-xs mt-4">
            No worries! Just submit a password reset request, and we'll send a reset link to your email.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-red-500">Email</label>
            <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
            <input
              type="email"
              className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
            />
            </div>
          </div>

          <div className='mb-10'>
          <button className="w-full flex items-center justify-center gap-3 bg-red-500 text-white hover:bg-red-400 font-bold py-2 rounded-lg shadow-md">
            Reset Password <Lock className="text-white" size={20} />
          </button>
          <button onClick={() => router.push('/login')} 
          className="w-full flex items-center justify-center gap-3 mt-3 bg-opacity-0 text-white hover:text-red-500 font-semibold py-2 rounded-lg shadow-md">
          <ChevronLeft size={24} className="text-red-500" />
            Back to login screen
          </button>
          </div>
          <p className="text-center text-xs text-blue-400 mt-4">
            🔒 All information is safely secured
          </p>
        </Card>
      </div>
    </div>
  );
}
