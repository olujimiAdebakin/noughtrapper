'use client'

import { useState } from "react";
import { IoIosArrowBack } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

import NewExamDetails from "../../../../components/pages/exams/NewExamDetails";
import SetExamQuestions from "../../../../components/pages/exams/SetExamQuestions";
import PreviewExamQuestions from "../../../../components/pages/exams/PreviewExamQuestions";
import CreateExamProgress from "../../../../components/pages/exams/CreateExamProgress";

export default function ExamPage() {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [questions, setQuestions] = useState([]); // Stores multiple questions

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-50 px-4">
        <div className="px-4">
                    <div className='flex justify-between mb-5 pt-5'>
                      <button
                        className='flex text-black text-xl items-center font-semibold'
                        onClick={() => router.push('/exams')}
                      >
                        <IoIosArrowBack className='bg-[#E6E8EB] w-16 h-10 p-1 me-4 rounded-lg hover:bg-gray-500' />
                        Back
                      </button>
                    </div>
        
                    <div>
                      <h4 className='font-bold text-xl mt-5 mb-2'>
                        Create Exam
                      </h4>
                    </div>
        
                    <div className='mb-5'>
                      <Breadcrumbs
                        itemClasses={{ separator: 'px-2' }}
                        separator={
                          <IoMdArrowDropright className='text-default-500' />
                        }
                      >
                        <BreadcrumbItem
                          href='/campaigns'
                          className='text-red-500 font-semibold'
                        >
                          Exams
                        </BreadcrumbItem>
                        <BreadcrumbItem className='font-semibold'>
                          Create Exam
                        </BreadcrumbItem>
                      </Breadcrumbs>
                    </div>
        </div>

      <div className="flex gap-5">
        {/* Left Column - Progress Tracker */}
        <div className="w-3/4 min-h-screen">
          {step === 1 && <NewExamDetails nextStep={nextStep} />}
          {step === 2 && <SetExamQuestions questions={questions} setQuestions={setQuestions} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <PreviewExamQuestions questions={questions} prevStep={prevStep} />}
        </div>

        {/* Right Column - Form Section */}
        <CreateExamProgress currentStep={step} />
      </div>
    </div>
  );
}
