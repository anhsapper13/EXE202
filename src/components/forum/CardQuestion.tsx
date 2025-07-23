"use client";
import React from "react";
import { Eye, MessageSquare, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IPost } from "@/types/post.interface";
import { format } from "date-fns";

export interface CardQuestionProps {
  data: IPost;
}

const CardQuestion: React.FC<CardQuestionProps> = ({ data }) => {
  const router = useRouter();
  const handleViewQuestion = (ques_id: string) => () => {
    console.log(`Viewing question with ID: ${ques_id}`);
    router.push(`/forum/question/${ques_id}`);
  };
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleViewQuestion(data.post_id)}
    >
      <div className="flex flex-col space-y-3  md:flex-row ">
        {/* Stats bar - views, answers, date */}
        <div className="flex gap-3 text-xs text-gray-500 md:flex-col md:w-1/4 md:items-center">
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{data.viewCount} views</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span> answers</span>
          </div>
          <div className="flex items-center ">
            <Clock size={14} className="mr-1" />
            <span>{format(new Date(data.creationDate), "MMM dd, yyyy")}</span>
          </div>
        </div>
        {/*  */}
        <div className="w-full md:w-3/4">
          {/* Title and question */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {data.title}
            </h2>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
              className="mt-1 text-sm truncate md:text-base text-gray-600 line-clamp-2 "
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          </div>

          <div className="flex flex-row justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-2">
              {data.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Sender info */}
            <div className="flex items-center mt-2">
              <Image
                src={data.user.avatar || "/default-avatar.png"}
                alt={data.user.lastName}
                className="w-8 h-8 rounded-full object-cover mr-2"
                width={32}
                height={32}
              />
              <span className="text-sm font-medium text-gray-700">
                {data.user.firstName} {data.user.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardQuestion;
