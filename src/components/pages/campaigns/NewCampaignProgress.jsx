"use client";

export default function CampaignProgressIndicator({ isPreview }) {
  return (
    <div className="flex flex-col gap-10 justify-between p-5 bg-white shadow rounded-lg border h-screen">
      <div>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                !isPreview ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div>
              <h4 className="font-semibold">Create New Campaign</h4>
              <p className="text-sm text-gray-500">
                Fill out these details and get your campaign ready
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-9 flex items-center justify-center rounded-full text-white font-bold ${
                isPreview ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              2
            </div>
            <div>
              <h4 className="font-semibold">Preview Campaign</h4>
              <p className="text-sm text-gray-500">
                Double-check your campaign is ready to go!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-xl">Need Help?</h4>
        <p className="text-default-400 my-4">Get to know how your campaign can <br/> reach a wider audience.</p>
        <button className="border border-black p-2 px-4 rounded-lg">Contact Us</button>
      </div>
    </div>
  );
}
