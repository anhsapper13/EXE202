"use client";
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";

interface HotDiscussionItemProps {
  avatar: string;
  username: string;
  message: string;
  timestamp?: string;
}

const HotDiscussionItem: React.FC<HotDiscussionItemProps> = ({
  avatar,
  username,
  message,
  timestamp,
}) => {
  return (
    <div className="flex gap-3 mb-4 hover:bg-indigo-50 p-3 rounded-lg transition-colors border border-transparent hover:border-indigo-200 shadow-sm">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={avatar}
          alt={username}
          className="rounded-full object-cover border-2 border-indigo-200 shadow"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-base truncate text-indigo-900">
            {username}
          </p>
          {timestamp && (
            <span className="text-xs text-gray-400">• {timestamp}</span>
          )}
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 font-normal">
          {message}
        </p>
      </div>
    </div>
  );
};

const HotDiscussions = () => {
  // Sample data for hot discussions
  const discussions = [
    {
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Sophie",
      message:
        "My cat keeps scratching furniture, any suggestions for training?",
      timestamp: "1h",
    },
    {
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Max_Smith",
      message: "What's the best dry food for a senior dog with dental issues?",
      timestamp: "2h",
    },
    {
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Alex_J",
      message:
        "Recommendations for hypoallergenic cat food brands that are actually good?",
      timestamp: "5h",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl shadow-lg mb-6 p-0">
      <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-indigo-700 to-indigo-500 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide drop-shadow">
          🔥 Hot Discussions
        </h2>
        <MessageSquare size={20} className="text-white drop-shadow" />
      </div>

      <div className="space-y-2 px-4 pb-2 pt-1">
        {discussions.map((discussion, index) => (
          <HotDiscussionItem
            key={index}
            avatar={discussion.avatar}
            username={discussion.username}
            message={discussion.message}
            timestamp={discussion.timestamp}
          />
        ))}
      </div>

      <Button
        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 rounded-b-2xl font-semibold shadow hover:from-indigo-700 hover:to-indigo-600 transition duration-300 ease-in-out"
        onClick={() => console.log("View all members")}
      >
        View All Members
      </Button>
    </div>
  );
};

export default HotDiscussions;
