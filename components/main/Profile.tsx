import { Question } from "@/types/question.type";
import Stepper from "../Stepper";
import ProfileBasic from "./ProfileBasic";
import { useState } from "react";
import ProfileAdvanced from "./ProfileAdvanced";

const Profile = ({ basicQuestions, advancedQuestions }: { basicQuestions: Array<Array<Question>>, advancedQuestions: Array<Question> }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onNextBtnClicked = () => {
    setCurrentStep(1);
  }
  const onPrevBtnClicked = () => {
    setCurrentStep(0);
  }

  return (
    <>
      <Stepper currentStep={currentStep} setCurrentStep={(stepIdx: number) => setCurrentStep(stepIdx)} />
      <div className="mt-10 flex flex-col">
        {
          currentStep == 0
            ? <ProfileBasic questions={basicQuestions} />
            : currentStep == 1
              ? <ProfileAdvanced questions={advancedQuestions} />
              : null
        }
        <div className="">
          {
            currentStep == 1
              ? <button
                className={
                  `text-white float-left bg-blue-700 hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                  rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center 
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                onClick={onPrevBtnClicked}
              >
                Prev
              </button>
              : null
          }

          <button
            className={
              `text-white float-right bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            onClick={onNextBtnClicked}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
