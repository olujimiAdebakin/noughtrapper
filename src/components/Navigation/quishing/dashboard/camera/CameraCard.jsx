



export default function CameraCard() {
    return (
      <>
        <div className="grid grid-cols-3 space-x-4">
          <div className="bg-white flex flex-col justify-center p-[20px] rounded-xl gap-[12px] shadow-md">
            <span className="text-[#4E4E4E] text-[16px] font-medium">
              Number of Users Affected
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[#0096D6] text-[18px] font-semibold">
                124
              </span>
              <span className="text-[#222] text-[13px] font-medium">
                18 Confirmed Today
              </span>
            </div>
          </div>
          <div className="bg-white flex flex-col p-[20px] rounded-xl gap-[12px] shadow-md">
            <span className="text-[#4E4E4E] text-[16px] font-medium">
              User Demographics
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#28A745] text-[18px] font-semibold">
                55% Male
              </span>
              <span className="text-[#28A745] text-[18px] font-semibold">
                |
              </span>
              <span className="text-[#28A745] text-[18px] font-semibold">
                45% Female
              </span>
            </div>
          </div>
          <div className="bg-white flex flex-col p-[20px] rounded-xl gap-[12px] shadow-md">
            <span className="text-[#4E4E4E] text-[16px] font-medium">
              Engagement Rate
            </span>
            <span className="text-[#FFC107] text-[18px] font-semibold">
              75% Interaction Rate
            </span>
          </div>
        </div>
      </>
    );
}