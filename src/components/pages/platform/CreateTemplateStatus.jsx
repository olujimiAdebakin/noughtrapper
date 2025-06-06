import React from 'react'
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { LiaTimesSolid } from "react-icons/lia";

export default function CreateTemplateStatus({ status, setStatus, handleSubmit }) {

    const productStatus = [
        {key: "Published", label: "Published"},
        {key: "Draft", label: "Draft"},
      ];


       // Handle status change
    const handleStatusChange = (value) => {
        setStatus(value);
    };

    // Dynamically apply background color based on status
    const getStatusColor = (status) => {
        if (status === 'Published') {
            return 'bg-[#E9FAF7]'; // Light green for published
        } else if (status === 'Draft') {
            return 'bg-[#F0E4E4]'; // Light red for draft
        }
        return ''; // Default (empty) for unknown status
    };

  return (
    <div>
      <div className='flex justify-between mt-6'>
                <button 
                    className="flex border text-default-500 px-4 py-2 rounded-lg hover:bg-gray-600 font-semibold"
                    onClick={() => router.back()}
                >
                    <LiaTimesSolid className='text-xl me-2'/>
                   <span className='text-sm'> Cancel </span>
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Save Template
                </button>
            </div>
            <div className='bg-white mt-5 rounded-xl p-5'>
                <div className='flex justify-between mb-3'>
                    <h4 className='font-semibold text-xl'>Status</h4>
                    {/* Display the current status with dynamic background color */}
                    <p className={`p-2 rounded-lg ${getStatusColor(status)}`}>{status}</p>
                </div>
                <div>
                    <h4 className='mb-1'></h4>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select className="max-w-xs bg-[#E0E2E7] border border-default-400 rounded-xl" label="Status" 
                    value={status} // Controlled component
                    onChange={(e) => handleStatusChange(e.target.value)} // Update status on change
                    >
                        {productStatus.map((product) => (
                        <SelectItem key={product.key}>{product.label}</SelectItem>
                        ))}
                    </Select>
                    </div>
                </div>
            </div>
    </div>
  )
}
