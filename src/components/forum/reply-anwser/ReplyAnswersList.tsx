"use client";
import Image from "next/image";
// import { IComment } from "@/types/comment.interface";
import React from "react";


interface ReplyAnswersListProps {
  // Define any props you need here
  // listComments: IComment[];
    listComments: any[];

}

const ReplyAnswersList: React.FC<ReplyAnswersListProps> = ({
  listComments,
}) => {
  return (
    <div>
      <h3 className="text-lg text-gray-700 mb-2">Comments</h3>
      {listComments.map((comment,index) => (
        <div key={index} className="mb-2">
          <div className="flex items-start gap-2">
            <Image
              src={""}
              alt={comment.author.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-gray-100 p-2 rounded-md flex-1">
              <p className="text-sm font-medium">{comment.author.name}</p>
              <p className="text-sm text-gray-600">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyAnswersList;
