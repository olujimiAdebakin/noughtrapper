import { useState } from 'react';

export default function NewExamDetails({ nextStep }) {
  const [examDetails, setExamDetails] = useState({
    title: '',
    description: '',
    duration: '',
    totalPoints: '',
    avgPoints: '',
    passPoints: '',
  });

  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic validation function that returns errors if found
  const validate = () => {
    const newErrors = {};

    // Title and description should not be empty
    if (!examDetails.title.trim()) newErrors.title = 'Exam title is required.';
    if (!examDetails.description.trim())
      newErrors.description = 'Exam description is required.';

    // Check numeric fields
    const numericFields = ['duration', 'totalPoints', 'avgPoints', 'passPoints'];
    numericFields.forEach((field) => {
      if (!examDetails[field].trim()) {
        newErrors[field] = `${field} is required.`;
      } else if (isNaN(examDetails[field])) {
        newErrors[field] = `${field} must be a number.`;
      }
    });

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // Set errors if found so they can be displayed
      setErrors(validationErrors);
      return;
    }

    // If no errors, clear errors and go to next step
    setErrors({});
    nextStep(examDetails);
  };

  return (
    <div className="bg-white p-6 ml-4 border rounded-md">
      <div className="text-center mb-5">
        <h2 className="text-xl font-semibold">Create New Exam</h2>
        <p className="text-gray-500">
          Fill out these details to create your cybersecurity exam.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="font-semibold">
            Exam Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Exam Title"
            value={examDetails.title}
            onChange={handleChange}
            className="w-full p-2 border mt-1 mb-1 bg-gray-50 rounded-lg"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="font-semibold">
            Exam Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter your main text here..."
            value={examDetails.description}
            onChange={handleChange}
            className="w-full p-2 border mt-1 bg-gray-50 rounded-lg"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="duration" className="font-semibold">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              placeholder="Duration"
              value={examDetails.duration}
              onChange={handleChange}
              className="w-full p-2 border mt-1 mb-1 bg-gray-50 rounded-lg"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>

          <div>
            <label htmlFor="totalPoints" className="font-semibold">
              Total Points
            </label>
            <input
              type="text"
              name="totalPoints"
              id="totalPoints"
              placeholder="Total Points"
              value={examDetails.totalPoints}
              onChange={handleChange}
              className="w-full p-2 border mt-1 mb-1 bg-gray-50 rounded-lg"
            />
            {errors.totalPoints && (
              <p className="text-red-500 text-sm">{errors.totalPoints}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="avgPoints" className="font-semibold">
              Average Points
            </label>
            <input
              type="text"
              name="avgPoints"
              id="avgPoints"
              placeholder="Average Points"
              value={examDetails.avgPoints}
              onChange={handleChange}
              className="w-full p-2 border mt-1 mb-1 bg-gray-50 rounded-lg"
            />
            {errors.avgPoints && (
              <p className="text-red-500 text-sm">{errors.avgPoints}</p>
            )}
          </div>
          <div>
            <label htmlFor="passPoints" className="font-semibold">
              Pass Points
            </label>
            <input
              type="text"
              name="passPoints"
              id="passPoints"
              placeholder="Pass Points"
              value={examDetails.passPoints}
              onChange={handleChange}
              className="w-full p-2 border mt-1 mb-1 bg-gray-50 rounded-lg"
            />
            {errors.passPoints && (
              <p className="text-red-500 text-sm">{errors.passPoints}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="border border-red-500 text-red-500 px-8 py-2 rounded"
          >
            Save Draft
          </button>
          <button type="submit" className="bg-red-500 text-white px-20 py-2 rounded">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

