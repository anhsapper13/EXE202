import { CircleUserRound, Newspaper } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeaderForum = () => {
  return (
    <div>
      {/* Background image container */}
      <div className="relative w-full h-[400px] md:h-[80vh]">
        {/* Background image using Next.js Image */}
        <Image
          src="/assets/background-pet-forum.jpg"
          alt="Pet Forum Background"
          fill
          priority // Optional: Prioritize loading for above-the-fold images
        />
        {/* Overlay and text */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-96 p-4 md:w-[40rem] ">
            <h1 className="text-white text-center text-3xl font-bold md:text-5xl lg:text-6xl ">
              Community Room
            </h1>
            {/* search */}
            <div className=" flex justify-center items-center my-8 md:my-20">
              <input
                type="text"
                placeholder="Search or ask a question..."
                className="w-full p-2 rounded-3xl bg-white text-black md:p-4"
              />
              {/* <button className="bg-blue-500 text-white p-2 rounded ml-2">
                Search
              </button> */}
            </div>
            {/* users active and post */}
            <div className="flex items-center justify-between mt-4 ">
              <div
                className="bg-[#FFC1DB] w-36 relative text-black p-2 rounded-2xl flex items-center justify-center mr-2 
                md:w-1/2
              "
              >
                {/*icon  */}
                <div
                  className="absolute -top-[25%] -left-[-38%] bg-white rounded-full 
                    md:-left-[-45%]
                "
                >
                  <CircleUserRound size={35} />
                </div>
                <div className="flex flex-col text-center mt-3 md:text-4xl">
                  <div className="text-sm font-bold">5000</div>
                  <div className="text-sm">Active Users</div>
                </div>
              </div>
              <div
                className="bg-[#FFC1DB] w-36 relative text-black p-2 rounded-2xl flex items-center justify-center mr-2 
                md:w-1/2
              "
              >
                {/*icon  */}
                <div
                  className="absolute -top-[25%] -left-[-38%] bg-white rounded-full 
                    md:-left-[-45%]
                "
                >
                  <Newspaper size={35} />
                </div>
                <div className="flex flex-col text-center mt-3 md:text-4xl">
                  <div className="text-sm font-bold">5000</div>
                  <div className="text-sm">Post</div>
                </div>
              </div>
            </div>
          </div>
          {/* header */}
        </div>
      </div>
    </div>
  );
};

export default HeaderForum;
