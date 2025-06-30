"use client";
import { Crown, Users } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";

interface MemberProps {
  rank: number;
  avatar: string;
  username: string;
  points: number;
  badge?: string;
}

const MemberRow: React.FC<MemberProps> = ({
  rank,
  avatar,
  username,
  points,
}) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-500 text-sm min-w-5">
          {rank}
        </span>
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          {rank === 1 && (
            <span className="absolute -top-1 -right-1">
              <Crown size={12} className="text-yellow-500 fill-yellow-500" />
            </span>
          )}
        </div>
        <span className="font-medium text-sm">{username}</span>
      </div>
      <div className="text-sm text-gray-700">{points} pts</div>
    </div>
  );
};

const TopMembers = () => {
  // Sample data for top members
  const members = [
    {
      rank: 1,
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Jane_S",
      points: 1250,
      badge: "expert",
    },
    {
      rank: 2,
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Alex_Johnson",
      points: 945,
      badge: "helper",
    },
    {
      rank: 3,
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Sam_Williams",
      points: 840,
    },
    {
      rank: 4,
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Ria_Patel",
      points: 762,
    },
    {
      rank: 5,
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      username: "Drew_Brown",
      points: 684,
    },
  ];

  return (
    <div className="bg-white border border-zinc-800 rounded-xl shadow-md mb-4">
      <div className="flex items-center justify-between p-4 rounded-t-xl bg-[#2F1667]  mb-4">
        <h2 className="text-lg font-bold text-white ">Top Members</h2>
        <Users size={18} className="text-white" />
      </div>

      <div className="space-y-1">
        {members.map((member) => (
          <MemberRow
            key={member.rank}
            rank={member.rank}
            avatar={member.avatar}
            username={member.username}
            points={member.points}
            badge={member.badge}
          />
        ))}
      </div>

      <Button
        className="w-full mt-4 bg-[#2F1667] text-white px-4 py-2 rounded-b-xl hover:bg-[#2F1667] transition duration-300 ease-in-out"
        onClick={() => console.log("View all members")}
      >
        View All Members
      </Button>
    </div>
  );
};

export default TopMembers;
