import React from 'react'
import { Button } from "@nextui-org/react";

export default function ExamAwarenessDash1() {
  return (
    <div>
      <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Cyber Security Comprehensive Exam</h1>
                <p className="text-gray-500 text-sm">Evaluating Expertise and Readiness in Digital Protection</p>
              </div>
              <Button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700" 
              onClick={() => router.push('/exams/create-exam')}>
                + Create Exam
              </Button>
            </div>
    </div>
  )
}
