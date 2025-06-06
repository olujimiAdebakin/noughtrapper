"use client";

import { useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const countryOptions = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: c.name,
  customLabel: (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/w40/${c.isoCode.toLowerCase()}.png`}
        alt={c.name}
        className="w-5 h-4"
      />
      {c.name}
    </div>
  ),
}));

const filterCountryOption = (option, inputValue) =>
  option.label.toLowerCase().includes(inputValue.toLowerCase());

export default function ClientCompanyDetails({ clientData, setActiveTab }) {
  const initialData = {
    companyName: clientData?.companyDetails.companyName || "",
    companyId: clientData?.companyDetails.companyId || "",
    companyEmail: clientData?.companyDetails.companyEmail || "",
    totalEmployees: clientData?.companyDetails.totalEmployees || "",
    spokesperson: clientData?.companyDetails.spokesperson || "",
    spokespersonPhone: clientData?.companyDetails.spokespersonPhone || "",
    address: clientData?.companyDetails.address || "",
    country: clientData?.companyDetails.country || "",
    state: clientData?.companyDetails.state || "",
    city: clientData?.companyDetails.city || "",
    logo: clientData?.companyDetails.logo || null,
  };

  const [formData, setFormData] = useState(initialData);
  const [selectedCountry, setSelectedCountry] = useState(
    clientData?.companyDetails.country
      ? Country.getAllCountries().find(
          (c) =>
            c.name.toLowerCase() ===
            clientData.companyDetails.country.toLowerCase()
        )?.isoCode || null
      : null
  );
  const [imagePreview, setImagePreview] = useState(
    clientData?.companyDetails.logo || null
  );
  const [imageFile, setImageFile] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [id]: value };
      setHasChanges(
        JSON.stringify(newData) !== JSON.stringify(initialData) ||
          imageFile !== null
      );
      return newData;
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 10 MB.");
        return;
      }
      if (imagePreview && imagePreview !== formData.logo) {
        URL.revokeObjectURL(imagePreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setFormData((prev) => {
        const newData = { ...prev, logo: previewUrl };
        setHasChanges(true);
        return newData;
      });
    }
  };

  const handleImageDelete = () => {
    if (imagePreview && imagePreview !== formData.logo) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
    setFormData((prev) => {
      const newData = { ...prev, logo: null };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(initialData));
      return newData;
    });
    const input = document.getElementById("fileInput");
    if (input) input.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Changes are temporary (not saved yet). Moving to Client Document tab."
    );
    setHasChanges(false);
    setActiveTab("Client Document");
  };

  const stateCityOptions =
    selectedCountry &&
    State.getStatesOfCountry(selectedCountry).flatMap((state) => {
      const cities = City.getCitiesOfState(selectedCountry, state.isoCode);
      return cities.map((city) => ({
        value: `${selectedCountry}-${state.isoCode}-${city.name}`,
        label: `${city.name}, ${state.name}`,
        state: state.name,
        city: city.name,
      }));
    });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const updatedData = {
  //     companyName: formData.companyName,
  //     companyId: formData.companyId,
  //     companyEmail: formData.companyEmail,
  //     totalEmployees: parseInt(formData.totalEmployees, 10) || 0,
  //     spokesperson: formData.spokesperson,
  //     spokespersonPhone: formData.spokespersonPhone,
  //     address: formData.address,
  //     country: formData.country,
  //     state: formData.state,
  //     city: formData.city,
  //     logo: formData.logo,
  //   };

  //   try {
  //     const response = await fetch("/api/updateClientDetails", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedData),
  //     });
  //     if (response.ok) {
  //       toast.success("Changes saved successfully!");
  //       setHasChanges(false);
  //       setActiveTab("Client Document");
  //     } else {
  //       throw new Error("Failed to save changes");
  //     }
  //   } catch (error) {
  //     toast.error(`Error: ${error.message}`);
  //   }
  // };

  return (
    <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-[10px] gap-[32px]"
      >
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h2 className="text-[#212B36] text-[16px] font-semibold">
            General Information
          </h2>
          <span className="text-[#667E99] text-[13px] font-normal">
            Edit company details as needed
            
           
          </span>
          <p className="w-full h-[1px] bg-[#C4CDD5]" />
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label
              htmlFor="companyName"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label
              htmlFor="companyEmail"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              placeholder="Company Email"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label
              htmlFor="companyId"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company ID
            </label>
            <input
              type="text"
              id="companyId"
              value={formData.companyId}
              onChange={handleInputChange}
              placeholder="Company ID"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
              readOnly
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label
              htmlFor="totalEmployees"
              className="text-[#384554] text-[13px] font-medium"
            >
              Total Number of Employees
            </label>
            <input
              type="number"
              id="totalEmployees"
              value={formData.totalEmployees}
              onChange={handleInputChange}
              placeholder="Total Number of Employees"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-full">
            <label
              htmlFor="spokesperson"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company Spokesperson Full Name
            </label>
            <input
              type="text"
              id="spokesperson"
              value={formData.spokesperson}
              onChange={handleInputChange}
              placeholder="Company Spokesperson Full Name"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label
              htmlFor="spokespersonPhone"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company Spokesperson Phone No.
            </label>
            <input
              type="tel"
              id="spokespersonPhone"
              value={formData.spokespersonPhone}
              onChange={handleInputChange}
              placeholder="Company Spokesperson Phone No."
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-full">
            <label
              htmlFor="address"
              className="text-[#384554] text-[13px] font-medium"
            >
              Company’s Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Company’s Address"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#EEEFF1] placeholder:text-[rgba(29,_31,_44,_0.40)] text-[14px] font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              Country
            </label>
            <Select
              options={countryOptions}
              value={
                countryOptions.find(
                  (option) => option.label === formData.country
                ) || null
              }
              onChange={(selected) => {
                setSelectedCountry(selected?.value || null);
                setFormData((prev) => {
                  const newData = {
                    ...prev,
                    country: selected?.label || "",
                    state: "",
                    city: "",
                  };
                  setHasChanges(
                    JSON.stringify(newData) !== JSON.stringify(initialData) ||
                      imageFile !== null
                  );
                  return newData;
                });
              }}
              placeholder="Select Country"
              className="w-full"
              isSearchable={true}
              filterOption={filterCountryOption}
              formatOptionLabel={(option) => option.customLabel}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              State/City
            </label>
            <Select
              options={stateCityOptions || []}
              value={
                stateCityOptions?.find(
                  (option) =>
                    option.label === `${formData.city}, ${formData.state}`
                ) || null
              }
              onChange={(selected) => {
                setFormData((prev) => {
                  const newData = {
                    ...prev,
                    state: selected?.state || "",
                    city: selected?.city || "",
                  };
                  setHasChanges(
                    JSON.stringify(newData) !== JSON.stringify(initialData) ||
                      imageFile !== null
                  );
                  return newData;
                });
              }}
              placeholder="Select State/City"
              className="w-full"
              isDisabled={!selectedCountry}
              isSearchable={true}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-[16px] font-semibold">
            Company Logo
          </h2>
          <label
            htmlFor="fileInput"
            className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex items-center gap-3 flex-1 w-1/2 cursor-pointer"
          >
            {imagePreview ? (
              <div className="flex justify-between items-center w-full">
                <Image
                  src={imagePreview}
                  alt="Logo Preview"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageDelete();
                  }}
                  className="flex items-center gap-2 py-1 px-3 text-[#FD3842] text-[20px] hover:text-[#e0323a] transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4 gap-2 flex-1 flex-shrink-0 rounded-xl bg-white border-1 border-[#E7E7E7]">
                <Image
                  src="/Bank-image.png"
                  width={40}
                  height={40}
                  alt="Company logo placeholder"
                />
                <div className="flex flex-col items-center gap-[2px]">
                  <h3 className="text-[#212B36] text-[14px] font-medium">
                    Upload Logo
                  </h3>
                  <span className="text-[#6B7280] text-[12px]">
                    Click to upload
                  </span>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="fileInput"
            />
          </label>
        </div>

        <div className="flex justify-end items-center gap-3 self-stretch">
          <div className="flex justify-end items-center gap-3 flex-1 flex-shrink-0">
            <button
              type="button"
              className="flex w-[122px] py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] border-1 border-[#192027] bg-white text-[#121212] text-[16px] font-medium"
              onClick={() => router.push("/manage-clients")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-[122px] h-10 py-2 px-4 justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#FD3842] text-[#fff] text-[16px] font-semibold"
              disabled={!hasChanges}
            >
               Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
