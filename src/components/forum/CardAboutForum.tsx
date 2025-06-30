import React from "react";

interface CardAboutForumProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  color: string;
}

const CardAboutForum: React.FC<CardAboutForumProps> = ({
  icon,
  title,
  description,
  color = "#fff",
}) => {
  return (
    <div
      className="rounded-2xl p-4 transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-3">{icon}</div>
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardAboutForum;
