"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Image from "next/image";
import { MdBackup } from "react-icons/md";
import toast from "react-hot-toast";

export default function CompanyDetails({ onSuccess }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    employeeCount: "",
    companySpokesperson: "",
    spokespersonPhone: "",
    companyLogo: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum size is 10 MB.");
        return;
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };

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

  const filterCountryOption = (option, inputValue) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase());

  const uploadImageToS3 = async (file) => {
    // Replace with actual S3 upload logic
    console.log("Uploading image:", file.name);
    return new Promise((resolve) => {
      setTimeout(() => resolve("https://example.com/logo.png"), 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let logoUrl = formData.companyLogo;
    if (imageFile) {
      logoUrl = await uploadImageToS3(imageFile);
    }

    const payload = {
      step: "details",
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      employeeCount: parseInt(formData.employeeCount) || 0,
      companySpokesperson: formData.companySpokesperson,
      spokespersonPhone: formData.spokespersonPhone,
      companyLogo: logoUrl,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: formData.address,
    };

    console.log("Submitting payload:", JSON.stringify(payload));

    // In your handleSubmit function, replace the external fetch with:
    try {
      const response = await fetch("/api/companyDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.companyId) {
            toast.success("Document uploaded successfully!");
        onSuccess(data.companyId, "Document");
      } else {
        throw new Error("No companyId returned from API");
      }
    } catch (error) {
      console.error("Fetch error:", error.message, error.stack);
      toast.error(`Failed to save company details: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

    // try {
    //   const response = await fetch(
    //     "https://enm2jqkwz5.execute-api.us-east-1.amazonaws.com/dev/v1/add-cliemt",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(payload),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   console.log("API Response:", data);

    //   if (data.companyId) {
    //     onSuccess(data.companyId, "Document");
    //   } else {
    //     throw new Error("No companyId returned from API");
    //   }
    // } catch (error) {
    //   console.error("Fetch error:", error.message, error.stack);
    //   alert(`Failed to save company details: ${error.message}`);

      // Mock success for testing (remove this in production)
      // onSuccess("COMP-TEST-123", "Document");




  useEffect(() => {
    if (selectedCountry) {
      setFormData((prev) => ({
        ...prev,
        country: Country.getCountryByCode(selectedCountry)?.name,
      }));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const [countryCode, stateCode, cityName] = selectedState.split("-");
      setFormData((prev) => ({
        ...prev,
        state: State.getStateByCodeAndCountry(stateCode, countryCode)?.name,
        city: cityName,
      }));
    }
  }, [selectedState]);

  return (
    <div className="flex p-6 flex-col gap-8 self-stretch rounded-xl bg-white">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <h2 className="text-[#212B36] text-[16px] font-semibold">
          General Information
        </h2>
        <span className="text-[#667E99] text-[13px] font-normal">
          Setting up your company account to manage data
        </span>
        <p className="w-full h-[1px] bg-[#C4CDD5]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-[10px] gap-[32px]"
      >
        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              Company Email
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              placeholder="Company Email"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              Total Number of Employees
            </label>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleInputChange}
              placeholder="Total Number of Employees"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[#384554] text-[13px] font-medium">
              Company Spokesperson
            </label>
            <input
              type="text"
              name="companySpokesperson"
              value={formData.companySpokesperson}
              onChange={handleInputChange}
              placeholder="Company Spokesperson Full Name"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
            />
          </div>
        </div>

        <div className="flex items-start gap-[14px] self-stretch">
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[#384554] text-[13px] font-medium">
              Spokesperson Phone No.
            </label>
            <input
              type="text"
              name="spokespersonPhone"
              value={formData.spokespersonPhone}
              onChange={handleInputChange}
              placeholder="Company Spokesperson Phone No."
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[#384554] text-[13px] font-medium">
              Company Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Company's Address"
              className="flex py-2 px-3 self-stretch items-center gap-2 rounded-lg border-1 border-[#F9F9FC] placeholder:text-[rgba(29,_31,_44,_0.40)] text-4 font-normal bg-[#F9F9FC]"
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
              onChange={(selected) => {
                setSelectedCountry(selected.value);
                setSelectedState(null);
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
              onChange={(selected) => setSelectedState(selected.value)}
              placeholder="Select State/City"
              className="w-full"
              isDisabled={!selectedCountry}
              isSearchable={true}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="flex items-start self-stretch gap-1 text-[#212B36] text-4 font-semibold">
            Company Logo
          </h2>
          <label
            htmlFor="fileInput"
            className="border-dashed border-2 border-[#001A38] bg-white rounded-lg p-6 flex flex-col items-center gap-3 flex-1 justify-center w-1/2 cursor-pointer"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Logo Preview"
                width={100}
                height={100}
                className="rounded-lg"
              />
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
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />
        </div>

        <div className="flex justify-end items-center gap-3 self-stretch">
          <button
            type="button"
            className="flex justify-center items-center gap-3 py-[8px] px-[20px] rounded-xl border-1 border-[#DFE3E8] text-[#212B36] text-4 font-bold"
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
              {isSubmitting ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
