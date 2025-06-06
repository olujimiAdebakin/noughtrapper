import { Mail, User, Phone, Calendar, ListChecks } from "lucide-react";
import { BiCopy } from "react-icons/bi";
import { TbCopyCheckFilled } from "react-icons/tb";
import { useState } from "react";

export default function EmployeeDetailsLeft({ employee }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, field) => {
    if (!value) return; // Prevent copying empty or undefined values
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { label: "Email", value: employee.email, icon: <Mail size={20} className="text-gray-500" /> },
    { label: "First Name", value: employee.firstName, icon: <User size={20} className="text-gray-500" /> },
    { label: "Last Name", value: employee.lastName, icon: <User size={20} className="text-gray-500" /> },
    { label: "Phone Number", value: employee.phone, icon: <Phone size={20} className="text-gray-500" /> },
  ];

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-1">
        {fields.map((item, index) => (
          <div key={item.label} className={`relative flex gap-4 p-4 ${index !== fields.length - 1 ? "border-b" : ""}`}>
            {/* Left: Icon */}
            <div className="flex items-center justify-center">
              {item.icon}
            </div>

            {/* Right: Label & Input */}
            <div className="w-full">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="relative">
                <input
                  type="text"
                  value={item.value || "N/A"}
                  readOnly
                  className="w-full bg-transparent text-sm text-gray-700 focus:outline-none font-semibold"
                />
                <button
                  onClick={() => handleCopy(item.value, item.label)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {copiedField === item.label ? <TbCopyCheckFilled size={16} /> : <BiCopy size={16} />}
                </button>
              </div>
            </div>
          </div>
        ))}

        <div>
          
          <div className='relative flex gap-4 p-4 border-t'>
              {/* Left: Icon */}
              <div className="flex items-center justify-center">
              <Calendar size={20} className="text-gray-500" />
              </div>

              {/* Right: Label & Input */}
              <div className="w-full">
                <div className="text-sm text-gray-500"><p>Date Created</p></div>
                <div className="relative">
                  <input
                    type="text"
                    value={employee.dateCreated}
                    readOnly
                    className="w-full bg-transparent text-sm text-gray-700 focus:outline-none font-semibold"
                  />
                </div>
              </div>
          </div>

          <div className='relative flex gap-4 p-4 border-t-2'>
              {/* Left: Icon */}
              <div className="flex items-center justify-center">
              <Calendar size={20} className="text-gray-500" />
              </div>

              {/* Right: Label & Input */}
              <div className="w-full">
                <div className="text-sm text-gray-500"><p>Exams Taken</p></div>
                <div className="relative">
                  <input
                    type="text"
                    value={employee.examsTaken}
                    readOnly
                    className="w-full bg-transparent text-sm text-gray-700 focus:outline-none font-semibold"
                  />
                </div>
              </div>
          </div>



        
        </div>


      </div>
    </div>
  );
}
