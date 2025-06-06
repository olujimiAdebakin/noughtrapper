import Image from "next/image";

import { useRouter } from "next/navigation";


export default function () {

  const router = useRouter();

    return (
      <>
        <div className="bg-[#FCEBEC] flex justify-between items-center py-0 px-[40px] h-[256px] rounded-[15px]">
          <div className="flex flex-col justify-center items-start gap-[10px] self-stretch">
            <h2 className="text-[#192027] text-center text-[16px] font-semibold leading-6">
              Campaigns
            </h2>
            <p className="text-[#48596D] text-[13px] font-medium ">
              Lauch a New Cybersecurity Awareness Campaign
            </p>
            <button className="py-[10px] px-[16px] flex h-[40px] justify-center items-center gap-[4px] rounded-[4px] bg-[#FD3842] text-white text-[16px] font-medium" 
            onClick={() => router.push('/campaigns/create-campaign')}>
              + Create Campaigns
            </button>
          </div>

          <div>
            <Image src='icons/campaign_sent.svg' width={200} 
            height={200} 
            alt="Campaign sent"/>
            
          </div>
        </div>

        <div className=" flex border-b border-b-[#D0D7DF] py-0 px-[16px] items-center self-stretch h-[41px] mt-3">
          <h1 className="text-[#4E4E4E] text-[16px] font-medium ">
            Recent Campaign Sent
          </h1>
        </div>

        <div className=" px-[16px] mt-3">
          <p className="text-[#767676] text-[13px] font-medium">
            No Campaigns Created Yet
          </p>
        </div>
      </>
    );
}