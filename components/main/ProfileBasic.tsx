import shortid from "shortid";
import { useState } from "react";
import { Question } from "@/types/question.type";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';

const ProfileBasic = ({ questions }: { questions: Array<Array<Question>> }) => {
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  return (
    <>
      {
        questions.map((bunch: Array<Question>, idx: number) => {
          return (
            <div
              key={shortid()}
              className={
                bunch.length == 3
                  ? "grid md:grid-cols-3 gap-6 mb-6"
                  : bunch.length == 2
                    ? "grid md:grid-cols-2 gap-6 mb-6"
                    : "grid md:grid-cols-1 gap-6 mb-6"}>
              {
                bunch.map((question: Question) => {
                  return (
                    <div key={shortid()}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {question.question}
                      </label>
                      {
                        question.type == "checkbox"
                          ? <>
                            {
                              (question.candidates ?? []).map((candidate: string) => {
                                return (
                                  <div key={shortid()} className="flex items-start mb-3 ml-3">
                                    <div className="flex items-center h-5">
                                      <input
                                        type="checkbox"
                                        name={question.name}
                                        value=""
                                        className={
                                          `w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                                          focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 
                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
                                      />
                                    </div>
                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                      {candidate}
                                    </label>
                                  </div>
                                );
                              })
                            }
                          </>
                          : question.type == "radio"
                            ? <div className="flex justify-start items-center space-x-60">
                              {
                                (question.candidates ?? []).map((candidate: string) => {
                                  return (
                                    <div key={shortid()} className="flex items-center">
                                      <input
                                        id="inline-radio"
                                        type="radio"
                                        value=""
                                        name={question.name}
                                        className={
                                          `w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                          focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                                          focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                                      />
                                      <label
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        {candidate}
                                      </label>
                                    </div>
                                  );
                                })
                              }
                            </div>
                            : question.type == ""
                              ?
                              <></>
                              : question.name == "mobile"
                                ? <PhoneInput
                                  value={phone}
                                  onChange={(val) => setPhone(val)}
                                  country={1}
                                  inputProps={{
                                    autoFocus: true
                                  }}
                                  inputStyle={{ maxHeight: "42px", width: "100%" }} />
                                : question.name == "country"
                                  ? <CountryDropdown
                                    value={country}
                                    onChange={(val) => setCountry(val)}
                                    classes={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                  : question.name == "region"
                                    ? <RegionDropdown
                                      value={region}
                                      country={country}
                                      onChange={(val) => setRegion(val)}
                                      classes={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                                p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                    : <input
                                      type="text"
                                      placeholder={question.placeholder}
                                      name={question.name}
                                      className={
                                        `bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      }
                    </div>
                  );
                })
              }
            </div>
          )
        })
      }
    </>
  );
};

export default ProfileBasic;