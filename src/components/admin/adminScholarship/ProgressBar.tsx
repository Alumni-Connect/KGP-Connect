interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="ml-4 flex-grow">
          <p className="text-sm font-medium">
            Your profile can't be found by recruiters because it's missing key
            information
          </p>
        </div>
        <div className="flex-none text-sm text-gray-500">
          {totalSteps - currentStep + 1} steps to complete
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium">Set your location</p>
        <p className="text-sm text-gray-500">
          You can always search for jobs in other locations and set additional
          location preferences
        </p>

        <div className="mt-2 flex justify-between">
          <div className="flex space-x-2">
            <button
              disabled={currentStep === 1}
              className={`px-3 py-1 text-sm rounded flex items-center ${currentStep === 1 ? "text-gray-400" : "text-gray-700"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </button>

            <button
              disabled={currentStep === totalSteps}
              className={`px-3 py-1 text-sm rounded flex items-center ${currentStep === totalSteps ? "text-gray-400" : "text-gray-700"}`}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <button className="px-4 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800">
            Update now
          </button>
        </div>
      </div>
    </div>
  );
}
