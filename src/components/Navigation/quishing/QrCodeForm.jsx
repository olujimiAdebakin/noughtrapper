import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIosNew } from "react-icons/md";



export default function QrCodeForm() {
      const router = useRouter();
    return (
      <>
        <div className="bg-[#F9FBFD] min-h-screen w-full">
          <div className="pt-[24px] px-[16px]">
            <div className="flex items-center gap-2">
              <div
                className="bg-[#E6E8EB] h-[40px] p-[16px] inline-flex items-center gap-[8px] rounded-lg"
                onClick={() => router.push("/quishing")}
              >
                <MdOutlineArrowBackIosNew />
              </div>
              <span className="text-[#384554] font-semibold text-[18px]">Back</span>
            </div> 
          </div>
        </div>
      </>
    );
}