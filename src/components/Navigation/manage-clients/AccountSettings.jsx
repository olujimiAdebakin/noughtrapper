// "use client";
// import { useState } from "react";
// import Switch from "@/components/reusable/Switch";
// import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";

// export default function AccountSettings({companyId, onSuccess }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   // const companyId = searchParams.get("companyId");

//   console.log("Rendered with companyId:", companyId);

//   const [formData, setFormData] = useState({
//     contractPlan: "",
//     settings: {
//       emailNotifications: false,
//       registrationCompleted: false,
//       registrationCancelled: false,
//       smsNotifications: false,
//       emailReminders: false,
//       whatsappNotifications: false,
//       productUpdates: false, //
//       emailNotification: false
//     },
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Modified to make the switches work like radio buttons
// const handleContractPlanChange = (plan) => (checked) => {
//   console.log(`Toggle ${plan}: ${checked}`); // Debug log
//   setFormData((prev) => ({
//     ...prev,
//     contractPlan: checked
//       ? plan
//       : prev.contractPlan === plan
//       ? ""
//       : prev.contractPlan,
//   }));
// };

//  const handleSettingsChange = (key) => (checked) => {
//    console.log(`Toggle setting ${key}: ${checked}`); // Debug log
//    setFormData((prev) => ({
//      ...prev,
//      settings: { ...prev.settings, [key]: checked },
//    }));
//  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.contractPlan) {
//       toast.error("Please select a contract plan.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!companyId) {
//       toast.error("Company ID is missing.");
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       step: "settings",
//       companyId: companyId,
//       contractPlan: formData.contractPlan,
//       settings: {
//         emailNotifications: formData.settings.emailNotifications,
//         smsNotifications: formData.settings.smsNotifications,
//         whatsappNotifications: formData.settings.whatsappNotifications,
//         productUpdates: formData.settings.productUpdates,
//         emailNotification: formData.settings.emailNotification,
//       },
//     };

//     console.log("Submitting form data:", payload);

//     try {
//       const response = await fetch("/api/AccountSettings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (data.companyId) {
//         toast.success("Settings saved successfully!", {
//           duration: 4000,
//           position: "top-right",
//         });
//         onSuccess(data.companyId, "Completed");
//         router.push(`/manage-clients`);
//       } else {
//         throw new Error("No companyId returned from API");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error.message, error.stack);
//       toast.error(`Failed to save account settings: ${error.message}`, {
//         duration: 4000,
//         position: "top-right",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // if (data.statusCode === 500) {
//   //   toast.warn("Settings save failed, proceeding anyway.", { duration: 4000 });
//   //   onSuccess(companyId, "Complete"); // Adjust next step
//   // } else if (data.companyId) {
//   //   toast.success("Settings saved successfully!", { duration: 4000 });
//   //   onSuccess(data.companyId, "Complete");
//   // }

//   return (
//     <>
//       <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
//         <div className="flex flex-col gap-3 self-stretch">
//           <div className="flex items-start justify-between gap-3 self-stretch">
//             <div className="flex flex-col items-start gap-3 self-stretch">
//               <h2 className="text-[#212B36] text-[16px] font-semibold">
//                 Account Settings
//               </h2>
//               <span className="text-[#667E99] text-[13px] font-normal">
//                 Configure your contract plan and notification preferences.
//               </span>
//             </div>
//           </div>
//           <p className="w-full h-[1px] bg-[#C4CDD5]" />
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col pt-[10px]">
//           {/* Contract Plan */}
//           <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
//             <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
//               Contract Plan
//             </h2>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Three Months Plan
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.contractPlan === "Three Months Plan"}
//                 onChange={handleContractPlanChange("Three Months Plan")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Six Months Plan
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.contractPlan === "Six Months Plan"}
//                 onChange={handleContractPlanChange("Six Months Plan")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   One Year Plan
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.contractPlan === "One Year Plan"}
//                 onChange={handleContractPlanChange("One Year Plan")}
//               />
//             </div>
//           </div>

//           {/* Line */}
//           <p className="w-full h-[1px] bg-[#C4CDD5]" />

//           {/* Email Settings */}
//           <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
//             <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
//               Email
//             </h2>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Registration Confirmation
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.emailNotifications}
//                 onChange={handleSettingsChange("emailNotifications")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Registration Completed
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.registrationCompleted}
//                 onChange={handleSettingsChange("registrationCompleted")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Registration Cancelled
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Notification sent automatically to the client after they
//                   register
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.registrationCancelled}
//                 onChange={handleSettingsChange("registrationCancelled")}
//               />
//             </div>
//           </div>

//           {/* Line */}
//           <p className="w-full h-[1px] bg-[#C4CDD5]" />

//           {/* Communication Permissions */}
//           <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
//             <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
//               Communication Permissions
//             </h2>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Service expiration reminders via SMS
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   By enabling, you consent to phone number use for sending
//                   reminders as per our Privacy Policy.
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.smsNotifications}
//                 onChange={handleSettingsChange("smsNotifications")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Service expiration reminders via Email
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   By enabling, you consent to email use for sending reminders as
//                   per our Privacy Policy.
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.emailNotification}
//                 onChange={handleSettingsChange("emailNotification")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Service expiration reminders via WhatsApp
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   By enabling, you consent to phone number use for sending
//                   reminders as per our Privacy Policy.
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.whatsappNotifications}
//                 onChange={handleSettingsChange("whatsappNotifications")}
//               />
//             </div>
//             <div className="flex justify-between self-stretch items-center">
//               <div className="flex flex-col items-start gap-1">
//                 <span className="text-[#04091E] text-[16px] font-normal">
//                   Updates about our products and special offers via email
//                 </span>
//                 <small className="text-[#747681] text-[13px] font-normal">
//                   Receive discounts and be the first to know about our latest
//                   features.
//                 </small>
//               </div>
//               <Switch
//                 checked={formData.settings.productUpdates}
//                 onChange={handleSettingsChange("productUpdates")}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end items-center gap-3 self-stretch pt-6">
//             <button
//               type="button"
//               className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold not-italic"
//             >
//               Save as Draft
//             </button>
//             <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
//               <button
//                 type="button"
//                 className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] not-italic font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] not-italic font-semibold ${
//                   isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

'use client';
import { useState } from 'react';
import Switch from '../../reusable/Switch';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AccountSettings({ companyId, onSuccess }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	console.log('Rendered with companyId:', companyId);

	const [formData, setFormData] = useState({
		contractPlan: '',
		settings: {
			emailNotifications: false,
			registrationCompleted: false,
			registrationCancelled: false,
			smsNotifications: false,
			emailReminders: false,
			whatsappNotifications: false,
			productUpdates: false,
			emailNotification: false,
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleContractPlanChange = (plan) => (checked) => {
		console.log(`Toggle ${plan}: ${checked}`);
		setFormData((prev) => ({
			...prev,
			contractPlan: checked
				? plan
				: prev.contractPlan === plan
				? ''
				: prev.contractPlan,
		}));
	};

	const handleSettingsChange = (key) => (checked) => {
		console.log(`Toggle setting ${key}: ${checked}`);
		setFormData((prev) => ({
			...prev,
			settings: { ...prev.settings, [key]: checked },
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!formData.contractPlan) {
			toast.error('Please select a contract plan.');
			setIsSubmitting(false);
			return;
		}

		if (!companyId) {
			toast.error('Company ID is missing.');
			setIsSubmitting(false);
			return;
		}

		const payload = {
			step: 'settings',
			companyId: companyId,
			contractPlan: formData.contractPlan,
			settings: {
				emailNotifications: formData.settings.emailNotifications,
				smsNotifications: formData.settings.smsNotifications,
				whatsappNotifications: formData.settings.whatsappNotifications,
				productUpdates: formData.settings.productUpdates,
				emailNotification: formData.settings.emailNotification,
			},
		};

		console.log('Submitting form data:', payload);

		try {
			const response = await fetch('/api/AccountSettings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log('API Response:', data);

			if (data.companyId) {
				toast.success('Settings saved successfully!', {
					duration: 4000,
					position: 'top-right',
				});
				onSuccess(data.companyId, 'Completed');
				router.push(`/manage-clients`);
			} else {
				throw new Error('No companyId returned from API');
			}
		} catch (error) {
			console.error('Fetch error:', error.message, error.stack);
			toast.error(`Failed to save account settings: ${error.message}`, {
				duration: 4000,
				position: 'top-right',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{/* Preloader Overlay */}
			{isSubmitting && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
					<div className='flex flex-col items-center'>
						<div className='w-12 h-12 border-4 border-t-4 border-t-[#FD3842] border-gray-200 rounded-full animate-spin'></div>
						<p className='mt-4 text-white text-lg font-semibold'>
							Saving Settings...
						</p>
					</div>
				</div>
			)}

			<div className='flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white'>
				<div className='flex flex-col gap-3 self-stretch'>
					<div className='flex items-start justify-between gap-3 self-stretch'>
						<div className='flex flex-col items-start gap-3 self-stretch'>
							<h2 className='text-[#212B36] text-[16px] font-semibold'>
								Account Settings
							</h2>
							<span className='text-[#667E99] text-[13px] font-normal'>
								Configure your contract plan and notification
								preferences.
							</span>
						</div>
					</div>
					<p className='w-full h-[1px] bg-[#C4CDD5]' />
				</div>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col pt-[10px]'
				>
					{/* Contract Plan */}
					<div className='flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6'>
						<h2 className='text-[#04091E] text-[18px] font-semibold self-stretch'>
							Contract Plan
						</h2>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Three Months Plan
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={
									formData.contractPlan ===
									'Three Months Plan'
								}
								onChange={handleContractPlanChange(
									'Three Months Plan'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Six Months Plan
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={
									formData.contractPlan === 'Six Months Plan'
								}
								onChange={handleContractPlanChange(
									'Six Months Plan'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									One Year Plan
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={
									formData.contractPlan === 'One Year Plan'
								}
								onChange={handleContractPlanChange(
									'One Year Plan'
								)}
							/>
						</div>
					</div>

					{/* Line */}
					<p className='w-full h-[1px] bg-[#C4CDD5]' />

					{/* Email Settings */}
					<div className='flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6'>
						<h2 className='text-[#04091E] text-[18px] font-semibold self-stretch'>
							Email
						</h2>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Registration Confirmation
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={formData.settings.emailNotifications}
								onChange={handleSettingsChange(
									'emailNotifications'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Registration Completed
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={
									formData.settings.registrationCompleted
								}
								onChange={handleSettingsChange(
									'registrationCompleted'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Registration Cancelled
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Notification sent automatically to the
									client after they register
								</small>
							</div>
							<Switch
								checked={
									formData.settings.registrationCancelled
								}
								onChange={handleSettingsChange(
									'registrationCancelled'
								)}
							/>
						</div>
					</div>

					{/* Line */}
					<p className='w-full h-[1px] bg-[#C4CDD5]' />

					{/* Communication Permissions */}
					<div className='flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6'>
						<h2 className='text-[#04091E] text-[18px] font-semibold self-stretch'>
							Communication Permissions
						</h2>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Service expiration reminders via SMS
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									By enabling, you consent to phone number use
									for sending reminders as per our Privacy
									Policy.
								</small>
							</div>
							<Switch
								checked={formData.settings.smsNotifications}
								onChange={handleSettingsChange(
									'smsNotifications'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Service expiration reminders via Email
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									By enabling, you consent to email use for
									sending reminders as per our Privacy Policy.
								</small>
							</div>
							<Switch
								checked={formData.settings.emailNotification}
								onChange={handleSettingsChange(
									'emailNotification'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Service expiration reminders via WhatsApp
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									By enabling, you consent to phone number use
									for sending reminders as per our Privacy
									Policy.
								</small>
							</div>
							<Switch
								checked={
									formData.settings.whatsappNotifications
								}
								onChange={handleSettingsChange(
									'whatsappNotifications'
								)}
							/>
						</div>
						<div className='flex justify-between self-stretch items-center'>
							<div className='flex flex-col items-start gap-1'>
								<span className='text-[#04091E] text-[16px] font-normal'>
									Updates about our products and special
									offers via email
								</span>
								<small className='text-[#747681] text-[13px] font-normal'>
									Receive discounts and be the first to know
									about our latest features.
								</small>
							</div>
							<Switch
								checked={formData.settings.productUpdates}
								onChange={handleSettingsChange(
									'productUpdates'
								)}
							/>
						</div>
					</div>

					<div className='flex justify-end items-center gap-3 self-stretch pt-6'>
						<button
							type='button'
							className='flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold not-italic'
						>
							Save as Draft
						</button>
						<div className='flex justify-end items-center gap-3 flex-1 flex-shrink-0'>
							<button
								type='button'
								className='flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] not-italic font-medium'
							>
								Cancel
							</button>
							<button
								type='submit'
								disabled={isSubmitting}
								className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] not-italic font-semibold ${
									isSubmitting
										? 'opacity-50 cursor-not-allowed'
										: ''
								}`}
							>
								{isSubmitting ? 'Submitting...' : 'Submit'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
