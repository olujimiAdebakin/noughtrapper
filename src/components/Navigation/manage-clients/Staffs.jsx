// "use client";

// import { CiImport } from "react-icons/ci";
// import { SiReadthedocs } from "react-icons/si";
// import { useState } from "react";
// import Papa from "papaparse";

// export default function Staffs() {
//   const [staffData, setStaffData] = useState(null); // State to hold parsed CSV data

//   //   // Handle CSV file upload and parsing
//   //   const handleFileUpload = (event) => {
//   //     const file = event.target.files[0];
//   //     if (file && file.type === "text/csv") {
//   //       const reader = new FileReader();
//   //       reader.onload = (e) => {
//   //         const text = e.target.result;
//   //         const parsedData = parseCSV(text); // Parse CSV to array of objects
//   //         setStaffData(parsedData);
//   //       };
//   //       reader.readAsText(file);
//   //     } else {
//   //       alert("Please upload a valid CSV file.");
//   //     }
//   //   };

//   // Handle multiple CSV file uploads and parsing
//   const handleFileUpload = (event) => {
//     const files = event.target.files; // Get all selected files
//     if (files && files.length > 0) {
//       const parsedDataPromises = Array.from(files).map((file) => {
//         // Ensure file is a CSV
//         if (file.type === "text/csv") {
//           return new Promise((resolve) => {
//             Papa.parse(file, {
//               header: true,
//               complete: (result) => resolve(result.data),
//               skipEmptyLines: true,
//             });
//           });
//         } else {
//           alert(`File "${file.name}" is not a valid CSV file.`);
//           return Promise.resolve([]); // Return empty array for invalid files
//         }
//       });

//       // Wait for all files to be parsed, then combine results
//       Promise.all(parsedDataPromises).then((results) => {
//         const combinedData = results.flat(); // Flatten array of arrays into single array
//         setStaffData(combinedData);
//       });
//     }
//   };

//   return (
//     <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
//       <div className="flex flex-col gap-3 self-stretch">
//         <div className="flex items-start justify-between gap-3 self-stretch">
//           <div className="flex flex-col items-start gap-3 self-stretch">
//             <h2 className="text-[#212B36] text-[16px] font-semibold">
//               Staff Directory
//             </h2>
//             <span className="text-[#667E99] text-[13px] font-normal">
//               A list of all employees, their roles, and departments.
//             </span>
//           </div>

//           {/* Import Button with Hidden File Input */}
//           <label className="flex h-10 py-[10px] px-6 justify-center items-center gap-1 rounded-[4px] border-1 border-[#DC3545] bg-white text-[#FD3842] text-[16px] font-medium cursor-pointer">
//             <CiImport className="text-[#FD3842] w-4 h-4 justify-center items-center flex-shrink flex" />
//             Import
//             <input
//               type="file"
//               accept=".csv"
//               multiple
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//           </label>
//         </div>
//         <p className="w-full h-[1px] bg-[#C4CDD5]" />
//       </div>

//       {/* Imported File Section */}
//       <div className="flex  items-center gap-4 py-[10px]">
//         {staffData.length > 0 ? (
//           <div className="w-full">
//             <h5 className="text-[#030712] text-[20px] font-semibold mb-4">
//               Imported Staff
//             </h5>
//             <div className="grid grid-cols-3 gap-4">
//               {staffData.map((staff, index) => (
//                 <div key={index} className="p-4 ">
//                   {Object.entries(staff).map(([key, value]) => (
//                     <p key={key} className="text-[#212B36] text-[14px]">
//                       <strong>{key}:</strong> {value}
//                     </p>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             <SiReadthedocs className="w-[250px] h-[200px] fill-[#FD3842]" />
//             <h5 className="text-[#030712] text-[24px] font-semibold">
//               No Record found
//             </h5>
//             <span className="text-[#6B7280] text-[13px] font-normal">
//               No staff members found. Start by adding your team to manage roles
//               and responsibilities.
//             </span>
//           </>
//         )}
//       </div>

//       {/* Form Buttons */}
//       <form action="" className="flex flex-col pt-[10px] gap-[32px]">
//         <div className="flex justify-end items-center gap-3 self-stretch">
//           <button className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-[14px] font-bold">
//             Save as Draft
//           </button>
//           <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
//             <button className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] font-medium">
//               Cancel
//             </button>
//             <button className="flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] font-semibold">
//               Next
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


// "use client";

// import { CiImport } from "react-icons/ci";
// import { SiReadthedocs } from "react-icons/si";
// import { useState, Suspense } from "react";
// import Papa from "papaparse";

// function StaffsContent() {
//   const [staffData, setStaffData] = useState([]);

//   const handleFileUpload = (event) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const parsedDataPromises = Array.from(files).map((file) => {
//         if (file.type === "text/csv") {
//           return new Promise((resolve) => {
//             Papa.parse(file, {
//               header: true,
//               complete: (result) => resolve(result.data),
//               skipEmptyLines: true,
//             });
//           });
//         } else {
//           alert(`File "${file.name}" is not a valid CSV file.`);
//           return Promise.resolve([]);
//         }
//       });
//       Promise.all(parsedDataPromises).then((results) => {
//         const combinedData = results.flat();
//         setStaffData(combinedData);
//       });
//     }
//   };

//   return (
//     <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
//       <div className="flex flex-col gap-3 self-stretch">
//         <div className="flex items-start justify-between gap-3 self-stretch">
//           <div className="flex flex-col items-start gap-3 self-stretch">
//             <h2 className="text-[#212B36] text-[16px] font-semibold">
//               Staff Directory
//             </h2>
//             <span className="text-[#667E99] text-[13px] font-normal">
//               A list of all employees, their roles, and departments.
//             </span>
//           </div>
//           <label className="flex h-10 py-[10px] px-6 justify-center items-center gap-1 rounded-[4px] border-1 border-[#DC3545] bg-white text-[#FD3842] text-[16px] font-medium cursor-pointer">
//             <CiImport className="text-[#FD3842] w-4 h-4 justify-center items-center flex-shrink flex" />
//             Import
//             <input
//               type="file"
//               accept=".csv"
//               multiple
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//           </label>
//         </div>
//         <p className="w-full h-[1px] bg-[#C4CDD5]" />
//       </div>

//       <div className="flex flex-col items-center gap-4 py-[50px]">
//         {staffData.length > 0 ? (
//           <div className="w-full">
//             <h5 className="text-[#030712] text-[20px] font-semibold mb-4">
//               Imported Staff
//             </h5>
//             <div className="grid grid-cols-3 gap-4">
//               {staffData.map((staff, index) => (
//                 <div key={index} className="p-4">
//                   {Object.entries(staff).map(([key, value]) => (
//                     <p key={key} className="text-[#212B36] text-[14px]">
//                       <strong>{key}:</strong> {value}
//                     </p>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             <SiReadthedocs className="w-[250px] h-[200px] fill-[#FD3842]" />
//             <h5 className="text-[#030712] text-[24px] font-semibold">
//               No Record found
//             </h5>
//             <span className="text-[#6B7280] text-[13px] font-normal">
//               No staff members found. Start by adding your team to manage roles
//               and responsibilities.
//             </span>
//           </>
//         )}
//       </div>

//       <form action="" className="flex flex-col pt-[10px] gap-[32px]">
//         <div className="flex justify-end items-center gap-3 self-stretch">
//           <button className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-[14px] font-bold">
//             Save as Draft
//           </button>
//           <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
//             <button className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] font-medium">
//               Cancel
//             </button>
//             <button className="flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] font-semibold">
//               Next
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default function Staffs() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <StaffsContent />
//     </Suspense>
//   );
// }


"use client";
import { CiImport } from "react-icons/ci";
import { SiReadthedocs } from "react-icons/si";
import { useState, Suspense } from "react";
import Papa from "papaparse";
import toast from "react-hot-toast";

function StaffsContent({ companyId, onSuccess }) {
  const [staffData, setStaffData] = useState([]);
  const [csvFiles, setCsvFiles] = useState([]); // Store raw File objects
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter((file) => file.type === "text/csv");
      if (validFiles.length !== files.length) {
        toast.error("Only CSV files are allowed.");
      }
      if (validFiles.length === 0) return;

      const parsedDataPromises = validFiles.map((file) =>
        new Promise((resolve) => {
          Papa.parse(file, {
            header: true,
            complete: (result) => resolve(result.data),
            skipEmptyLines: true,
          });
        })
      );

      Promise.all(parsedDataPromises).then((results) => {
        const combinedData = results.flat();
        setStaffData(combinedData);
        setCsvFiles(validFiles); // Store raw files for submission
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!companyId) {
      toast.error("Company ID is missing.");
      setIsSubmitting(false);
      return;
    }

    if (csvFiles.length === 0) {
      toast.error("Please upload at least one CSV file.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("companyId", companyId);
    csvFiles.forEach((file, index) => {
      formData.append(`csvFile${index}`, file); // Append all files
    });

    console.log("Submitting form data:", {
      companyId,
      csvFiles: csvFiles.map((f) => f.name),
    });

    try {
      const response = await fetch("/api/Staff", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.companyId) {
        toast.success("Staff added successfully!", {
          duration: 4000,
          position: "top-right",
        });
        onSuccess(data.companyId, "AccountSettings"); // Navigate to AccountSettings
      } else {
        throw new Error("No companyId returned from API");
      }
    } catch (error) {
      console.error("Fetch error:", error.message, error.stack);
      toast.error(`Failed to add staff: ${error.message}`, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
      <div className="flex flex-col gap-3 self-stretch">
        <div className="flex items-start justify-between gap-3 self-stretch">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <h2 className="text-[#212B36] text-[16px] font-semibold">
              Staff Directory
            </h2>
            <span className="text-[#667E99] text-[13px] font-normal">
              A list of all employees, their roles, and departments.
            </span>
          </div>
          <label className="flex h-10 py-[10px] px-6 justify-center items-center gap-1 rounded-[4px] border-1 border-[#DC3545] bg-white text-[#FD3842] text-[16px] font-medium cursor-pointer">
            <CiImport className="text-[#FD3842] w-4 h-4 justify-center items-center flex-shrink flex" />
            Import
            <input
              type="file"
              accept=".csv"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="w-full h-[1px] bg-[#C4CDD5]" />
      </div>

      <div className="flex flex-col items-center gap-4 py-[50px]">
        {staffData.length > 0 ? (
          <div className="w-full">
            <h5 className="text-[#030712] text-[20px] font-semibold mb-4">
              Imported Staff
            </h5>
            <div className="grid grid-cols-3 gap-4">
              {staffData.map((staff, index) => (
                <div key={index} className="p-4">
                  {Object.entries(staff).map(([key, value]) => (
                    <p key={key} className="text-[#212B36] text-[14px]">
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <SiReadthedocs className="w-[250px] h-[200px] fill-[#FD3842]" />
            <h5 className="text-[#030712] text-[24px] font-semibold">
              No Record found
            </h5>
            <span className="text-[#6B7280] text-[13px] font-normal">
              No staff members found. Start by adding your team to manage roles
              and responsibilities.
            </span>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col pt-[10px] gap-[32px]">
        <div className="flex justify-end items-center gap-3 self-stretch">
          <button
            type="button"
            className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-[14px] font-bold"
          >
            Save as Draft
          </button>
          <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
            <button
              type="button"
              className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] font-semibold ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Uploading..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function Staffs({ companyId, onSuccess }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StaffsContent companyId={companyId} onSuccess={onSuccess} />
    </Suspense>
  );
}