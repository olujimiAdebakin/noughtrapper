'use client';

import { useState } from "react";
import { IoIosArrowBack } from 'react-icons/io';
import { FaChevronRight } from "react-icons/fa6";

export default function PreviewExamQuestions({ questions, prevStep }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className="bg-white text-center mb-5 p-4 ml-4 border rounded-md">
        <h1 className="font-semibold text-lg mb-2">Review Exam Qusestion</h1>
        <p className="text-gray-400">Check and refine your cybersecurity exam questions before publishing.</p>
      </div>

      <div className="bg-white p-4 ml-4 border rounded-md">
      <div className="flex justify-end border-b pb-5 mb-5 pe-4 pt-2">
          <button onClick={prevStep}
          className="text-red-500"
          >
            + Edit Question
          </button>
        </div>
        <p className="text-gray-500 font-semibold text-sm mb-4">
          Question {currentIndex + 1} of {questions.length}
        </p>

        {questions.length > 0 ? (
          <div className="mt-2">
            <p className="font-semibold bg-gray-100 px-4 py-2 border-b mb-4">{currentIndex + 1}. {currentQuestion.question}</p>


            {/* <ul className="mt-2 space-y-1">

              {currentQuestion.options.map((opt, i) => (
                <li
                  key={i}
                  className={`p-1 rounded ${
                    currentQuestion.answer.includes(opt)
                      ? "bg-green-100 text-green-700 font-semibold"
                      : ""
                  }`}
                >
                  {opt}
                </li>
              ))}

            </ul> */}


<ul className="mt-2 space-y-2">
  {currentQuestion.options.map((opt, i) => {
    const isCorrect = currentQuestion.answer.includes(opt);
    return (
      <li key={i} className="p-2 rounded">
        <p className="mb-1">Option {i + 1}</p>
        <div className="flex items-center space-x-2">
          <span className={isCorrect ? "text-green-600" : "text-gray-600"}>
            {isCorrect ? "✅" : "☐"}
          </span>
          <span className={isCorrect ? "text-green-700 font-semibold" : ""}>
            {opt}
          </span>
        </div>
      </li>
    );
  })}
</ul>




          </div>
        ) : (
          <p>No questions added yet.</p>
        )}

        {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex border border-gray-500 text-gray-500 pe-4 p-2 rounded ${
                currentIndex === 0 ? "bg-white" : "bg-white text-gray-500"
              }`}
            >
              <IoIosArrowBack className="mt-1 me-2" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className={`flex border border-gray-500 text-gray-500 px-4 p-2 rounded ${
                currentIndex === questions.length - 1
                  ? "bg-white"
                  : "bg-white text-gray-500"
              }`}
            >
              Next
              <FaChevronRight className="mt-1 ms-2" />
            </button>
          </div>
      </div>
      <div className="flex justify-between mt-5 bg-white p-4 ml-4 border rounded-md">
          <button className="border border-red-500 text-red-500 px-8 py-2 rounded">
            Save Draft
          </button>
          <button 
          className="bg-red-500 text-white px-8 py-2 rounded">
            Publish Exam
          </button>
      </div>
    </div>
  );
}
