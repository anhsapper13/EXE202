'use client'
import React from 'react';

const FullLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#171717] bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-[#FF782C] border-[#FFFFFF] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#FFFFFF] text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default FullLoading;