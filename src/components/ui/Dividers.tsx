import React from "react";

interface DividersProps {
  [key: string]: any;
  className?: string;
}

const Dividers: React.FC<DividersProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="w-full border-t border-gray-300"></div>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
};

export default Dividers;
