"use client"

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClientsModal() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isSetupOpen,
    onOpen: openSetup,
    onOpenChange: onSetupChange,
  } = useDisclosure();

  // Combined state for selection and checkbox
  const [selection, setSelection] = useState({
    option: null,
    isChecked: false,
  });

  // Store the selected option when moving to success modal
  const [selectedForSuccess, setSelectedForSuccess] = useState(null);

  // Handle card selection
  const handleCardSelect = (option) => {
    setSelection({
      option,
      isChecked: false,
    });
  };

  // Handle checkbox toggle for specific option
  const handleCheckboxToggle = (option, e) => {
    e.stopPropagation(); // Stop event bubbling
    setSelection({
      option,
      isChecked: selection.option === option ? !selection.isChecked : true,
    });
  };

  // Handle confirm button click
  const handleConfirm = (onClose) => {
    setSelectedForSuccess(selection.option); // Store the selection
    onClose();
    openSetup();
    setSelection({ option: null, isChecked: false });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex h-[40px] py-[10px] px-[16px] justify-center items-center bg-[#FD3842] rounded-md gap-[4px] text-white text-[16px] font-medium"
      >
        Create Clients
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col items-center gap-[24px]">
                <div className="flex flex-col items-center gap-[24px]">
                  <div className="flex flex-col items-center gap-[10px] self-stretch p-3">
                    <Image
                      src="/nought.png"
                      width={36}
                      height={38}
                      alt="Noughtrapper"
                    />
                  </div>

                  <div className="flex p-3 justify-center items-center gap-3 mt-3">
                    <h1 className="text-[#171A1F] text-center font-semibold text-[20px]">
                      How would you like to manage this client's software?
                    </h1>
                  </div>

                  <div className="flex justify-between w-full gap-4">
                    {/* Self-Managed Card */}
                    <div
                      onClick={() => handleCardSelect("self-managed")}
                      className={`flex p-[36px] flex-col items-start gap-4 rounded-lg border border-[#E2E8F0] bg-white transition-all hover:outline hover:outline-2 hover:shadow-sm cursor-pointer ${
                        selection.option === "self-managed"
                          ? "outline-[#FEA3A8]"
                          : "hover:outline-[#FEA3A8]"
                      }`}
                    >
                      <div className="flex gap-20">
                        <div className="flex w-[48px] h-[48px] justify-center items-center gap-3 rounded-[123px] bg-[#F8FAFC]">
                          <Image
                            src="/self-assessment.png"
                            width={24}
                            height={24}
                            alt="self-assessment"
                          />
                        </div>
                        <Checkbox
                          color="danger"
                          isSelected={
                            selection.option === "self-managed" &&
                            selection.isChecked
                          }
                          onChange={(e) =>
                            handleCheckboxToggle("self-managed", e)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-[#1E293B] text-4 font-semibold self-stretch">
                          Self-Managed
                        </h2>
                        <span className="text-[#475569] text-[13px] font-normal">
                          Client handles everything
                        </span>
                      </div>
                    </div>

                    {/* Company-Managed Card */}
                    <div
                      onClick={() => handleCardSelect("company-managed")}
                      className={`flex p-[36px] flex-col items-start gap-4 rounded-lg border border-[#E2E8F0] bg-white transition-all hover:outline hover:outline-2 hover:shadow-sm cursor-pointer ${
                        selection.option === "company-managed"
                          ? "outline-[#FEA3A8]"
                          : "hover:outline-[#FEA3A8]"
                      }`}
                    >
                      <div className="flex gap-20">
                        <div className="flex w-[48px] h-[48px] justify-center items-center gap-3 rounded-[123px] bg-[#F8FAFC]">
                          <Image
                            src="/business.png"
                            width={24}
                            height={24}
                            alt="business"
                          />
                        </div>
                        <Checkbox
                          color="danger"
                          isSelected={
                            selection.option === "company-managed" &&
                            selection.isChecked
                          }
                          onChange={(e) =>
                            handleCheckboxToggle("company-managed", e)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-[#1E293B] text-4 font-semibold self-stretch">
                          Company-Managed
                        </h2>
                        <span className="text-[#475569] text-[13px] font-normal">
                          We manage it for them
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-center gap-14">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="py-2 px-4 w-[188px] justify-center items-center gap-2 flex bg-white border border-[#192027] rounded text-[#121212] text-[16px] font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => handleConfirm(onClose)}
                  disabled={!selection.isChecked}
                  className={`py-2 px-4 w-[188px] justify-center items-center gap-2 flex rounded text-white text-[16px] font-medium ${
                    selection.isChecked
                      ? "bg-[#FD3842]"
                      : "bg-[#FEA3A8] cursor-not-allowed"
                  }`}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSetupOpen}
        onOpenChange={onSetupChange}
        className="max-w-2xl bg-[#fffeff] shadow-sm p-[40px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex flex-col items-center gap-[24px] ">
                  <div className="flex w-[48px] h-[48px] p-3 justify-center items-center aspect-square rounded-[28px] border border-[#ECFDF3] bg-[#D1FADF] ">
                    <Image
                      src="/check-circle.png"
                      width={24}
                      height={24}
                      alt="success"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-center text-[#171A1F] font-semibold text-[20px]">
                      Success!
                    </h3>
                    <p className="text-[#171A1F] text-center font-normal text-[16px]">
                      {selectedForSuccess === "company-managed"
                        ? "This client's software will be managed by our company. Proceed to complete the setup."
                        : "This client's software will be self-managed. Proceed to complete the setup."}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  onPress={onClose}
                  className="py-2 px-4 w-[234px] justify-center items-center gap-2 flex bg-[#FD3842] text-[#fff] text-[16px] font-medium rounded-lg"
                  onClick={() => router.push("/manage-clients/create-client")}
                >
                  Proceed To Setup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
