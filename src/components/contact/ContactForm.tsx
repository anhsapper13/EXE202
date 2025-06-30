"use client";
import React, { JSX, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import validator from "validator";
interface FormInfo {
  name: string;
  email: string;
  message: string;
}

interface ContactFormInfo {
  icon: JSX.Element;
  label: string;
  placeHolder: string;
  id: string;
}
const ContactFormInfo: ContactFormInfo[] = [
  {
    icon: (
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "Name",
    placeHolder: "Your Name",
    id: "input-group-name",
  },
  {
    icon: (
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 20"
      >
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
    label: "Email",
    placeHolder: "Your Email",
    id: "input-group-email",
  },
  {
    icon: (
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 22"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "Message",
    placeHolder: "Your Message",
    id: "input-group-message",
  },
];

export default function ContactForm() {
  const [info, setInfo] = useState<FormInfo>({
    name: "",
    email: "",
    message: "",
  });

  const send = async () => {
    if (!info.name || !info.email || !info.message) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validator.isEmail(info.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    console.log(info);
    toast.warning("This function has not been implemented yet", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  return (
    <div className="bg-white p-3 md:p-5 rounded-sm w-full max-w-[400px] mx-auto">
      <ToastContainer />
      <h1 className="text-orange-300 text-lg md:text-xl font-semibold mb-2">
        Send Message
      </h1>
      <div className="w-full">
        {ContactFormInfo.map((item, index) => (
          <div key={index} className="mb-4 md:mb-6">
            <label
              htmlFor={item.id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {item.label}
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {item.icon}
              </div>
              {item.label === "Message" ? (
                <textarea
                  rows={1}
                  id={item.id}
                  value={info[item.label.toLowerCase() as keyof FormInfo]}
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      [item.label.toLowerCase() as keyof FormInfo]:
                        e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={item.placeHolder}
                />
              ) : (
                <input
                  type="text"
                  id={item.id}
                  value={info[item.label.toLowerCase() as keyof FormInfo]}
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      [item.label.toLowerCase() as keyof FormInfo]:
                        e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={item.placeHolder}
                />
              )}
            </div>
          </div>
        ))}
        <button
          className="button bg-orange-300 rounded-sm pt-2 pb-2 pl-5 pr-5 text-white font-normal  hover:bg-orange-400 cursor-pointer"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
