"use client";

import { IComment } from "@/types/comment.interface";
import Image from "next/image";
import React from "react";

interface ReplyAnswerCardProps {
  comment: IComment;
}

const ReplyAnswerCard: React.FC<ReplyAnswerCardProps> = ({ comment }) => {
  return (
    <div className="flex items-start gap-2">
      <Image
        src={`${comment.author.avatar}`}
        alt={comment.author.email}
        className="w-8 h-8 rounded-full"
      />
      <div className="bg-gray-100 p-2 rounded-md flex-1">
        <p className="text-sm font-medium">{comment.author.firstName}</p>
        <p className="text-sm text-gray-600">{comment.content}</p>
      </div>
    </div>
  );
};

export default ReplyAnswerCard;
