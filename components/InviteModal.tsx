import styles from './InviteModal.module.css'
import 'react-tagsinput/react-tagsinput.css'

import { useState } from 'react'
import TagsInput from 'react-tagsinput'
import Select from 'react-select'
import { Transition } from '@headlessui/react'
import validator from "validator"
import Swal from "sweetalert2"

const InviteModal = ({
  showModal,
  closeFunc
}: {
  showModal: boolean,
  closeFunc: Function
}) => {
  const programOptions = [
    { value: 0, label: 'BootCamp2023' },
    { value: 1, label: 'BootCamp2022' },
    { value: 2, label: 'BootCamp2021' },
  ];
  const onInviteesListChanged = (newInviteesList: Array<string>) => {
    if (newInviteesList.length > invitees.length) {
      let newInvitee: string = newInviteesList[newInviteesList.length - 1];
      if (!validator.isEmail(newInvitee)) {
        setIsValidEmail(true);
        return;
      }
    }
    setInvitees(newInviteesList);
    setIsValidEmail(false);
  };
  const onCloseBtnClicked = () => {
    setInvitees([]);
    closeFunc();
  };
  const onSendInviteBtnClicked = () => {
    const sendInvite = async () => {
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitees: invitees,
        })
      });

      if (!response.ok) {
        const { err } = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      } else {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        onCloseBtnClicked();
      }
    }

    sendInvite();
  }

  const [invitees, setInvitees] = useState<Array<string>>([]);
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <>
      <Transition
        show={showModal}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div
          className={
            `fixed top-0 left-0 right-0 w-full flex 
              justify-center items-center p-4 
              overflow-x-hidden overflow-y-auto 
              md:inset-0 h-[calc(100%-1rem)] max-h-full z-[41]`
          }>
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className={
                  `absolute top-3 right-2.5 
                text-gray-400 bg-transparent 
                hover:bg-gray-200 hover:text-gray-900 
                  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center 
                dark:hover:bg-gray-800 dark:hover:text-white`
                }
                onClick={onCloseBtnClicked}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd">
                  </path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                  Invite to yCITIES CORE Community
                </h3>
              </div>
              <div className="p-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-[#6F727A] dark:text-white">Email addresses</label>
                  <TagsInput
                    value={invitees}
                    onChange={onInviteesListChanged}
                    className={styles.tagsinput}
                    tagProps={{
                      'className': styles.tagsinputTag,
                      'classNameRemove': styles.tagsinputRemove
                    }}
                    inputProps={{
                      'className': styles.tagsinputInput,
                      'placeholder': 'Add an email address'
                    }} />
                  {
                    isValidEmail &&
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> Please input a valid email!
                    </p>
                  }
                </div>
                <div className="mt-8">
                  <label htmlFor="email" className="block mb-2 font-semibold text-[#6F727A] dark:text-white">Add to a program</label>
                  <span className="font-normal text-[#6F727A]">Add users as mentees for the selected program</span>
                  <Select
                    className={styles.selectProgram}
                    options={programOptions} />
                </div>
              </div>
              <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className={
                    `text-gray-500 bg-white hover:bg-gray-100 
                    focus:ring-4 focus:outline-none focus:ring-gray-200 
                    rounded-lg border border-gray-200 text-sm font-medium 
                    px-5 py-2.5 hover:text-gray-900 focus:z-10 
                    dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                    dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`}
                  onClick={onCloseBtnClicked}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={
                    `text-white bg-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  onClick={onSendInviteBtnClicked}>
                  Send invitation
                </button>
              </div>
            </div>
          </div>
        </div >
      </Transition>
      <div className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ${!showModal ? "hidden" : ""}`}></div>
    </>
  );
}

export default InviteModal;