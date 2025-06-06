// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import QrCard from "@/components/Navigation/quishing/QrCard";
// import QrCodeForm from "@/components/Navigation/quishing/QrCodeForm";
// import VoiceDashBoard from "@/components/Navigation/quishing/dashboard/voice/VoiceDashBoard";
// import CameraDashboard from "@/components/Navigation/quishing/dashboard/camera/CameraDashboard";
// import LocationDashboard from "@/components/Navigation/quishing/dashboard/location/LocationDashboard";

// export default function Quishing() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const showForm = searchParams.get("addQr") === "true";
//   const selectedQr = searchParams.get("qr");

//   if (showForm) {
//     return <QrCodeForm />;
//   }

//   if (selectedQr === "Voice Activation") {
//     return <VoiceDashBoard />;
//   }

//   if (selectedQr === "Camera Activation") {
//     return <CameraDashboard />;
//   }

//   if (selectedQr === "Location Activation") {
//     return <LocationDashboard />;
//   }

//   return (
//     <div className="bg-[#F9FBFD] min-h-screen">
//       <div className="pt-[20px] px-4 py-4 gap-2">
//         <div className="flex justify-between">
//           <div className="flex flex-col gap-3">
//             <h2 className="w-[512px] text-[#384554] text-[18px] font-semibold leading-7 tracking-[0.5px]">
//               QR Code Activation Demo
//             </h2>
//             <span className="text-[#48596D] text-[13px] font-normal leading-5 tracking-[0.5px]">
//               Explore how QR codes can enable seamless activation of voice,
//               camera, and location features for educational insights.
//             </span>
//           </div>

//           <button
//             onClick={() => router.push("?addQr=true")}
//             className="inline-flex items-center gap-[8px] rounded-[4px] bg-[#FD3842] h-[40px] py-[10px] px-[16px] text-white text-[16px] font-medium"
//           >
//             Add QR Code
//           </button>
//         </div>

//         <div className="mt-4">
//           <QrCard />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import QrCard from '../../../components/Navigation/quishing/QrCard';
import QrCodeForm from '../../../components/Navigation/quishing/QrCodeForm';
import VoiceDashBoard from '../../../components/Navigation/quishing/dashboard/voice/VoiceDashBoard';
import CameraDashboard from '../../../components/Navigation/quishing/dashboard/camera/CameraDashboard';
import LocationDashboard from '../../../components/Navigation/quishing/dashboard/location/LocationDashboard';

function QuishingContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const showForm = searchParams.get('addQr') === 'true';
	const selectedQr = searchParams.get('qr');

	if (showForm) {
		return <QrCodeForm />;
	}

	if (selectedQr === 'Voice Activation') {
		return <VoiceDashBoard />;
	}

	if (selectedQr === 'Camera Activation') {
		return <CameraDashboard />;
	}

	if (selectedQr === 'Location Activation') {
		return <LocationDashboard />;
	}

	return (
		<div className='bg-[#F9FBFD] min-h-screen'>
			<div className='pt-[20px] px-4 py-4 gap-2'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-3'>
						<h2 className='w-[512px] text-[#384554] text-[18px] font-semibold leading-7 tracking-[0.5px]'>
							QR Code Activation Demo
						</h2>
						<span className='text-[#48596D] text-[13px] font-normal leading-5 tracking-[0.5px]'>
							Explore how QR codes can enable seamless activation
							of voice, camera, and location features for
							educational insights.
						</span>
					</div>

          {/* <button
            onClick={() => router.push("?addQr=true")}
            className="inline-flex items-center gap-[8px] rounded-[4px] bg-[#FD3842] h-[40px] py-[10px] px-[16px] text-white text-[16px] font-medium"
          >
            Add QR Code
          </button> */}
        </div>

        <div className="">
          <QrCard />
        </div>
      </div>
    </div>
  );
}

export default function Quishing() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<QuishingContent />
		</Suspense>
	);
}
