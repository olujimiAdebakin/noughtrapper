// "use client"


// import { DayPicker } from "react-day-picker";
// import { useState } from "react";
// import "react-day-picker/dist/style.css";


// export default function Calendar() {
//   // State to hold the selected date
//   const [selectedDate, setSelectedDate] = useState(null);

//   // Handle date selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="calendar-container">
//       <h1>Choose a Date</h1>

//       {/* Render the DayPicker component */}
//       <DayPicker selected={selectedDate} onDayClick={handleDateSelect} />

//       {/* Display the selected date */}
//       {selectedDate && <p>You selected: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
//  }




"use client";

import { DateRangePicker } from "@nextui-org/react";

export default function Calendar() {
  return (
    <DateRangePicker
      // Basic styling
      className="w-[300px] bg-[#E3F5FF] mt-3 font-bold"
      disableAnimation
      calendarProps={{
        classNames: {
          base: "bg-[#E3F5FF]",
          headerWrapper: "pt-3 bg-[#E3F5FF]",
          prevButton: "border-1 border-default-200 rounded-small",
          nextButton: "border-1 border-default-200 rounded-small",
          gridHeader: "bg-[#E3F5FF] shadow-none border-b-1 border-default-100",
          cellButton: [
            "data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small",
            // start (pseudo)
            "data-[range-start=true]:before:rounded-l-small",
            "data-[selection-start=true]:before:rounded-l-small",
            // end (pseudo)
            "data-[range-end=true]:before:rounded-r-small",
            "data-[selection-end=true]:before:rounded-r-small",
            // start (selected)
            "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small",
            // end (selected)
            "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small",
            "hover:bg-primary-100 hover:text-primary-500",
            "text-gray-700",
          ],
        },
      }}
      // Appearance props
      size="sm"
      radius="lg"
      color="primary"
      // Label customization
      label="Select Date Range"
      placeholder="Pick dates"
      // Additional styling
      popoverProps={{
        classNames: {
          base: "shadow-sm rounded-lg",
          content: "p-0",
        },
      }}
    />
  );
}


