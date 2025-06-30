import { Spin } from "antd";
import React from "react";

const LoadingSpin: React.FC<{ spinning: boolean, className?:string }> = ({ spinning , className}) => {
  if (!spinning) return null;
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-amber-500 bg-opacity-50 z-50` + (className ? ` ${className}` : "")}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpin;
