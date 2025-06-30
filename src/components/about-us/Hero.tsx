import React from "react";

export default function Hero() {
  return (
    <div className="absolute inset-0 bg-[url('https://wallpapershome.com/images/pages/pic_h/721.jpg')] bg-center bg-cover">
      <div className="absolute inset-0 bg-black opacity-50">
        <h2 className="absolute inset-0 text-white text-center font-bold text-2xl md:text-4xl mb-2 top-[40%] md:top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-4">
          Connecting Pet Lovers, Caregivers, and Businesses <br />
          — <br />
          All in One Place!
        </h2>
        <div>
          <h2 className="absolute inset-0 text-white text-center font-bold text-2xl mb-2 top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 italic hidden md:block">
            &quot;We bring pet owners and trusted service providers together to
            ensure every furry friend gets the love, care, and attention they
            deserve.&quot;
          </h2>
        </div>
      </div>
    </div>
  );
}
