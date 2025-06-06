import React from 'react'
import { Select, SelectItem } from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";

function LogHeader() {

    const statusOptions = [
        { key: "all", label: "All Status" },
        { key: "active", label: "Active" },
        { key: "disabled", label: "Disabled" },
      ];

  return (
    <div>
      <div className="flex gap-5">

        <h3 className="">Staff Log History for Oluwakemi Okeke</h3>
        <div className="flex space-x-2">
         <Select className="min-w-[120px] border-4 border-green-700 bg-black rounded-xl " label="" placeholder="All Status">
         {statusOptions.map((status) => (
        <SelectItem 
         key={status.key} 
         value={status.key}>
         {status.label}
        </SelectItem>
      ))}
    </Select>

    <DatePicker className="max-w-[284px] border-4 border-green-600 bg-black rounded-xl" label="" />

</div>
   
</div>
    </div>
  )
}

export default LogHeader
