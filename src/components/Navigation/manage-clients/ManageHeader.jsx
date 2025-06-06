



export default function ManageHeader(){
    return (
      <>
        <div className="flex items-center gap-[12px] self-stretch mt-[16px]">
          <div className="bg-white lg:p-[20px] xl:p-[20px] flex justify-between gap-[12px] rounded-lg items-end flex-1 basis-0 shadow-sm">
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[#4E4E4E] text-[16px] font-medium">
                Total Clients
              </h3>
              <span className="text-[#0096D6] text-[20px] font-semibold">
                124
              </span>
            </div>
            <span className="text-[#222] text-[14px] font-medium">
              18 Confirmed Today
            </span>
          </div>
          <div className="bg-white p-[20px] flex flex-col gap-[12px] rounded-lg items-start flex-1 basis-0 shadow-sm">
            <h3 className="text-[#4E4E4E] text-[16px] font-medium">
              Campaign Created
            </h3>
            <span className="text-[#38A169] text-[20px] font-semibold">
              100
            </span>
          </div>
        </div>
      </>
    );
}