// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { MdBackup } from "react-icons/md";
// import toast from "react-hot-toast";

// export default function Document({ companyId, onSuccess }) {
//   const [previews, setPreviews] = useState({
//     certIncorporation: null,
//     businessLicense: null,
//     mou: null,
//     nda: null,
//     sla: null,
//     govId: null,
//   });

//   const [files, setFiles] = useState({
//     certIncorporation: null,
//     businessLicense: null,
//     mou: null,
//     nda: null,
//     sla: null,
//     govId: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleFileChange = (key) => (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
//       if (file.size > MAX_FILE_SIZE) {
//         toast.error(`File ${file.name} exceeds 10 MB limit.`);
//         return;
//       }
//       if (previews[key]) {
//         URL.revokeObjectURL(previews[key]);
//       }
//       const previewUrl = URL.createObjectURL(file);
//       setPreviews((prev) => ({ ...prev, [key]: previewUrl }));
//       setFiles((prev) => ({ ...prev, [key]: file }));
//     }
//   };

//   const isImageFile = (url) => {
//     return url && /\.(jpg|jpeg|png|gif|svg)$/i.test(url);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!companyId) {
//       toast.error("Company ID is missing.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("companyId", companyId);
//     if (files.certIncorporation)
//       formData.append("certIncorporation", files.certIncorporation);
//     if (files.businessLicense)
//       formData.append("businessLicense", files.businessLicense);
//     if (files.mou) formData.append("mou", files.mou);
//     if (files.nda) formData.append("nda", files.nda);
//     if (files.sla) formData.append("sla", files.sla);
//     if (files.govId) formData.append("govId", files.govId);

//     try {
//       const response = await fetch("/api/companyDocs", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (data.companyId) {
//         toast.success("Documents uploaded successfully!", {
//           duration: 4000,
//           position: "top-right",
//         });
//         onSuccess(data.companyId, "Staffs");
//       } else {
//         throw new Error("No companyId returned from API");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error.message, error.stack);
//       toast.error(`Failed to upload documents: ${error.message}`, {
//         duration: 4000,
//         position: "top-right",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       Object.values(previews).forEach((preview) => {
//         if (preview) URL.revokeObjectURL(preview);
//       });
//     };
//   }, [previews]);

//   return (
//     <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
//       <div className="flex flex-col items-start gap-3 self-stretch">
//         <h2 className="text-[#212B36] text-[16px] font-semibold">
//           Company Information
//         </h2>
//         <span className="text-[#667E99] text-[13px] font-normal">
//           Please provide your company's official documentation to complete the
//           verification process.
//         </span>
//         <p className="w-full h-[1px] bg-[#C4CDD5]" />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col pt-[10px] gap-[32px]"
//       >
//         <div className="grid grid-cols-2 gap-y-5 gap-x-5 w-full">
//           {/* Certificate of Incorporation */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Certificate of Incorporation
//             </h2>
//             <label
//               htmlFor="fileInputCertIncorporation"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.certIncorporation ? (
//                 isImageFile(previews.certIncorporation) ? (
//                   <Image
//                     src={previews.certIncorporation}
//                     alt="Certificate Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.certIncorporation?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("certIncorporation")}
//               className="hidden"
//               id="fileInputCertIncorporation"
//             />
//           </div>

//           {/* Business License & Permits */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Business License & Permits
//             </h2>
//             <label
//               htmlFor="fileInputBusinessLicense"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.businessLicense ? (
//                 isImageFile(previews.businessLicense) ? (
//                   <Image
//                     src={previews.businessLicense}
//                     alt="License Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.businessLicense?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("businessLicense")}
//               className="hidden"
//               id="fileInputBusinessLicense"
//             />
//           </div>

//           {/* Memorandum of Understanding (MoU) */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Memorandum of Understanding (MoU)
//             </h2>
//             <label
//               htmlFor="fileInputMou"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.mou ? (
//                 isImageFile(previews.mou) ? (
//                   <Image
//                     src={previews.mou}
//                     alt="MoU Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.mou?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("mou")}
//               className="hidden"
//               id="fileInputMou"
//             />
//           </div>

//           {/* Non-Disclosure Agreement (NDA) */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Non-Disclosure Agreement (NDA)
//             </h2>
//             <label
//               htmlFor="fileInputNda"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.nda ? (
//                 isImageFile(previews.nda) ? (
//                   <Image
//                     src={previews.nda}
//                     alt="NDA Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.nda?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("nda")}
//               className="hidden"
//               id="fileInputNda"
//             />
//           </div>

//           {/* Service Level Agreement (SLA) */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Service Level Agreement (SLA)
//             </h2>
//             <label
//               htmlFor="fileInputSla"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.sla ? (
//                 isImageFile(previews.sla) ? (
//                   <Image
//                     src={previews.sla}
//                     alt="SLA Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.sla?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("sla")}
//               className="hidden"
//               id="fileInputSla"
//             />
//           </div>

//           {/* Government-Issued ID */}
//           <div className="flex flex-col items-start gap-4 self-stretch">
//             <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
//               Government-Issued ID of the Company Spokesperson
//             </h2>
//             <label
//               htmlFor="fileInputGovId"
//               className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
//             >
//               {previews.govId ? (
//                 isImageFile(previews.govId) ? (
//                   <Image
//                     src={previews.govId}
//                     alt="ID Preview"
//                     width={100}
//                     height={100}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="text-[#0B0B0B] text-[13px] font-normal">
//                     File uploaded: {files.govId?.name}
//                   </div>
//                 )
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <MdBackup className="w-[36px] h-[36px]" />
//                   <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
//                     Drag your file(s) or{" "}
//                     <span className="text-[#192027] text-[13px] font-medium">
//                       browse
//                     </span>
//                   </p>
//                   <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
//                     Max 10 MB files are allowed
//                   </span>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange("govId")}
//               className="hidden"
//               id="fileInputGovId"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end items-center gap-3 self-stretch">
//           <button
//             type="button"
//             className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold not-italic"
//           >
//             Save as Draft
//           </button>
//           <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
//             <button
//               type="button"
//               className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] not-italic font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] not-italic font-semibold ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isSubmitting ? "Uploading..." : "Next"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdBackup } from "react-icons/md";
import toast from "react-hot-toast";

export default function Document({ companyId, onSuccess }) {
  const [previews, setPreviews] = useState({
    certIncorporation: null,
    businessLicense: null,
    mou: null,
    nda: null,
    sla: null,
    govId: null,
  });

  const [files, setFiles] = useState({
    certIncorporation: null,
    businessLicense: null,
    mou: null,
    nda: null,
    sla: null,
    govId: null,
  });

  const [fileUrls, setFileUrls] = useState({
    certIncorporation: null,
    businessLicense: null,
    mou: null,
    nda: null,
    sla: null,
    govId: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (key) => async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} exceeds 10 MB limit.`);
        return;
      }
      if (previews[key]) {
        URL.revokeObjectURL(previews[key]);
      }
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [key]: previewUrl }));
      setFiles((prev) => ({ ...prev, [key]: file }));

      // Encode file to base64 and upload to /upload
      try {
        const base64 = await fileToBase64(file);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: [
              {
                folder: "platform",
                content: {
                  doc_name: file.name,
                  document: base64,
                },
              },
            ],
          }),
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.status}`);
        }

        const uploadData = await uploadResponse.json();
        if (uploadData.body.success && uploadData.body.data.urls[0]?.url) {
          setFileUrls((prev) => ({
            ...prev,
            [key]: uploadData.body.data.urls[0].url,
          }));
          toast.success(`File ${file.name} uploaded successfully!`);
        } else {
          throw new Error("No URL returned from upload");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove data:image/*;base64, prefix
      reader.onerror = (error) => reject(error);
    });
  };

  const isImageFile = (url) => {
    return url && /\.(jpg|jpeg|png|gif|svg)$/i.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     const hasAtLeastOneFile = Object.values(fileUrls).some(
       (url) => url !== null
     );
     if (!hasAtLeastOneFile) {
       toast.error("Please upload at least one document before continuing.");
       return;
     }

    if (!companyId) {
      toast.error("Company ID is missing.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("companyId", companyId);
    Object.entries(fileUrls).forEach(([key, url]) => {
      if (url) {
        formData.append(key, url);
      }
    });

    try {
      const response = await fetch("/api/companyDocs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.companyId) {
        toast.success("Documents uploaded successfully!", {
          duration: 4000,
          position: "top-right",
        });
        onSuccess(data.companyId, "Staffs");
      } else {
        throw new Error("No companyId returned from API");
      }
    } catch (error) {
      console.error("Fetch error:", error.message, error.stack);
      toast.error(`Failed to upload documents: ${error.message}`, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);

  return (
    <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <h2 className="text-[#212B36] text-[16px] font-semibold">
          Company Information
        </h2>
        <span className="text-[#667E99] text-[13px] font-normal">
          Please provide your company's official documentation to complete the
          verification process.
        </span>
        <p className="w-full h-[1px] bg-[#C4CDD5]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-[10px] gap-[32px]"
      >
        <div className="grid grid-cols-2 gap-y-5 gap-x-5 w-full">
          {/* Certificate of Incorporation */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Certificate of Incorporation
            </h2>
            <label
              htmlFor="fileInputCertIncorporation"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.certIncorporation ? (
                isImageFile(previews.certIncorporation) ? (
                  <Image
                    src={previews.certIncorporation}
                    alt="Certificate Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.certIncorporation?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("certIncorporation")}
              className="hidden"
              id="fileInputCertIncorporation"
            />
          </div>

          {/* Business License & Permits */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Business License & Permits
            </h2>
            <label
              htmlFor="fileInputBusinessLicense"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.businessLicense ? (
                isImageFile(previews.businessLicense) ? (
                  <Image
                    src={previews.businessLicense}
                    alt="License Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.businessLicense?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("businessLicense")}
              className="hidden"
              id="fileInputBusinessLicense"
            />
          </div>

          {/* Memorandum of Understanding (MoU) */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Memorandum of Understanding (MoU)
            </h2>
            <label
              htmlFor="fileInputMou"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.mou ? (
                isImageFile(previews.mou) ? (
                  <Image
                    src={previews.mou}
                    alt="MoU Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.mou?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("mou")}
              className="hidden"
              id="fileInputMou"
            />
          </div>

          {/* Non-Disclosure Agreement (NDA) */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Non-Disclosure Agreement (NDA)
            </h2>
            <label
              htmlFor="fileInputNda"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.nda ? (
                isImageFile(previews.nda) ? (
                  <Image
                    src={previews.nda}
                    alt="NDA Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.nda?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("nda")}
              className="hidden"
              id="fileInputNda"
            />
          </div>

          {/* Service Level Agreement (SLA) */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Service Level Agreement (SLA)
            </h2>
            <label
              htmlFor="fileInputSla"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.sla ? (
                isImageFile(previews.sla) ? (
                  <Image
                    src={previews.sla}
                    alt="SLA Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.sla?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("sla")}
              className="hidden"
              id="fileInputSla"
            />
          </div>

          {/* Government-Issued ID */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
              Government-Issued ID of the Company Spokesperson
            </h2>
            <label
              htmlFor="fileInputGovId"
              className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-full cursor-pointer"
            >
              {previews.govId ? (
                isImageFile(previews.govId) ? (
                  <Image
                    src={previews.govId}
                    alt="ID Preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-[#0B0B0B] text-[13px] font-normal">
                    File uploaded: {files.govId?.name}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <MdBackup className="w-[36px] h-[36px]" />
                  <p className="flex justify-center items-start gap-1 self-stretch text-[#0B0B0B] text-[13px] font-normal pt-3">
                    Drag your file(s) or{" "}
                    <span className="text-[#192027] text-[13px] font-medium">
                      browse
                    </span>
                  </p>
                  <span className="text-[#6D6D6D] self-stretch text-center font-normal text-[13px] pt-2">
                    Max 10 MB files are allowed
                  </span>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange("govId")}
              className="hidden"
              id="fileInputGovId"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 self-stretch">
          <button
            type="button"
            className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold not-italic"
          >
            Save as Draft
          </button>
          <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
            <button
              type="button"
              className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] not-italic font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] not-italic font-semibold ${
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
