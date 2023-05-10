const Stepper = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number,
  setCurrentStep: Function
}) => {
  return (
    <ol
      className={
        `flex items-center justify-center w-full p-3 space-x-2 
        text-sm font-bold text-center text-gray-500 bg-white border 
        border-gray-200 rounded-lg shadow-sm dark:text-gray-400 md:text-base 
        dark:bg-gray-800 dark:border-gray-700 md:p-4 md:space-x-4`
      }
    >
      <li
        onClick={() => setCurrentStep(0)}
        className={`flex items-center cursor-pointer ${currentStep == 0 ? "text-blue-600 dark:text-blue-500" : ""}`}>
        <span
          className={
            `flex items-center justify-center w-5 h-5 mr-2 text-xs border 
            ${currentStep == 0
              ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
              : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"}`}>
          1
        </span>
        Personal <span className="hidden sm:inline-flex sm:ml-2">Info</span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li
        onClick={() => setCurrentStep(1)}
        className={`flex items-center cursor-pointer ${currentStep == 1 ? "text-blue-600 dark:text-blue-500" : ""}`}>
        <span
          className={
            `flex items-center justify-center w-5 h-5 mr-2 text-xs border 
            ${currentStep == 1
              ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
              : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"}`}>
          2
        </span>
        Account <span className="hidden sm:inline-flex sm:ml-2">Info</span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li
        onClick={() => setCurrentStep(2)}
        className={`flex items-center cursor-pointer ${currentStep == 2 ? "text-blue-600 dark:text-blue-500" : ""}`}>
        <span
          className={
            `flex items-center justify-center w-5 h-5 mr-2 text-xs border 
            ${currentStep == 2
              ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
              : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"}`}>
          3
        </span>
        Review
      </li>
    </ol>
  );
};

export default Stepper;
