import { BsThreeDotsVertical } from "react-icons/bs";

export default function VoiceThreeCard() {
  return (
    <>
      <div className="flex justify-between gap-6 flex-wrap">
        {/* Card Component */}
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex flex-col w-full md:w-[32%] rounded-lg bg-white shadow-md p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#22303E] text-lg font-semibold">
                Primary Device Used
              </span>
              <BsThreeDotsVertical className="text-gray-400 w-6 h-6" />
            </div>

            {/* Card Body */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[#22303E] text-2xl font-semibold">
                  100%
                </span>
                <span className="text-gray-500 text-sm">Total Percentage</span>
              </div>

              {/* SVG */}
              <div className="w-[106px] h-[105px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 106 105"
                  fill="none"
                >
                  <path
                    d="M101.334 48.3744C100.448 36.7113 95.3405 25.7712 86.9685 17.6029C78.5965 9.43459 67.5339 4.59838 55.8525 4"
                    stroke="#71DD37"
                    strokeWidth="8"
                  />
                  <path
                    d="M50.6323 4.35938C40.6896 4.90251 31.1609 8.5193 23.362 14.7103C15.5632 20.9013 9.87889 29.361 7.09424 38.9211"
                    stroke="#03C3EC"
                    strokeWidth="8"
                  />
                  <path
                    d="M5.18422 43.7656C3.57234 52.9469 4.66424 62.3988 8.327 70.9707"
                    stroke="#8592A3"
                    strokeWidth="8"
                  />
                  <path
                    d="M11.3291 75.6122C16.522 84.8634 24.6289 92.1372 34.3869 96.3005C44.1448 100.464 55.0058 101.283 65.2777 98.6298C75.5497 95.9768 84.6556 90.0008 91.177 81.6329C97.6985 73.2649 101.269 62.975 101.333 52.3662"
                    stroke="#696CFF"
                    strokeWidth="8"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
