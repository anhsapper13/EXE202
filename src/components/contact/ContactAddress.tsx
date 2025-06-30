import React from "react";
import Image from "next/image";
const ContactInfo = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        className="size-8"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
    text: "123 SomeWhere St. HCM City, Vietnam",
    note: "Address",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        className="size-8"
      >
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
    text: "fakeaddressforEXE201@fpt.edu.vn",
    note: "Email",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        className="size-8"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    text: "0987654321",
    note: "Phone",
  },
];

export default function ContactAddress() {
  return (
    <div className="pt-2 pb-2 w-full max-w-[400px] mx-auto md:mx-0">
      {ContactInfo.map((item, index) => (
        <div key={index} className="flex items-start md:items-center mt-4 mb-4">
          <div className="bg-white text-black rounded-full p-2 md:p-4 shrink-0">
            {item.icon}
          </div>
          <div className="ml-2 md:ml-4">
            <h1 className="text-orange-200 text-sm md:text-xl">{item.note}</h1>
            <h2 className="text-white text-xs md:text-base break-words">
              {item.text}
            </h2>
          </div>
        </div>
      ))}
      <div>
        <h2 className="text-orange-200 text-lg md:text-xl text-center">
          Social Media
        </h2>
        <div className="flex justify-center items-center mt-4 mb-4 gap-4 md:gap-10">
          <a href="https://www.facebook.com/">
            <Image
              src="/facebook.svg"
              alt="Facebook logo"
              width={30}
              height={30}
              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
            />
          </a>
          <a href="https://x.com/?lang=en">
            <Image
              src="/x.svg"
              alt="X logo"
              width={30}
              height={30}
              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
            />
          </a>
          <a href="https://www.instagram.com/">
            <Image
              src="/insta.svg"
              alt="Instagram logo"
              width={30}
              height={30}
              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
