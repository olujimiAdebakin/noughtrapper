'use client';

import { IoIosArrowBack } from "react-icons/io";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { IoMdArrowDropright } from "react-icons/io";
import { useState, useEffect } from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Textarea } from "@nextui-org/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function TemplateRequest() {
    const router = useRouter();

    const { template_id } = useParams();

   
    
    const [template, setTemplate] = useState(null);
    


    const [emailList, setEmailList] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [showAddEmailModal, setShowAddEmailModal] = useState(false);
    const [showEmailInputModal, setShowEmailInputModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);








    useEffect(() => {
        // Fetch the templates from the API
        const fetchTemplates = async () => {
    
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const endpoint = `${baseUrl}/v1/get-specific-template?template_id=${template_id}`;
        
          try {
            const accessToken = Cookies.get('authToken');

            const response = await fetch(`${endpoint}`, {
                method: 'GET',
                headers: {
              'Authorization': `${accessToken}`,
              'Content-Type': 'application/json',
              },
              });
    
            const data = await response.json();
            if (data.statusCode === 200) {
              const templatesData = JSON.parse(data.body) || [];
              setTemplate(templatesData);
    
            }
          } catch (error) {
            console.error("Error fetching templates:", error);
          }
        };
    
        fetchTemplates();
      }, [template_id]);




    // Function to add email with validation
    const addEmail = () => {
        if (!newEmail.trim()) {
            setError("Email cannot be empty.");
            return;
        }
        if (!newEmail.includes("@") || !newEmail.includes(".")) {
            setError("Invalid email address.");
            return;
        }
        if (emailList.includes(newEmail)) {
            setError("This email is already added.");
            return;
        }

        setEmailList([...emailList, newEmail]);
        setNewEmail("");
        setError("");
        setShowEmailInputModal(false);
    };

    // Function to remove email
    const removeEmail = (emailToRemove) => {
        setEmailList(emailList.filter(email => email !== emailToRemove));
    };

    // Function to handle sending mail
    const sendMail = () => {
        setShowConfirmModal(true);
    };

    return (
        <div className="px-6 h-screen">
            <div className="mb-5 pt-5">
                <button 
                    className="flex text-black text-xl items-center font-semibold"
                    onClick={() => router.back()}
                >
                    <IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500'/>
                    Back
                </button>
            </div>

            <div className="pb-5">
                <Breadcrumbs separator={<IoMdArrowDropright className='text-default-500' />}>
                    <BreadcrumbItem href="/platform" className='text-red-500 font-semibold'>Platform</BreadcrumbItem>
                    <BreadcrumbItem className="font-semibold text-red-500">Templates</BreadcrumbItem>
                    <BreadcrumbItem className="font-semibold">{template?.name} Template</BreadcrumbItem>
                </Breadcrumbs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">            
                <div className="md:col-span-2">
                    <div className="bg-white p-8">
                        <h2 className="text-center font-bold text-lg mb-4">
                            {template?.name} Template
                        </h2>
                        <div className="bg-orange-50 p-4 rounded-lg mb-4">
                            <img src="/icons/facebook.svg" width={40} height={40} alt="" className="border-2 bg-default-200 rounded-sm p-1"/>
                        </div>
                        <h5 className="font-semibold text-sm mt-10 mb-3">{ template?.email_subject || 'Message'}</h5>

                        <div className="bg-white border border-default-300 p-2 rounded-lg mb-10">
                            <Textarea
                                placeholder="Dear Valued Staff, We have detected an unusual login attempt on your Wema Bank Staff Portal account. For your security, we recommend resetting your password immediately. Please click the secure link below to update your credentials:[Reset My Password] ⚠️ Note: This link will expire in 6 hours to ensure maximum security. If you did not request this change or suspect any fraudulent activity, please contact the IT Support Desk at security@wemabank.com immediately. Your security is our top priority. Kind regards, Wema Bank IT Security Team"
                                value={template?.message}
                                readOnly
                                className="w-full"
                            />    
                        </div>

                        <div className="border-b-4 border-red-500"></div>
                    </div>     
                </div>

                <div className="md:col-span-1">
                    <div className="flex flex-col items-center justify-center border-2 bg-white rounded-xl p-4">
                        <Button
                            className="mt-4 w-full bg-red-500 text-white"
                            startContent={<RiSendPlaneFill size={18} />}
                            onClick={() => setShowAddEmailModal(true)}
                        >
                            Send Mail
                        </Button>

                        <Button className="mt-4 w-full bg-default-500 text-white">
                            Save to Draft
                        </Button>
                    </div>
                </div>
            </div>

        <div>
            {/* Add Email Pop-up */}
            <Modal isOpen={showAddEmailModal} onClose={() => setShowAddEmailModal(false)} className="border-2 border-red-400">
                <ModalContent>
                    <ModalHeader>Add People to send the Link to:</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {emailList.map((email, index) => (
                                <Chip key={index} color="default" className="flex items-center gap-2">
                                    {email}
                                    <button 
                                        onClick={() => removeEmail(email)} 
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ❌
                                    </button>
                                </Chip>
                            ))}
                        </div>
                        <Button color="danger" onClick={() => setShowEmailInputModal(true)}>Add Email</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={sendMail}>Send Mail</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Add Email Input Modal */}
            <Modal isOpen={showEmailInputModal} onClose={() => setShowEmailInputModal(false)} className="border-2 border-red-400">
                <ModalContent>
                    <ModalHeader>Add People to send the link to:</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Email address"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="border border-red-300 rounded-md"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={addEmail} disabled={!newEmail.trim()}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                <ModalContent>
                    <ModalHeader className="items-center justify-center mt-3">
                        <img src="/icons/sent.svg" width={50} height={50} alt="" />
                    </ModalHeader>
                    <ModalBody className="items-center justify-center">
                        <h4 className="text-2xl font-semibold mt-4">
                            Message Sent Successfully!
                        </h4>
                        <p>
                            Your password reset request has been successfully sent to the user. They will receive an email with further instructions shortly.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {
                        setShowConfirmModal(false);
                        setShowAddEmailModal(false);
                        setShowEmailInputModal(false);
                          }} 
                         className="w-full">
                            Go to Homepage
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>

        </div>
    );
}
