import shortid from "shortid";
import { Question } from "@/types/question.type";
import CheckTag from "../CheckTag";

const ProfileAdvanced = ({ questions }: { questions: Array<Question> }) => {
  return (
    <>
      {
        questions.map((question: Question) => {
          return (
            <div key={shortid()} className={`grid gap-6 mb-6 md:grid-cols-1 overflow-x-auto`}>
              <div key={shortid()}>
                <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  {question.question}
                </label>
                {
                  question.type == "checktable"
                    ? <div className="relative shadow-md sm:rounded-lg">
                      <table className="w-full text-md text-center dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th></th>
                            {
                              (question.candidates ?? []).map((candidate) => {
                                return (
                                  <th key={shortid()} className="px-6 py-3">
                                    {candidate}
                                  </th>
                                );
                              })
                            }
                          </tr>
                        </thead>
                        <tbody className="">
                          {
                            (question.subquestions ?? []).map((subquestion) => {
                              return (
                                <tr
                                  key={shortid()}
                                  className={
                                    `bg-white border-b`}>
                                  <td className="px-6 w-30 text-left">{subquestion}</td>
                                  {
                                    (question.candidates ?? []).map((candidate) => {
                                      return (
                                        <td key={shortid()} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          <input type="checkbox"
                                            className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                                                          focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 
                                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800`} />
                                        </td>
                                      );
                                    })
                                  }
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                    : question.type == "checkbox"
                      ? <div className={`flex flex-wrap gap-4`}>
                        {
                          (question.candidates ?? []).map((candidate: string) => {
                            return (
                              <CheckTag key={shortid()} text={candidate} onClick={() => { }} />
                            );
                          })
                        }
                      </div>
                      : question.type == "radio"
                        ? <div className={`flex ml-3 ${!question.inline ? "flex-col space-y-3" : "space-x-60 items-center"} justify-start`}>
                          {
                            (question.candidates ?? []).map((candidate: string) => {
                              return (
                                <div key={shortid()} className="flex items-center">
                                  <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
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
                        : question.type == "textarea"
                          ? <textarea
                            id="message"
                            rows={4}
                            className={
                              `block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                                  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Write your thoughts here...">
                          </textarea>
                          : <input
                            type="text"
                            className={
                              `bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                  rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                                  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            required />
                }
              </div>
            </div>
          )
        })
      }
    </>
  );
};

export default ProfileAdvanced;