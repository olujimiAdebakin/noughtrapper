'use client';

import { Button, Card } from '@nextui-org/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function VerifyPin() {
  const [pin, setPin] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
    if (value.length > 1) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
            <h2 className="text-2xl font-bold mb-2">Enter Pin</h2>
            <p className="text-xs mt-4">A 6-digit PIN will be sent to this email</p>
          </div>
          
          <div className="flex justify-center gap-2 mb-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="border border-red-500 bg-[#0f172a] text-white rounded-xl text-center w-12 h-12 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`PIN digit ${index + 1}`}
              />
            ))}
          </div>
          
          <Button 
            disabled={pin.includes('')} 
            className={`w-full font-bold py-2 rounded-lg shadow-md ${
              pin.includes('') ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 text-white'
            }`}
          >
            Submit
          </Button>
          <p className="text-center text-xs text-blue-400 mt-14">
            🔒 All information is safely secured
          </p>
        </Card>
      </div>
    </div>
  );
}
