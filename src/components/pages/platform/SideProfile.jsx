import React from 'react'

import Image from "next/image";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Mail, Lock } from "lucide-react";

function SideProfile() {
    return (
        <Card className="w-full shadow-lg rounded-xl overflow-hidden mt-4">

          <div className="bg-gray-900 h-20"></div>
    
          <div className="flex justify-center -mt-12">
            <Image
              src="/icons/avatar.svg"
              alt="Profile"
              width={80}
              height={80}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
    
          <CardBody className="p-4">
            <div className='border-b-2 pb-5 text-center'>
            <h2 className="text-lg font-semibold">Oluwakemi Okeke</h2>
            <p className="text-gray-600 text-sm">Grill House Supervisor</p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3 p-3 rounded-lg">
                <Mail className="text-black bg-default-500 border-2 border-black rounded-full p-1" size={50} />
                <div className='ms-2'>
                  <p className="text-gray-500">Email-Address</p>
                  <p className="font-semibold">chidinmaokeke@example.com</p>
                </div>
              </div>
    
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <Lock className="text-black bg-default-500 border-2 border-black rounded-full p-1" size={50} />
                <div className='ms-2'>
                  <p className="text-gray-500">Password</p>
                  <p className="font-semibold">08012345678</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    };

export default SideProfile
