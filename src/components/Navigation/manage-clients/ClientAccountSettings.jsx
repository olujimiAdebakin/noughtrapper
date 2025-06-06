"use client";
import { useState, useEffect } from "react";
import Switch from "../../reusable/Switch";
import { useRouter } from "next/navigation";
import { CiImport } from "react-icons/ci";
import { SiReadthedocs } from "react-icons/si";
import toast from "react-hot-toast";

export default function ClientAccountSettings({ clientData }) {
  const router = useRouter();

  // Extract data from clientData with defaults
  const companyId = clientData?.companyDetails?.companyId || "NOU-1157";

  // Handle contractPlan correctly - it's an object in your API response
  const initialPlanType =
    clientData?.accountSettings?.contractPlan?.planType || "N/A";

  const initialAccountSettings = {
    contractPlan: initialPlanType,
    status: clientData?.accountSettings?.status || "unpaid",
    settings: clientData?.accountSettings?.settings || {},
  };

  console.log("ClientAccountSettings - clientData:", clientData);
  console.log(
    "ClientAccountSettings - initialAccountSettings:",
    initialAccountSettings
  );

  // Initialize state from clientData for editing/review
  const [formData, setFormData] = useState({
    contractPlan: initialAccountSettings.contractPlan,
    settings: {
      registrationConfirmation:
        initialAccountSettings.settings.registrationConfirmation || false,
      registrationCompleted:
        initialAccountSettings.settings.registrationCompleted || false,
      registrationCancelled:
        initialAccountSettings.settings.registrationCancelled || false,
      smsReminders: initialAccountSettings.settings.smsReminders || false,
      emailReminders: initialAccountSettings.settings.emailReminders || false,
      whatsappReminders:
        initialAccountSettings.settings.whatsappReminders || false,
      productUpdates: initialAccountSettings.settings.productUpdates || false,
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
        ? "N/A"
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

    if (!formData.contractPlan || formData.contractPlan === "N/A") {
      toast.error("Please select a contract plan.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      companyId,
      accountSettings: {
        contractPlan: {
          planType: formData.contractPlan,
          createdAt:
            clientData?.accountSettings?.contractPlan?.createdAt ||
            new Date().toISOString(),
        },
        status: initialAccountSettings.status, // Preserve original status
        settings: formData.settings,
      },
    };

    console.log("Submitting updated settings to PUT:", payload);

    try {
      // Placeholder PUT request for editing existing settings
      const response = await fetch(
        `/api/clientDetails?companyId=${companyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("PUT API Response:", data);
      toast.success("Settings updated successfully!", {
        duration: 4000,
        position: "top-right",
      });
      router.push("/manage-clients");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(
        `Failed to update settings: ${error.message} (PUT endpoint not implemented yet)`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-t-[#FD3842] border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg font-semibold">
              Saving Changes...
            </p>
          </div>
        </div>
      )}

      <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex items-start justify-between gap-3 self-stretch">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <h2 className="text-[#212B36] text-[16px] font-semibold">
                Account Settings Review & Edit
              </h2>
              <span className="text-[#667E99] text-[13px] font-normal">
                Review or update contract plan and notification settings
                (Current: {formData.contractPlan}, Status:{" "}
                {initialAccountSettings.status})
              </span>
            </div>
          </div>
          <p className="w-full h-[1px] bg-[#C4CDD5]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col pt-[10px]">
          <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
            <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
              Contract Plan
            </h2>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Three Months Plan
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.contractPlan === "Three Months Plan"}
                onChange={handleContractPlanChange("Three Months Plan")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Six Months Plan
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.contractPlan === "Six Months Plan"}
                onChange={handleContractPlanChange("Six Months Plan")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  One Year Plan
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.contractPlan === "One Year Plan"}
                onChange={handleContractPlanChange("One Year Plan")}
              />
            </div>
          </div>

          <p className="w-full h-[1px] bg-[#C4CDD5]" />

          <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
            <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
              Email Notifications
            </h2>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Registration Confirmation
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.settings.registrationConfirmation}
                onChange={handleSettingsChange("registrationConfirmation")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Registration Completed
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.settings.registrationCompleted}
                onChange={handleSettingsChange("registrationCompleted")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Registration Cancelled
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Notification sent automatically to the client after they
                  register
                </small>
              </div>
              <Switch
                checked={formData.settings.registrationCancelled}
                onChange={handleSettingsChange("registrationCancelled")}
              />
            </div>
          </div>

          <p className="w-full h-[1px] bg-[#C4CDD5]" />

          <div className="flex flex-col p-4 gap-4 items-start self-stretch rounded-xl bg-white pb-6 pt-6">
            <h2 className="text-[#04091E] text-[18px] font-semibold self-stretch">
              Communication Preferences
            </h2>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Service expiration reminders via SMS
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  By enabling, you consent to phone number use for sending
                  reminders as per our Privacy Policy.
                </small>
              </div>
              <Switch
                checked={formData.settings.smsReminders}
                onChange={handleSettingsChange("smsReminders")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Service expiration reminders via Email
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  By enabling, you consent to email use for sending reminders as
                  per our Privacy Policy.
                </small>
              </div>
              <Switch
                checked={formData.settings.emailReminders}
                onChange={handleSettingsChange("emailReminders")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Service expiration reminders via WhatsApp
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  By enabling, you consent to phone number use for sending
                  reminders as per our Privacy Policy.
                </small>
              </div>
              <Switch
                checked={formData.settings.whatsappReminders}
                onChange={handleSettingsChange("whatsappReminders")}
              />
            </div>
            <div className="flex justify-between self-stretch items-center">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#04091E] text-[16px] font-normal">
                  Updates about our products and special offers via email
                </span>
                <small className="text-[#747681] text-[13px] font-normal">
                  Receive discounts and be the first to know about our latest
                  features.
                </small>
              </div>
              <Switch
                checked={formData.settings.productUpdates}
                onChange={handleSettingsChange("productUpdates")}
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 self-stretch pt-6">
            <button
              type="button"
              className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold not-italic"
            >
              Save as Draft
            </button>
            <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => router.push("/manage-clients")}
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
                {isSubmitting ? "Submitting..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
