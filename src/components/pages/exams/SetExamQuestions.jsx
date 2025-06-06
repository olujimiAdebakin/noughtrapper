'use client'

import { useState, useEffect } from "react";
import { IoIosArrowBack } from 'react-icons/io';
import { FaChevronRight } from "react-icons/fa6";

export default function SetExamQuestions({ questions, setQuestions, nextStep, prevStep }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [""],
    answer: [],
  });


  // Load the current question when switching questions
  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      setNewQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, questions]);

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOptionLabel = `Option ${newQuestion.options.length + 1}`;
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] });
  };

  const handleAnswerToggle = (option) => {
    const isSelected = newQuestion.answer.includes(option);
    const updatedAnswers = isSelected
      ? newQuestion.answer.filter((ans) => ans !== option)
      : [...newQuestion.answer, option];
    setNewQuestion({ ...newQuestion, answer: updatedAnswers });
  };

  const handleNextQuestion = () => {
    if (!newQuestion.question || newQuestion.answer.length === 0) {
      alert("Please fill in the question and select at least one answer.");
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = newQuestion;
    setQuestions(updatedQuestions);

    setNewQuestion({ question: "", options: [""], answer: [] });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };


  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };


  return (
    <div className="min-h-screen">

      <div className="bg-white text-center mb-5 p-4 ml-4 border rounded-md">
        <h1 className="font-semibold text-lg mb-2">Create Exam Qusestion</h1>
        <p className="text-gray-400">Enter the details to craft your cybersecurity exam questions.</p>
      </div>

      <div className="bg-white p-4 ml-4 border rounded-md">

        <div className="flex justify-end border-b pb-5 mb-5 pe-4 pt-2">
          <button onClick={handleNextQuestion}
          className="text-red-500"
          >
            + Add Question
          </button>
        </div>

        <h1 className="font-semibold mb-2">Question {currentQuestionIndex + 1}</h1>

        <input
          type="text"
          placeholder="1. Question"
          value={newQuestion.question}
          onChange={handleQuestionChange}
          className="w-full p-2 border rounded mt-2"
        />

        {/* Options */}
        <div className="mt-4">
          {newQuestion.options.map((option, index) => (
            <div key={index} className="mt-2">
              <label htmlFor="">{`Option ${index + 1}`}</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="checkbox"
                  checked={newQuestion.answer.includes(option)}
                  onChange={() => handleAnswerToggle(option)}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            className="text-blue-600 text-sm mt-4 hover:underline"
          >
            + Add Option
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
        <button
            onClick={handlePrevQuestion}
            className="flex border border-gray-500 text-gray-500 pe-4 p-2 rounded"
            disabled={currentQuestionIndex === 0}
          >
            <IoIosArrowBack className="mt-1 me-2" />
             Previous
          </button>
          <button onClick={handleNextQuestion} className="flex border border-gray-500 text-gray-500 px-4 p-2 rounded">
            Next
            <FaChevronRight className="mt-1 ms-2" />
          </button>
        </div>

      </div>

      <div className="flex justify-between mt-5 bg-white p-4 ml-4 border rounded-md">
          <button className="border border-red-500 text-red-500 px-8 py-2 rounded">
            Save Draft
          </button>
          {/* <button onClick={nextStep} 
          disabled={questions.length === 0}
          className="bg-red-500 text-white px-8 py-2 rounded">
            Next Step
          </button> */}
          <button
  onClick={() => {
    const hasValidQuestions = questions.some(
      (q) => q.question && q.answer.length > 0
    );

    if (!hasValidQuestions) {
      alert("Please add at least one complete question before proceeding.");
      return;
    }

    nextStep();
  }}
  className={`px-8 py-2 rounded ${
    questions.some((q) => q.question && q.answer.length > 0)
      ? "bg-red-500 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Next Step
</button>

      </div>

    </div>
  );
}
