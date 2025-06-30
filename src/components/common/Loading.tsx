'use client'
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-[#FF782C] border-[#FFFFFF] rounded-full animate-spin"></div>
        <p className="mt-2 text-[#FFFFFF] text-base font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
