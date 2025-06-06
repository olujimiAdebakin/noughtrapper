// components/StepProgress.js
const steps = [
    { id: 1, title: "Create Exam", description: "Fill out these details and get your campaign ready" },
    { id: 2, title: "Set Questions", description: "Optimize your campaign reach" },
    { id: 3, title: "Review Exam Questions", description: "Double-check your exam" },
  ];
  
  export default function CreateExamProgress({ currentStep }) {
    return (
      <div className="w-1/4 flex flex-col justify-between bg-white px-3 py-6 border rounded-md">
        <div>
          {steps.map((step) => (
            <div key={step.id} className="mb-4">
              <div className={`flex items-center gap-3 ${step.id === currentStep ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                <span className={`px-3 py-1.5 flex items-center justify-center rounded-full text-white ${step.id === currentStep ? "bg-red-500" : "bg-gray-300 px-3 py-1.5"}`}>
                  {step.id}
                </span>
                <div>
                  <p>{step.title}</p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
            <div className="px-4">
              <h4 className="font-semibold text-lg">Need Help?</h4>
              <p className="text-default-400 text-sm mb-5">Creating a cybersecurity exam is easy! Follow these steps to set up your exam successfully</p>
              <button className="border border-black p-2 px-4 rounded-lg">Settings</button>
            </div>

      </div>
    );
  }
  