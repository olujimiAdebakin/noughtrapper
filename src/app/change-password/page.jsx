


// "use client";

// import { Button, Card } from "@nextui-org/react";
// import Image from "next/image";
// import { Eye, EyeOff, Lock, Mail } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Define the validation schema using Zod
// const changePasswordSchema = z
//   .object({
//     email: z
//       .string()
//       .email("Invalid email address")
//       .min(1, "Email is required"),
//     oldPassword: z.string().min(1, "Old password is required"),
//     newPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters long")
//       .regex(/[0-9]/, "Password must contain at least one number")
//       .regex(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         "Password must contain at least one symbol"
//       )
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
//   })
//   .refine((data) => data.oldPassword !== data.newPassword, {
//     message: "New password must be different from old password",
//     path: ["newPassword"],
//   });

// export default function ChangePassword() {
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(changePasswordSchema),
//     defaultValues: {
//       email: "",
//       oldPassword: "",
//       newPassword: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch("/api/change-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: data.email,
//           old_password: data.oldPassword,
//           new_password: data.newPassword,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok && result.body.success) {
//         toast.success("Password changed successfully!");
//         router.push("/login");
//       } else {
//         const errorMsg = result.message || "Failed to change password.";
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       }
//     } catch (error) {
//       const errorMsg = "Something went wrong. Please try again.";
//       setErrorMessage(errorMsg);
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar */}
//       <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
//         <img src="/nought-logo.svg" alt="Noughttrapper Logo" className="h-10" />
//         <h4 className="text-white font-semibold ms-2 text-xl">Noughttrapper</h4>
//       </div>

//       {/* Main Content */}
//       <div className="h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
//         {/* Background Logo */}
//         <Image
//           src="/nought-logo.svg"
//           alt="Nought Logo"
//           width={430}
//           height={430}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
//         />

//         {/* Password Reset Card */}
//         <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold mb-1">Create New Password</h2>
//               <p>Enter your new password below</p>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <p className="text-center text-sm text-red-500 mb-3">
//                 {errorMessage}
//               </p>
//             )}

//             {/* Email Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1 text-red-500">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
//                   size={20}
//                 />
//                 <input
//                   {...register("email")}
//                   type="email"
//                   className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Old Password Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1 text-red-400">
//                 Old Password
//               </label>
//               <div className="relative">
//                 <Lock
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
//                   size={20}
//                 />
//                 <input
//                   {...register("oldPassword")}
//                   type={showOldPassword ? "text" : "password"}
//                   className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
//                   placeholder="Enter old password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowOldPassword(!showOldPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
//                 >
//                   {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.oldPassword && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.oldPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* New Password Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1 text-red-400">
//                 New Password
//               </label>
//               <div className="relative">
//                 <Lock
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
//                   size={20}
//                 />
//                 <input
//                   {...register("newPassword")}
//                   type={showNewPassword ? "text" : "password"}
//                   className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
//                   placeholder="Enter new password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowNewPassword(!showNewPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
//                 >
//                   {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.newPassword && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.newPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save new Password"}
//             </Button>

//             <p className="text-center text-xs text-blue-400 mt-10">
//               🔒 All information is safely secured
//             </p>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema using Zod
const changePasswordSchema = z
  .object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { email: "", oldPassword: "", newPassword: "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          old_password: data.oldPassword,
          new_password: data.newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.body && result.body.success) {
        toast.success(
          result.body.message || "Password changed successfully!🏆 · 🎯 · 🚀"
        );
        router.push("/login");
      } else {
        // Extract error message from the response
        const errorMsg =
          (result.body && result.body.message) ||
          result.message ||
          "Failed to change password.";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
        console.error("Error in password change:", error);
      const errorMsg = "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full flex items-center justify-center bg-[#0f172a] py-4 shadow-md border-b-3 border-red-500">
        <img src="/nought-logo.svg" alt="Noughttrapper Logo" className="h-10" />
        <h4 className="text-white font-semibold ms-2 text-xl">Noughttrapper</h4>
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        <Image
          src="/nought-logo.svg"
          alt="Nought Logo"
          width={430}
          height={430}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
        />

        <Card className="relative z-10 w-[400px] p-8 bg-[#0f172a] bg-opacity-90 text-white shadow-lg rounded-lg my-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-1">Create New Password</h2>
              <p>Enter your new password below</p>
            </div>

            {errorMessage && (
              <p className="text-center text-sm text-red-500 mb-3">{errorMessage}</p>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-red-500">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-red-400">Old Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
                <input
                  {...register("oldPassword")}
                  type={showOldPassword ? "text" : "password"}
                  className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
                  placeholder="Enter old password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.oldPassword.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-red-400">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  className="w-full border border-red-500 bg-transparent text-white rounded-xl p-2 pl-10 outline-none focus:border-red-600"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save new Password"}
            </Button>

            <p className="text-center text-xs text-blue-400 mt-10">
              🔒 All information is safely secured
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}